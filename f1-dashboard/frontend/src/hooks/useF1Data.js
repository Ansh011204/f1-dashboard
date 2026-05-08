/**
 * useF1Data — central data hook
 * Currently returns mock/static data.
 * To wire up real API: replace each return value with a useSWR/fetch call
 * pointing at your Azure Container Apps backend URL from VITE_API_BASE_URL.
 */

import { DRIVERS } from '../data/drivers'
import { TEAMS } from '../data/teams'
import { TRACKS } from '../data/tracks'
import {
  LATEST_RACE,
  NEXT_RACE,
  SEASON_STANDINGS_HISTORY,
  PREDICTION_NEXT_RACE,
  CONSTRUCTOR_POINTS,
} from '../data/races'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// ── When you're ready to switch to real API, uncomment + implement these:
// import useSWR from 'swr'
// const fetcher = (url) => fetch(url).then(r => r.json())

export function useDrivers() {
  // Real: const { data, error } = useSWR(`${BASE_URL}/api/drivers`, fetcher)
  return { data: DRIVERS, loading: false, error: null }
}

export function useTeams() {
  // Real: const { data, error } = useSWR(`${BASE_URL}/api/teams`, fetcher)
  return { data: TEAMS, loading: false, error: null }
}

export function useTracks() {
  // Real: const { data, error } = useSWR(`${BASE_URL}/api/tracks`, fetcher)
  return { data: TRACKS, loading: false, error: null }
}

export function useLatestRace() {
  // Real: const { data, error } = useSWR(`${BASE_URL}/api/races/latest`, fetcher)
  return { data: LATEST_RACE, loading: false, error: null }
}

export function useNextRace() {
  // Real: const { data, error } = useSWR(`${BASE_URL}/api/races/next`, fetcher)
  return { data: NEXT_RACE, loading: false, error: null }
}

export function useStandingsHistory() {
  // Real: const { data, error } = useSWR(`${BASE_URL}/api/analysis/standings-history`, fetcher)
  return { data: SEASON_STANDINGS_HISTORY, loading: false, error: null }
}

export function usePrediction() {
  // Real: const { data, error } = useSWR(`${BASE_URL}/api/analysis/prediction/next`, fetcher)
  return { data: PREDICTION_NEXT_RACE, loading: false, error: null }
}

export function useConstructorPoints() {
  // Real: const { data, error } = useSWR(`${BASE_URL}/api/standings/constructors`, fetcher)
  return { data: CONSTRUCTOR_POINTS, loading: false, error: null }
}
