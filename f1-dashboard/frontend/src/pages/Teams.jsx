import { useTeams } from '../hooks/useF1Data'
import TeamCard from '../components/TeamCard'
import PageHeader from '../components/PageHeader'
import styles from './Teams.module.css'

export default function Teams() {
  const { data: teams } = useTeams()

  const activeTeams = teams?.filter(t => t.active) || []
  const inactiveTeams = teams?.filter(t => !t.active) || []

  return (
    <div className={`${styles.page} page-enter`}>
      <PageHeader
        accent="2024 Season"
        title="Constructors"
        subtitle="All 10 Formula 1 constructor teams — click a card to read more on Wikipedia."
      />

      {/* Standings bar */}
      <div className={styles.standingsBar}>
        <div className={styles.standingsLabel}>CONSTRUCTOR STANDINGS</div>
        <div className={styles.standingsList}>
          {activeTeams
            .sort((a, b) => a.position - b.position)
            .map(team => (
              <div key={team.id} className={styles.standingItem}>
                <span className={styles.standingPos}>P{team.position}</span>
                <span className={styles.standingDot} style={{ background: team.color }} />
                <span className={styles.standingName}>{team.shortName}</span>
                <span className={styles.standingPts}>{team.points}</span>
              </div>
            ))
          }
        </div>
      </div>

      {/* Active teams grid */}
      <div className={`${styles.grid} stagger`}>
        {activeTeams
          .sort((a, b) => a.position - b.position)
          .map(team => <TeamCard key={team.id} team={team} />)
        }
      </div>
    </div>
  )
}
