import styles from './TrackCard.module.css'

export default function TrackCard({ track }) {
  const {
    name, shortName, country, flag, city,
    lapLength, laps, lapRecord, lapRecordHolder, lapRecordYear,
    firstGP, turns, drsZones, type, wikipediaUrl,
  } = track

  const typeColor = type === 'Street' ? '#FF8000' : '#27F4D2'

  return (
    <a
      href={wikipediaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.flag}>{flag}</span>
        <div className={styles.headerText}>
          <div className={styles.shortName}>{shortName}</div>
          <div className={styles.country}>{city}, {country}</div>
        </div>
        <span className={styles.typeTag} style={{ color: typeColor, borderColor: typeColor + '44', background: typeColor + '11' }}>
          {type}
        </span>
      </div>

      {/* Full name */}
      <div className={styles.fullName}>{name}</div>

      {/* Key stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statVal}>{lapLength} km</span>
          <span className={styles.statLbl}>Lap Length</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statVal}>{laps}</span>
          <span className={styles.statLbl}>Race Laps</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statVal}>{turns}</span>
          <span className={styles.statLbl}>Turns</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statVal}>{drsZones}</span>
          <span className={styles.statLbl}>DRS Zones</span>
        </div>
      </div>

      {/* Lap record */}
      <div className={styles.lapRecord}>
        <div className={styles.lapRecordLabel}>LAP RECORD</div>
        <div className={styles.lapRecordTime}>{lapRecord}</div>
        <div className={styles.lapRecordHolder}>{lapRecordHolder} · {lapRecordYear}</div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.firstGP}>First GP: {firstGP}</span>
        <span className={styles.wiki}>↗</span>
      </div>
    </a>
  )
}
