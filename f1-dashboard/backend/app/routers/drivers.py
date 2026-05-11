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

NATIONALITY_FLAGS = {
    "British": "🇬🇧", "Dutch": "🇳🇱", "Monegasque": "🇲🇨",
    "Spanish": "🇪🇸", "Australian": "🇦🇺", "Mexican": "🇲🇽",
    "French": "🇫🇷", "German": "🇩🇪", "Finnish": "🇫🇮",
    "Canadian": "🇨🇦", "Thai": "🇹🇭", "Japanese": "🇯🇵",
    "Danish": "🇩🇰", "Chinese": "🇨🇳", "American": "🇺🇸",
    "Italian": "🇮🇹", "Argentine": "🇦🇷", "New Zealander": "🇳🇿",
}

@router.get("/")
async def get_drivers():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.jolpi.ca/ergast/f1/current/driverStandings.json"
        )
        data = r.json()
        standings = data["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"]
        drivers = []
        for s in standings:
            d = s["Driver"]
            c = s["Constructors"][0]
            cid = c["constructorId"]
            name = f"{d['givenName']} {d['familyName']}"
            drivers.append({
                "id": int(s["position"]),
                "code": d.get("code", d["familyName"][:3].upper()),
                "name": name,
                "number": int(d.get("permanentNumber", 0)),
                "nationality": NATIONALITY_FLAGS.get(d["nationality"], "🏁"),
                "nationalityText": d["nationality"],
                "team": c["name"],
                "teamColor": TEAM_COLORS.get(cid, "#888888"),
                "points": int(s["points"]),
                "wins": int(s["wins"]),
                "podiums": 0,
                "poles": 0,
                "fastestLaps": 0,
                "championshipPosition": int(s["position"]),
                "active": True,
                "wikipediaUrl": d["url"],
                "initials": d["givenName"][0] + d["familyName"][0],
            })
        return drivers
