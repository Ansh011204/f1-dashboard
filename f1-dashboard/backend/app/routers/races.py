from fastapi import APIRouter
from app.services.cache_service import get_cached

router = APIRouter()

@router.get("/latest")
async def get_latest_race():
    cached = await get_cached("races:latest")
    if cached:
        return cached
    return {"message": "No race data yet — run precompute.py after a race weekend"}

@router.get("/next")
async def get_next_race():
    cached = await get_cached("races:next")
    if cached:
        return cached
    return {"message": "No upcoming race data cached"}

@router.get("/{round}/results")
async def get_race_results(round: int):
    cached = await get_cached(f"races:{round}:results")
    if cached:
        return cached
    return {"message": f"No data for round {round}"}
