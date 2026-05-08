import styles from './TeamCard.module.css'

export default function TeamCard({ team }) {
  const {
    name, abbr, color, base, firstRace, engine,
    championships, points, active, position,
    drivers, wikipediaUrl,
  } = team

  return (
    <a
      href={wikipediaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      style={{ '--team-color': color }}
    >
      {/* Color spine */}
      <div className={styles.spine} />

      {/* Top row */}
      <div className={styles.top}>
        <div className={styles.abbr}>{abbr}</div>
        <div className={styles.badges}>
          {active
            ? <span className={styles.badgeActive}>ACTIVE</span>
            : <span className={styles.badgeInactive}>INACTIVE</span>
          }
          {championships > 0 && (
            <span className={styles.badgeChamp}>
              {championships}× WCC
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <div className={styles.name}>{name}</div>
      <div className={styles.base}>{base}</div>

      {/* Drivers */}
      <div className={styles.drivers}>
        {drivers.map((d, i) => (
          <span key={i} className={styles.driverPill}>{d}</span>
        ))}
      </div>

      {/* Specs grid */}
      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specLabel}>First Race</span>
          <span className={styles.specValue}>{firstRace}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Engine</span>
          <span className={styles.specValue}>{engine}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Points</span>
          <span className={styles.specValue} style={{ color }}>{points}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Position</span>
          <span className={styles.specValue}>P{position}</span>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.wikiHint}>View on Wikipedia ↗</span>
      </div>

      {/* Hover overlay glow */}
      <div className={styles.glow} />
    </a>
  )
}
