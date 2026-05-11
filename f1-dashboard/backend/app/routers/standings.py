from fastapi import APIRouter
import httpx

router = APIRouter()

TEAM_COLORS = {
    "mercedes": "#27F4D2",
    "ferrari": "#E8002D",
    "mclaren": "#FF8000",
    "red_bull": "#3671C6",
    "alpine": "#0093CC",
    "haas": "#B6BABD",
    "rb": "#6692FF",
    "williams": "#64C4FF",
    "aston_martin": "#229971",
    "sauber": "#52E252",
}

@router.get("/drivers")
async def get_driver_standings():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.jolpi.ca/ergast/f1/current/driverStandings.json"
        )
        data = r.json()
        standings = data["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"]
        return standings

@router.get("/constructors")
async def get_constructor_standings():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.jolpi.ca/ergast/f1/current/constructorStandings.json"
        )
        data = r.json()
        standings = data["MRData"]["StandingsTable"]["StandingsLists"][0]["ConstructorStandings"]
        formatted = [
            {
                "team": s["Constructor"]["name"],
                "points": int(s["points"]),
                "position": int(s["position"]),
                "wins": int(s["wins"]),
                "color": TEAM_COLORS.get(s["Constructor"]["constructorId"], "#888888"),
                "constructorId": s["Constructor"]["constructorId"],
            }
            for s in standings
        ]
        return formatted
