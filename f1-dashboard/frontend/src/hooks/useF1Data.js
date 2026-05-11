import useSWR from 'swr'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const fetcher = (url) => fetch(url).then(r => r.json())

export function useDrivers() {
  const { data, error } = useSWR(`${BASE_URL}/api/drivers/`, fetcher)
  return { data, loading: !data && !error, error }
}

export function useTeams() {
  const { data, error } = useSWR(`${BASE_URL}/api/teams/`, fetcher)
  return { data, loading: !data && !error, error }
}

export function useTracks() {
  const { data, error } = useSWR(`${BASE_URL}/api/tracks/`, fetcher)
  return { data, loading: !data && !error, error }
}

export function useLatestRace() {
  const { data, error } = useSWR(`${BASE_URL}/api/races/latest`, fetcher)
  return { data, loading: !data && !error, error }
}

export function useNextRace() {
  const { data, error } = useSWR(`${BASE_URL}/api/races/next`, fetcher)
  return { data, loading: !data && !error, error }
}

export function useStandingsHistory() {
  const { data, error } = useSWR(`${BASE_URL}/api/analysis/standings-history`, fetcher)
  return { data, loading: !data && !error, error }
}

export function usePrediction() {
  const { data, error } = useSWR(`${BASE_URL}/api/analysis/prediction/next`, fetcher)
  return { data, loading: !data && !error, error }
}

export function useConstructorPoints() {
  const { data, error } = useSWR(`${BASE_URL}/api/standings/constructors`, fetcher)
  return { data, loading: !data && !error, error }
}
