"""
FastF1 data ingestion service.
Called by scripts/precompute.py after each race weekend.
Results are stored in Redis / Azure Blob — never computed live per request.
"""
import fastf1

def get_session(year: int, round_number: int, session_type: str = "R"):
    """Load a race session. session_type: R=Race, Q=Qualifying, FP1/FP2/FP3."""
    fastf1.Cache.enable_cache("cache/fastf1")
    session = fastf1.get_session(year, round_number, session_type)
    session.load()
    return session

def get_lap_times(session) -> list[dict]:
    """Return per-driver lap time data as a list of dicts."""
    laps = session.laps[["Driver", "LapNumber", "LapTime", "Compound", "Stint"]].copy()
    laps["LapTime"] = laps["LapTime"].dt.total_seconds()
    return laps.dropna(subset=["LapTime"]).to_dict(orient="records")

def get_position_data(session) -> list[dict]:
    """Return grid vs finish positions for all drivers."""
    results = session.results[["Abbreviation", "FullName", "TeamName", "GridPosition", "Position", "Points", "Status"]]
    return results.to_dict(orient="records")
