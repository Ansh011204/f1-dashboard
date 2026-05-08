import { useState } from 'react'
import { useStandingsHistory, usePrediction, useLatestRace } from '../hooks/useF1Data'
import PageHeader from '../components/PageHeader'
import styles from './Analysis.module.css'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'

const TABS = ['Season Overview', 'Race Deep Dive', 'Next Race Prediction', 'Head-to-Head']

export default function Analysis() {
  const [activeTab, setActiveTab] = useState(0)
  const { data: history } = useStandingsHistory()
  const { data: prediction } = usePrediction()
  const { data: lastRace } = useLatestRace()

  return (
    <div className={`${styles.page} page-enter`}>
      <PageHeader
        accent="Data & Analytics"
        title="Analysis"
        subtitle="Pre-computed insights, season trends, and race predictions. All computation runs on the cloud."
      />

      {/* Tab bar */}
      <div className={styles.tabBar}>
        {TABS.map((tab, i) => (
          <button
            key={i}
            className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={styles.tabContent}>
        {activeTab === 0 && <SeasonOverview history={history} />}
        {activeTab === 1 && <RaceDeepDive race={lastRace} />}
        {activeTab === 2 && <NextRacePrediction prediction={prediction} />}
        {activeTab === 3 && <HeadToHead />}
      </div>
    </div>
  )
}

/* ─── Tab 1: Season Overview ─── */
function SeasonOverview({ history }) {
  if (!history) return null

  const chartData = history.rounds.map((round, i) => {
    const entry = { round }
    history.drivers.forEach(d => {
      entry[d.name] = d.points[i]
    })
    return entry
  })

  return (
    <div className={styles.tabPane}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>Points Progression — 2024</div>
        <div className={styles.panelSub}>Driver championship points after each round</div>
      </div>
      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={chartData} margin={{ top: 8, right: 32, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" />
            <XAxis
              dataKey="round"
              tick={{ fill: '#555', fontFamily: 'Barlow Condensed', fontSize: 11, fontWeight: 700 }}
              axisLine={{ stroke: '#222' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#555', fontFamily: 'Barlow Condensed', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ background: '#111', border: '1px solid #2A2A2A', borderRadius: '2px', fontFamily: 'Barlow Condensed', fontSize: 13 }}
              labelStyle={{ color: '#F5F5F5', fontWeight: 700, letterSpacing: '1px' }}
              cursor={{ stroke: '#333' }}
            />
            <Legend
              wrapperStyle={{ fontFamily: 'Barlow Condensed', fontSize: 12, letterSpacing: '1px', paddingTop: '16px' }}
            />
            {history.drivers.map(d => (
              <Line
                key={d.name}
                type="monotone"
                dataKey={d.name}
                stroke={d.color}
                strokeWidth={2}
                dot={{ fill: d.color, r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stat cards */}
      <div className={styles.statCards}>
        {history.drivers.map(d => {
          const latest = d.points[d.points.length - 1]
          const prev = d.points[d.points.length - 2] || 0
          const gained = latest - prev
          return (
            <div key={d.name} className={styles.statCard} style={{ borderTopColor: d.color }}>
              <div className={styles.statCardName}>{d.name}</div>
              <div className={styles.statCardPts}>{latest}</div>
              <div className={styles.statCardGain} style={{ color: gained > 0 ? '#4CAF50' : '#888' }}>
                {gained > 0 ? `+${gained}` : gained} last race
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Tab 2: Race Deep Dive ─── */
function RaceDeepDive({ race }) {
  if (!race) return null

  const posData = race.results.map(r => ({
    driver: r.driver.split(' ')[1],
    grid: r.gridPosition,
    finish: r.position,
    change: r.positionChange,
    team: r.team,
    color: r.teamColor,
  }))

  return (
    <div className={styles.tabPane}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>{race.name} — Post-Race Analysis</div>
        <div className={styles.panelSub}>Grid vs finish position for all drivers</div>
      </div>

      {/* Position changes table */}
      <div className={styles.posTable}>
        <div className={styles.posTableHead}>
          <span>Driver</span>
          <span>Grid</span>
          <span>Finish</span>
          <span>Δ</span>
          <span>Points</span>
          <span>Gap</span>
        </div>
        {race.results.map(r => (
          <div key={r.position} className={styles.posRow}>
            <div className={styles.posDriver}>
              <div className={styles.posBar} style={{ background: r.teamColor }} />
              <span>{r.driver}</span>
            </div>
            <span className={styles.posCell}>{r.gridPosition}</span>
            <span className={styles.posCell}>{r.position}</span>
            <span className={styles.posCell} style={{
              color: r.positionChange > 0 ? '#4CAF50' : r.positionChange < 0 ? '#E8002D' : '#555'
            }}>
              {r.positionChange > 0 ? `▲${r.positionChange}` : r.positionChange < 0 ? `▼${Math.abs(r.positionChange)}` : '—'}
            </span>
            <span className={styles.posCell}>{r.points}</span>
            <span className={styles.posCellMono}>{r.gap}</span>
          </div>
        ))}
      </div>

      <div className={styles.cloudNote}>
        📡 Lap time charts and stint analysis are computed on the cloud — connect the backend to view them here.
      </div>
    </div>
  )
}

/* ─── Tab 3: Next Race Prediction ─── */
function NextRacePrediction({ prediction }) {
  if (!prediction) return null

  return (
    <div className={styles.tabPane}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>AI Prediction — {prediction.race}</div>
        <div className={styles.panelSub}>
          {prediction.circuit} · Model accuracy: <strong>{prediction.modelAccuracy}</strong> · Updated {prediction.lastUpdated}
        </div>
      </div>

      {/* Predicted top 5 */}
      <div className={styles.predGrid}>
        {prediction.predictions.map((p) => (
          <div key={p.position} className={styles.predCard} style={{ '--team-color': p.teamColor }}>
            <div className={styles.predPos}>P{p.position}</div>
            <div className={styles.predDriver}>{p.driver}</div>
            <div className={styles.predTeam} style={{ color: p.teamColor }}>{p.team}</div>
            <div className={styles.confBar}>
              <div className={styles.confFill} style={{ width: `${p.confidence}%`, background: p.teamColor }} />
            </div>
            <div className={styles.confLabel}>{p.confidence}% confidence</div>
          </div>
        ))}
      </div>

      {/* Key factors */}
      <div className={styles.factorsPanel}>
        <div className={styles.factorsTitle}>KEY PREDICTION FACTORS</div>
        <ul className={styles.factorsList}>
          {prediction.keyFactors.map((f, i) => (
            <li key={i} className={styles.factorItem}>
              <span className={styles.factorBullet}>—</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cloudNote}>
        🧠 Prediction model runs on Azure Container Apps. Results are cached and served as static JSON.
      </div>
    </div>
  )
}

/* ─── Tab 4: Head-to-Head ─── */
function HeadToHead() {
  // Static comparison data for demo
  const radarData = [
    { stat: 'Wins', VER: 90, NOR: 40 },
    { stat: 'Podiums', VER: 80, NOR: 55 },
    { stat: 'Poles', VER: 75, NOR: 35 },
    { stat: 'Fastest', VER: 60, NOR: 70 },
    { stat: 'Avg Finish', VER: 85, NOR: 65 },
    { stat: 'DNF Rate', VER: 70, NOR: 80 },
  ]

  return (
    <div className={styles.tabPane}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>Head-to-Head Comparison</div>
        <div className={styles.panelSub}>2024 Season stats — Verstappen vs Norris</div>
      </div>

      <div className={styles.h2hLayout}>
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={340}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1A1A1A" />
              <PolarAngleAxis
                dataKey="stat"
                tick={{ fill: '#666', fontFamily: 'Barlow Condensed', fontSize: 12, fontWeight: 700 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#444', fontSize: 9 }}
                axisLine={false}
              />
              <Radar name="Verstappen" dataKey="VER" stroke="#3671C6" fill="#3671C6" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Norris" dataKey="NOR" stroke="#FF8000" fill="#FF8000" fillOpacity={0.2} strokeWidth={2} />
              <Legend
                wrapperStyle={{ fontFamily: 'Barlow Condensed', fontSize: 13, fontWeight: 700 }}
              />
              <Tooltip
                contentStyle={{ background: '#111', border: '1px solid #2A2A2A', borderRadius: '2px', fontFamily: 'Barlow Condensed' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.h2hStats}>
          {[
            { label: 'Race Wins', ver: 7, nor: 2 },
            { label: 'Podiums', ver: 14, nor: 8 },
            { label: 'Pole Positions', ver: 9, nor: 2 },
            { label: 'Fastest Laps', ver: 5, nor: 4 },
            { label: 'Points', ver: 393, nor: 290 },
            { label: 'DNFs', ver: 1, nor: 2 },
          ].map(row => (
            <div key={row.label} className={styles.h2hRow}>
              <span className={styles.h2hVal} style={{ color: '#3671C6' }}>{row.ver}</span>
              <span className={styles.h2hLabel}>{row.label}</span>
              <span className={styles.h2hVal} style={{ color: '#FF8000' }}>{row.nor}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.cloudNote}>
        ⚙️ Dynamic driver selector and historical H2H data will load from the backend API.
      </div>
    </div>
  )
}
