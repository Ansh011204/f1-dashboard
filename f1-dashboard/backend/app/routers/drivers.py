from fastapi import APIRouter
import httpx

router = APIRouter()

@router.get("/")
async def get_drivers():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.jolpi.ca/ergast/f1/current/drivers.json?limit=30"
        )
        data = r.json()
        return data["MRData"]["DriverTable"]["Drivers"]

@router.get("/{driver_id}")
async def get_driver(driver_id: str):
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"https://api.jolpi.ca/ergast/f1/current/drivers/{driver_id}.json"
        )
        data = r.json()
        return data["MRData"]["DriverTable"]["Drivers"]
