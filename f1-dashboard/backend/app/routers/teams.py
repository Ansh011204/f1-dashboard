from fastapi import APIRouter
import httpx

router = APIRouter()

@router.get("/")
async def get_teams():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.jolpi.ca/ergast/f1/current/constructors.json"
        )
        data = r.json()
        return data["MRData"]["ConstructorTable"]["Constructors"]

@router.get("/{team_id}")
async def get_team(team_id: str):
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"https://api.jolpi.ca/ergast/f1/current/constructors/{team_id}.json"
        )
        data = r.json()
        return data["MRData"]["ConstructorTable"]["Constructors"]
