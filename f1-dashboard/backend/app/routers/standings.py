from fastapi import APIRouter
import httpx

router = APIRouter()

@router.get("/drivers")
async def get_driver_standings():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://ergast.com/api/f1/current/driverStandings.json"
        )
        data = r.json()
        standings = data["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"]
        return standings

@router.get("/constructors")
async def get_constructor_standings():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://ergast.com/api/f1/current/constructorStandings.json"
        )
        data = r.json()
        standings = data["MRData"]["StandingsTable"]["StandingsLists"][0]["ConstructorStandings"]
        return standings
