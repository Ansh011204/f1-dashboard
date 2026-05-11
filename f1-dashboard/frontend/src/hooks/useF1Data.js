import { useState, useEffect } from 'react'
import { DRIVERS } from '../data/drivers'
import { TRACKS } from '../data/tracks'
import { LATEST_RACE, NEXT_RACE, SEASON_STANDINGS_HISTORY, PREDICTION_NEXT_RACE, CONSTRUCTOR_POINTS, TEAMS as MOCK_TEAMS } from '../data/races'

const BASE_URL = 'https://f1-dashboard-api-fscyf2dradhxebh9.centralindia-01.azurewebsites.net'

function useFetch(url, fallback) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(json => { setData(json); setLoading(false) })
      .catch(() => { setData(fallback); setLoading(false) })
  }, [url])

  return { data: data || fallback, loading }
}

export function useDrivers() {
  return useFetch(`${BASE_URL}/api/drivers/`, DRIVERS)
}

export function useTeams() {
  return useFetch(`${BASE_URL}/api/teams/`, [])
}

export function useTracks() {
  return { data: TRACKS, loading: false, error: null }
}

export function useLatestRace() {
  return useFetch(`${BASE_URL}/api/races/latest`, LATEST_RACE)
}

export function useNextRace() {
  return useFetch(`${BASE_URL}/api/races/next`, NEXT_RACE)
}

export function useStandingsHistory() {
  return { data: SEASON_STANDINGS_HISTORY, loading: false, error: null }
}

export function usePrediction() {
  return { data: PREDICTION_NEXT_RACE, loading: false, error: null }
}

export function useConstructorPoints() {
  return useFetch(`${BASE_URL}/api/standings/constructors`, CONSTRUCTOR_POINTS)
}
