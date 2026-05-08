from fastapi import APIRouter
from app.services.cache_service import get_cached

router = APIRouter()

@router.get("/standings-history")
async def get_standings_history():
    cached = await get_cached("analysis:standings-history")
    if cached:
        return cached
    return {"message": "No standings history yet — run precompute.py"}

@router.get("/prediction/next")
async def get_next_race_prediction():
    cached = await get_cached("analysis:prediction:next")
    if cached:
        return cached
    return {"message": "No prediction data yet — run precompute.py"}

@router.get("/race/{round}/lap-times")
async def get_lap_times(round: int):
    cached = await get_cached(f"analysis:laptimes:{round}")
    if cached:
        return cached
    return {"message": f"No lap time data for round {round}"}

@router.get("/head-to-head")
async def get_head_to_head(driver1: str, driver2: str):
    key = f"analysis:h2h:{driver1}:{driver2}"
    cached = await get_cached(key)
    if cached:
        return cached
    return {"message": "No H2H data — run precompute.py"}
