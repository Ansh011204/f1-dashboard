import { useLatestRace, useNextRace, useConstructorPoints } from '../hooks/useF1Data'
import styles from './Home.module.css'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

export default function Home() {
  const { data: race } = useLatestRace()
  const { data: next } = useNextRace()
  const { data: constructors } = useConstructorPoints()

  if (!race) return null

  const top5 = race.results.slice(0, 5)

  return (
    <div className={`${styles.page} page-enter`}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLabel}>LATEST RACE · ROUND {race.round}</div>
          <h1 className={styles.heroTitle}>{race.name}</h1>
          <div className={styles.heroMeta}>
            <span>{race.flag} {race.country}</span>
            <span className={styles.heroDot} />
            <span>{race.date}</span>
            <span className={styles.heroDot} />
            <span>{race.totalLaps} LAPS</span>
          </div>
        </div>

        {/* Next race chip */}
        {next && (
          <div className={styles.nextRaceChip}>
            <div className={styles.nextLabel}>NEXT RACE</div>
            <div className={styles.nextName}>{next.flag} {next.name}</div>
            <div className={styles.nextDate}>{next.date}</div>
          </div>
        )}
      </section>

      <div className={styles.grid}>

        {/* ── Winner ── */}
        <section className={styles.winnerCard}>
          <div className={styles.sectionLabel}>RACE WINNER</div>
          <div className={styles.winnerName}>{race.results[0].driver}</div>
          <div className={styles.winnerTeam} style={{ color: race.results[0].teamColor }}>
            {race.results[0].team}
          </div>
          <div className={styles.winnerTime}>{race.results[0].time}</div>

          <div className={styles.winnerStats}>
            <div className={styles.wStat}>
              <span className={styles.wStatVal}>{race.polePosition.driver.split(' ')[1]}</span>
              <span className={styles.wStatLbl}>Pole</span>
            </div>
            <div className={styles.wStat}>
              <span className={styles.wStatVal}>{race.fastestLap.time}</span>
              <span className={styles.wStatLbl}>FL · {race.fastestLap.driver.split(' ')[1]}</span>
            </div>
            <div className={styles.wStat}>
              <span className={styles.wStatVal}>{race.dnf}</span>
              <span className={styles.wStatLbl}>DNF</span>
            </div>
          </div>
        </section>

        {/* ── Top 5 ── */}
        <section className={styles.top5Card}>
          <div className={styles.sectionLabel}>TOP 5 FINISHERS</div>
          <div className={styles.top5List}>
            {top5.map((r) => (
              <div key={r.position} className={styles.top5Row}>
                <div className={styles.top5Pos}>{r.position}</div>
                <div className={styles.top5Bar} style={{ background: r.teamColor, opacity: 0.8 }} />
                <div className={styles.top5Driver}>
                  <span className={styles.top5Name}>{r.driver}</span>
                  <span className={styles.top5Team} style={{ color: r.teamColor }}>{r.team}</span>
                </div>
                <div className={styles.top5Right}>
                  {r.fastestLap && <span className={styles.flBadge}>FL</span>}
                  <div className={styles.top5Delta} style={{
                    color: r.positionChange > 0 ? '#4CAF50' : r.positionChange < 0 ? '#E8002D' : 'var(--white-dim)'
                  }}>
                    {r.positionChange > 0 ? `▲${r.positionChange}` : r.positionChange < 0 ? `▼${Math.abs(r.positionChange)}` : '●'}
                  </div>
                  <div className={styles.top5Time}>{r.gap}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Constructor Standings Chart ── */}
        <section className={styles.chartCard}>
          <div className={styles.sectionLabel}>CONSTRUCTOR STANDINGS</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={constructors} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <XAxis
                dataKey="team"
                tick={{ fill: '#555', fontFamily: 'Barlow Condensed', fontSize: 11, fontWeight: 700 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#555', fontFamily: 'Barlow Condensed', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '2px', fontFamily: 'Barlow Condensed', fontSize: 13 }}
                labelStyle={{ color: '#F5F5F5', fontWeight: 700 }}
                itemStyle={{ color: '#A0A0A0' }}
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              />
              <Bar dataKey="points" radius={[2, 2, 0, 0]}>
                {constructors.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* ── Race Stats ── */}
        <section className={styles.statsCard}>
          <div className={styles.sectionLabel}>RACE FACTS</div>
          <div className={styles.factsList}>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Circuit</span>
              <span className={styles.factValue}>{race.circuit}</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Pole Position</span>
              <span className={styles.factValue}>{race.polePosition.driver}</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Pole Lap</span>
              <span className={styles.factValue}>{race.polePosition.time}</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Fastest Lap</span>
              <span className={styles.factValue}>{race.fastestLap.driver} — {race.fastestLap.time}</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Safety Cars</span>
              <span className={styles.factValue}>{race.safetyCars}</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Season Round</span>
              <span className={styles.factValue}>{race.round} / 24</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
