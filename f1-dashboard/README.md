# F1 Dashboard

A Formula 1 analytics dashboard with a React frontend and FastAPI backend, designed to run on Azure.

## Quick Start (Frontend only)

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` — the frontend runs entirely on mock data with no backend needed.

---

## Project Structure

```
f1-dashboard/
├── frontend/         # React + Vite (deploy to Azure Static Web Apps)
│   ├── src/
│   │   ├── pages/        # Home, Drivers, Teams, Tracks, Analysis
│   │   ├── components/   # DriverCard, TeamCard, TrackCard, Navbar, PageHeader
│   │   ├── hooks/        # useF1Data.js — swap mock data for real API here
│   │   └── data/         # Mock data: drivers, teams, tracks, races
│   └── ...
│
└── backend/          # FastAPI (deploy to Azure Container Apps)
    ├── app/
    │   ├── main.py
    │   ├── routers/      # standings, races, drivers, teams, tracks, analysis
    │   └── services/     # cache_service, fastf1_service
    └── scripts/
        └── precompute.py # Run after each race weekend to refresh cache
```

---

## Connecting the Backend

1. Deploy the backend to Azure (see azure-setup.md)
2. Set `VITE_API_BASE_URL=https://<your-container-app-url>` in `frontend/.env.production`
3. In `frontend/src/hooks/useF1Data.js`, uncomment the `useSWR` lines and remove the mock data returns

---

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

After a race weekend, run:
```bash
python scripts/precompute.py --year 2024 --round 8
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Recharts, React Router |
| Backend | FastAPI, Python 3.11 |
| Cache | Azure Cache for Redis |
| Data | FastF1, Ergast API |
| Hosting | Azure Static Web Apps + Container Apps |
