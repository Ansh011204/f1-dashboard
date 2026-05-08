from fastapi import APIRouter
from app.services.cache_service import get_cached, set_cached

router = APIRouter()

@router.get("/drivers")
async def get_driver_standings():
    """
    Returns current driver championship standings.
    Data is refreshed after each race weekend by precompute.py.
    """
    cached = await get_cached("standings:drivers")
    if cached:
        return cached

    # TODO: fetch from Ergast API or FastF1 in precompute.py
    # For now return placeholder structure
    return {"message": "Connect backend to populate standings"}

@router.get("/constructors")
async def get_constructor_standings():
    """
    Returns current constructor championship standings.
    """
    cached = await get_cached("standings:constructors")
    if cached:
        return cached

    return {"message": "Connect backend to populate standings"}
