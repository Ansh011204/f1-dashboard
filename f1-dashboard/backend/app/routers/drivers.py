from fastapi import APIRouter
from app.services.cache_service import get_cached

router = APIRouter()

@router.get("/")
async def get_drivers():
    cached = await get_cached("drivers:all")
    if cached:
        return cached
    return {"message": "No driver data yet — run precompute.py"}

@router.get("/{driver_id}")
async def get_driver(driver_id: str):
    cached = await get_cached(f"drivers:{driver_id}")
    if cached:
        return cached
    return {"message": f"No data for driver {driver_id}"}
