from fastapi import APIRouter
import httpx

router = APIRouter()

@router.get("/latest")
async def get_latest_race():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.jolpi.ca/ergast/f1/current/last/results.json"
        )
        data = r.json()
        race = data["MRData"]["RaceTable"]["Races"][0]
        return race

@router.get("/next")
async def get_next_race():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.jolpi.ca/ergast/f1/current/next.json"
        )
        data = r.json()
        race = data["MRData"]["RaceTable"]["Races"][0]
        return race

@router.get("/{round}/results")
async def get_race_results(round: int):
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"https://api.jolpi.ca/ergast/f1/current/{round}/results.json"
        )
        data = r.json()
        return data["MRData"]["RaceTable"]["Races"]
