from fastapi import APIRouter
from app.services.cache_service import get_cached

router = APIRouter()

@router.get("/")
async def get_tracks():
    cached = await get_cached("tracks:all")
    if cached:
        return cached
    return {"message": "No track data yet — run precompute.py"}

@router.get("/{track_id}")
async def get_track(track_id: str):
    cached = await get_cached(f"tracks:{track_id}")
    if cached:
        return cached
    return {"message": f"No data for track {track_id}"}
