from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import standings, races, drivers, teams, tracks, analysis

app = FastAPI(
    title="F1 Dashboard API",
    version="1.0.0",
    description="Backend for F1 Dashboard — computes and caches all data on the cloud.",
)

# CORS — update origins for your Azure Static Web App URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://<your-static-web-app>.azurestaticapps.net"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Routers
app.include_router(standings.router, prefix="/api/standings", tags=["Standings"])
app.include_router(races.router,     prefix="/api/races",     tags=["Races"])
app.include_router(drivers.router,   prefix="/api/drivers",   tags=["Drivers"])
app.include_router(teams.router,     prefix="/api/teams",     tags=["Teams"])
app.include_router(tracks.router,    prefix="/api/tracks",    tags=["Tracks"])
app.include_router(analysis.router,  prefix="/api/analysis",  tags=["Analysis"])

@app.get("/health")
def health():
    return {"status": "ok"}
