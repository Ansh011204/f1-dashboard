import styles from './DriverCard.module.css'

export default function DriverCard({ driver }) {
  const {
    code, name, number, nationality, team, teamColor,
    points, wins, podiums, poles, championshipPosition,
    wikipediaUrl, initials,
  } = driver

  return (
    <a
      href={wikipediaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      style={{ '--team-color': teamColor }}
    >
      {/* Position badge */}
      <div className={styles.positionBadge}>P{championshipPosition}</div>

      {/* Driver number background watermark */}
      <div className={styles.numberWatermark}>{number}</div>

      {/* Avatar */}
      <div className={styles.avatar}>
        <span className={styles.initials}>{initials}</span>
        <div className={styles.avatarAccent} />
      </div>

      {/* Code + name */}
      <div className={styles.identity}>
        <span className={styles.code}>{code}</span>
        <span className={styles.name}>{name}</span>
        <span className={styles.team} style={{ color: teamColor }}>{team}</span>
      </div>

      {/* Stats row */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{points}</span>
          <span className={styles.statLabel}>PTS</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{wins}</span>
          <span className={styles.statLabel}>WINS</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{podiums}</span>
          <span className={styles.statLabel}>POD</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{poles}</span>
          <span className={styles.statLabel}>POLES</span>
        </div>
      </div>

      {/* Nationality footer */}
      <div className={styles.footer}>
        <span>{nationality}</span>
        <span className={styles.wikiHint}>Wikipedia ↗</span>
      </div>

      {/* Hover bar */}
      <div className={styles.hoverBar} />
    </a>
  )
}
