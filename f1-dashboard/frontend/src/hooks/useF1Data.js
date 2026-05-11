import { DRIVERS } from '../data/drivers'
import { TEAMS } from '../data/teams'
import { TRACKS } from '../data/tracks'
import { LATEST_RACE, NEXT_RACE, SEASON_STANDINGS_HISTORY, PREDICTION_NEXT_RACE, CONSTRUCTOR_POINTS } from '../data/races'

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
  return { data: CONSTRUCTOR_POINTS, loading: false, error: null }
}
