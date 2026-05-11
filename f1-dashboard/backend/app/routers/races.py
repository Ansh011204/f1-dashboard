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

@router.get("/latest")
async def get_latest_race():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.jolpi.ca/ergast/f1/current/last/results.json"
        )
        data = r.json()
        race = data["MRData"]["RaceTable"]["Races"][0]
        results = []
        for r2 in race["Results"]:
            cid = r2["Constructor"]["constructorId"]
            pos = int(r2["position"])
            grid = int(r2["grid"])
            results.append({
                "position": pos,
                "driver": f"{r2['Driver']['givenName']} {r2['Driver']['familyName']}",
                "team": r2["Constructor"]["name"],
                "teamColor": TEAM_COLORS.get(cid, "#888888"),
                "time": r2.get("Time", {}).get("time", r2.get("status", "DNF")),
                "gap": "WINNER" if pos == 1 else r2.get("Time", {}).get("time", r2.get("status", "DNF")),
                "points": int(r2["points"]),
                "fastestLap": r2.get("FastestLap", {}).get("rank") == "1",
                "gridPosition": grid,
                "positionChange": grid - pos,
            })
        return {
            "name": race["raceName"],
            "round": int(race["round"]),
            "season": int(race["season"]),
            "circuit": race["Circuit"]["circuitName"],
            "date": race["date"],
            "country": race["Circuit"]["Location"]["country"],
            "flag": "🏁",
            "totalLaps": int(race["Results"][0].get("laps", 0)),
            "results": results,
            "fastestLap": {
                "driver": next(
                    (f"{r2['Driver']['givenName']} {r2['Driver']['familyName']}"
                     for r2 in race["Results"]
                     if r2.get("FastestLap", {}).get("rank") == "1"), "N/A"
                ),
                "time": next(
                    (r2["FastestLap"]["Time"]["time"]
                     for r2 in race["Results"]
                     if r2.get("FastestLap", {}).get("rank") == "1"), "N/A"
                ),
                "lap": 0,
            },
            "polePosition": {
                "driver": next(
                    (f"{r2['Driver']['givenName']} {r2['Driver']['familyName']}"
                     for r2 in race["Results"] if r2["grid"] == "1"), "N/A"
                ),
                "time": "N/A",
            },
            "safetyCars": 0,
            "dnf": sum(1 for r2 in race["Results"] if r2["status"] not in ["Finished", "+1 Lap", "+2 Laps"]),
        }

@router.get("/next")
async def get_next_race():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.jolpi.ca/ergast/f1/current/next.json"
        )
        data = r.json()
        races = data["MRData"]["RaceTable"]["Races"]
        if not races:
            return {"message": "No upcoming race"}
        race = races[0]
        return {
            "name": race["raceName"],
            "round": int(race["round"]),
            "season": int(race["season"]),
            "circuit": race["Circuit"]["circuitName"],
            "date": race["date"],
            "country": race["Circuit"]["Location"]["country"],
            "flag": "🏁",
        }

@router.get("/{round}/results")
async def get_race_results(round: int):
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"https://api.jolpi.ca/ergast/f1/current/{round}/results.json"
        )
        data = r.json()
        return data["MRData"]["RaceTable"]["Races"]
