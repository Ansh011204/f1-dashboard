"""
precompute.py — Run this after each race weekend (or on a schedule via Azure Container Apps Job).
It fetches data from FastF1 + Ergast, runs all computations, and stores results in Redis.
The API then just reads from cache — zero live computation per user request.

Usage:
  python scripts/precompute.py --year 2024 --round 8
"""
import asyncio
import argparse
import json
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.cache_service import set_cached
from app.services.fastf1_service import get_session, get_lap_times, get_position_data

async def precompute_race(year: int, round_number: int):
    print(f"[precompute] Loading race session: {year} Round {round_number}")
    session = get_session(year, round_number, "R")

    print("[precompute] Computing position data...")
    positions = get_position_data(session)
    await set_cached(f"races:{round_number}:results", positions, ttl_seconds=60*60*24*365)

    print("[precompute] Computing lap times...")
    lap_times = get_lap_times(session)
    await set_cached(f"analysis:laptimes:{round_number}", lap_times, ttl_seconds=60*60*24*365)

    print("[precompute] Done — data cached in Redis.")

async def precompute_standings(year: int):
    """
    Fetch current standings from Ergast API.
    Replace with OpenF1 API when Ergast is deprecated.
    """
    import httpx
    print("[precompute] Fetching driver standings from Ergast...")
    async with httpx.AsyncClient() as client:
        r = await client.get(f"https://ergast.com/api/f1/{year}/driverStandings.json")
        data = r.json()
        standings = data["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"]
        await set_cached("standings:drivers", standings, ttl_seconds=60*60*12)

        r2 = await client.get(f"https://ergast.com/api/f1/{year}/constructorStandings.json")
        data2 = r2.json()
        con_standings = data2["MRData"]["StandingsTable"]["StandingsLists"][0]["ConstructorStandings"]
        await set_cached("standings:constructors", con_standings, ttl_seconds=60*60*12)

    print("[precompute] Standings cached.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--year",  type=int, default=2024)
    parser.add_argument("--round", type=int, required=True)
    args = parser.parse_args()

    asyncio.run(precompute_race(args.year, args.round))
    asyncio.run(precompute_standings(args.year))
