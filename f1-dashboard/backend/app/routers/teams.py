from fastapi import APIRouter
from app.services.cache_service import get_cached

router = APIRouter()

@router.get("/")
async def get_teams():
    cached = await get_cached("teams:all")
    if cached:
        return cached
    return {"message": "No team data yet — run precompute.py"}

@router.get("/{team_id}")
async def get_team(team_id: str):
    cached = await get_cached(f"teams:{team_id}")
    if cached:
        return cached
    return {"message": f"No data for team {team_id}"}
