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

TEAM_DETAILS = {
    "mercedes": {"base": "Brackley, UK", "firstRace": 1954, "championships": 8, "abbr": "MER", "drivers": ["Andrea Kimi Antonelli", "George Russell"]},
    "ferrari": {"base": "Maranello, Italy", "firstRace": 1950, "championships": 16, "abbr": "FER", "drivers": ["Charles Leclerc", "Lewis Hamilton"]},
    "mclaren": {"base": "Woking, UK", "firstRace": 1966, "championships": 8, "abbr": "MCL", "drivers": ["Lando Norris", "Oscar Piastri"]},
    "red_bull": {"base": "Milton Keynes, UK", "firstRace": 2005, "championships": 6, "abbr": "RBR", "drivers": ["Max Verstappen", "Isack Hadjar"]},
    "alpine": {"base": "Enstone, UK", "firstRace": 2021, "championships": 0, "abbr": "ALP", "drivers": ["Pierre Gasly", "Franco Colapinto"]},
    "haas": {"base": "Kannapolis, USA", "firstRace": 2016, "championships": 0, "abbr": "HAA", "drivers": ["Oliver Bearman", "Esteban Ocon"]},
    "rb": {"base": "Faenza, Italy", "firstRace": 2006, "championships": 0, "abbr": "RB", "drivers": ["Liam Lawson", "Arvid Lindblad"]},
    "williams": {"base": "Grove, UK", "firstRace": 1977, "championships": 7, "abbr": "WIL", "drivers": ["Carlos Sainz", "Alexander Albon"]},
    "aston_martin": {"base": "Silverstone, UK", "firstRace": 2021, "championships": 0, "abbr": "AMR", "drivers": ["Fernando Alonso", "Lance Stroll"]},
    "sauber": {"base": "Hinwil, Switzerland", "firstRace": 1993, "championships": 0, "abbr": "SAU", "drivers": ["Nico Hülkenberg", "Gabriel Bortoleto"]},
}

@router.get("/")
async def get_teams():
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.jolpi.ca/ergast/f1/current/constructorStandings.json"
        )
        data = r.json()
        standings = data["MRData"]["StandingsTable"]["StandingsLists"][0]["ConstructorStandings"]
        teams = []
        for i, s in enumerate(standings):
            cid = s["Constructor"]["constructorId"]
            details = TEAM_DETAILS.get(cid, {})
            teams.append({
                "id": i + 1,
                "name": s["Constructor"]["name"],
                "shortName": s["Constructor"]["name"],
                "color": TEAM_COLORS.get(cid, "#888888"),
                "base": details.get("base", "Unknown"),
                "firstRace": details.get("firstRace", 0),
                "engine": "TBC",
                "championships": details.get("championships", 0),
                "points": int(s["points"]),
                "active": True,
                "position": int(s["position"]),
                "drivers": details.get("drivers", []),
                "wikipediaUrl": s["Constructor"]["url"],
                "abbr": details.get("abbr", cid[:3].upper()),
            })
        return teams
