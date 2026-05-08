export const LATEST_RACE = {
  name: "Monaco Grand Prix",
  round: 8,
  season: 2024,
  circuit: "Circuit de Monaco",
  date: "2024-05-26",
  country: "Monaco",
  flag: "🇲🇨",
  totalLaps: 78,
  results: [
    { position: 1, driver: "Charles Leclerc", team: "Ferrari", teamColor: "#E8002D", time: "1:56:15.455", gap: "WINNER", points: 25, fastestLap: false, gridPosition: 1, positionChange: 0 },
    { position: 2, driver: "Oscar Piastri", team: "McLaren", teamColor: "#FF8000", time: "+7.152s", gap: "+7.152s", points: 18, fastestLap: false, gridPosition: 4, positionChange: 2 },
    { position: 3, driver: "Carlos Sainz", team: "Ferrari", teamColor: "#E8002D", time: "+7.585s", gap: "+7.585s", points: 15, fastestLap: false, gridPosition: 2, positionChange: -1 },
    { position: 4, driver: "Lando Norris", team: "McLaren", teamColor: "#FF8000", time: "+16.639s", gap: "+16.639s", points: 12, fastestLap: true, gridPosition: 3, positionChange: -1 },
    { position: 5, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6", time: "+20.769s", gap: "+20.769s", points: 10, fastestLap: false, gridPosition: 6, positionChange: 1 },
    { position: 6, driver: "George Russell", team: "Mercedes", teamColor: "#27F4D2", time: "+27.109s", gap: "+27.109s", points: 8, fastestLap: false, gridPosition: 8, positionChange: 2 },
    { position: 7, driver: "Lewis Hamilton", team: "Mercedes", teamColor: "#27F4D2", time: "+33.560s", gap: "+33.560s", points: 6, fastestLap: false, gridPosition: 7, positionChange: 0 },
    { position: 8, driver: "Fernando Alonso", team: "Aston Martin", teamColor: "#229971", time: "+38.765s", gap: "+38.765s", points: 4, fastestLap: false, gridPosition: 9, positionChange: 1 },
    { position: 9, driver: "Sergio Pérez", team: "Red Bull", teamColor: "#3671C6", time: "+46.128s", gap: "+46.128s", points: 2, fastestLap: false, gridPosition: 5, positionChange: -4 },
    { position: 10, driver: "Lance Stroll", team: "Aston Martin", teamColor: "#229971", time: "+55.261s", gap: "+55.261s", points: 1, fastestLap: false, gridPosition: 11, positionChange: 1 },
  ],
  fastestLap: { driver: "Lando Norris", time: "1:15.228", lap: 67 },
  polePosition: { driver: "Charles Leclerc", time: "1:10.270" },
  safetyCars: 1,
  dnf: 2,
}

export const NEXT_RACE = {
  name: "Canadian Grand Prix",
  round: 9,
  season: 2024,
  circuit: "Circuit Gilles Villeneuve",
  date: "2024-06-09",
  country: "Canada",
  flag: "🇨🇦",
  daysUntil: 14,
}

export const SEASON_STANDINGS_HISTORY = {
  rounds: ["BHR", "SAU", "AUS", "JPN", "CHN", "MIA", "IML", "MON"],
  drivers: [
    { name: "Verstappen", color: "#3671C6", points: [25, 44, 69, 94, 119, 144, 169, 179] },
    { name: "Leclerc",    color: "#E8002D", points: [6,  12, 18, 30, 48, 60, 78, 103]  },
    { name: "Norris",     color: "#FF8000", points: [0,  10, 16, 28, 40, 58, 76, 88]   },
    { name: "Sainz",      color: "#DC143C", points: [18, 26, 38, 50, 62, 70, 82, 97]   },
    { name: "Hamilton",   color: "#27F4D2", points: [10, 18, 24, 36, 50, 62, 74, 80]   },
  ]
}

export const PREDICTION_NEXT_RACE = {
  race: "Canadian Grand Prix",
  circuit: "Circuit Gilles Villeneuve",
  predictions: [
    { position: 1, driver: "Max Verstappen", team: "Red Bull Racing", confidence: 42, teamColor: "#3671C6" },
    { position: 2, driver: "Lando Norris",   team: "McLaren",          confidence: 71, teamColor: "#FF8000" },
    { position: 3, driver: "Charles Leclerc",team: "Ferrari",           confidence: 58, teamColor: "#E8002D" },
    { position: 4, driver: "Carlos Sainz",   team: "Ferrari",           confidence: 51, teamColor: "#E8002D" },
    { position: 5, driver: "George Russell", team: "Mercedes",          confidence: 39, teamColor: "#27F4D2" },
  ],
  keyFactors: [
    "Verstappen has won 3 of last 4 Canadian GPs",
    "McLaren's strong straight-line speed suits Montreal",
    "Ferrari excelled in similar medium-speed configs",
    "Risk of rain on Saturday — affects qualifying order",
    "Tire degradation historically low at this circuit",
  ],
  modelAccuracy: "73%",
  lastUpdated: "2024-05-28",
}

export const CONSTRUCTOR_POINTS = [
  { team: "Red Bull", points: 545, color: "#3671C6" },
  { team: "Ferrari",  points: 558, color: "#E8002D" },
  { team: "McLaren",  points: 487, color: "#FF8000" },
  { team: "Mercedes", points: 409, color: "#27F4D2" },
  { team: "Aston Martin", points: 86, color: "#229971" },
]
