import useSWR from 'swr'
import { DRIVERS } from '../data/drivers'
import { TEAMS } from '../data/teams'
import { TRACKS } from '../data/tracks'
import { LATEST_RACE, NEXT_RACE, SEASON_STANDINGS_HISTORY, PREDICTION_NEXT_RACE } from '../data/races'

const BASE_URL = 'https://f1-dashboard-api-fscyf2dradhxebh9.centralindia-01.azurewebsites.net'
const fetcher = (url) => fetch(url).then(r => r.json())

export function useDrivers() {
  return { data: DRIVERS, loading: false, error: null }
}

export function useTeams() {
  return { data: TEAMS, loading: false, error: null }
}

export function useTracks() {
  return { data: TRACKS, loading: false, error: null }
}

export function useLatestRace() {
  return { data: LATEST_RACE, loading: false, error: null }
}

export function useNextRace() {
  return { data: NEXT_RACE, loading: false, error: null }
}

export function useStandingsHistory() {
  return { data: SEASON_STANDINGS_HISTORY, loading: false, error: null }
}

export function usePrediction() {
  return { data: PREDICTION_NEXT_RACE, loading: false, error: null }
}

export function useConstructorPoints() {
  const { data, error } = useSWR(`${BASE_URL}/api/standings/constructors`, fetcher)
  const formatted = data?.map(c => ({
    team: c.Constructor.name,
    points: parseInt(c.points),
    color: getTeamColor(c.Constructor.constructorId)
  }))
  return { data: formatted, loading: !data && !error, error }
}

function getTeamColor(id) {
  const colors = {
    mercedes: '#27F4D2',
    ferrari: '#E8002D',
    mclaren: '#FF8000',
    red_bull: '#3671C6',
    alpine: '#0093CC',
    haas: '#B6BABD',
    rb: '#6692FF',
    williams: '#64C4FF',
    aston_martin: '#229971',
    sauber: '#52E252',
  }
  return colors[id] || '#888888'
}
