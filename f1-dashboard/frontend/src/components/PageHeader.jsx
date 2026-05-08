import styles from './PageHeader.module.css'

export default function PageHeader({ title, subtitle, accent }) {
  return (
    <div className={styles.header}>
      {accent && <div className={styles.accent}>{accent}</div>}
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.rule} />
    </div>
  )
}
