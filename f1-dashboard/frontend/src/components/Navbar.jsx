import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/drivers', label: 'Drivers' },
  { path: '/teams', label: 'Teams' },
  { path: '/tracks', label: 'Tracks' },
  { path: '/analysis', label: 'Analysis' },
]

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo */}
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoF1}>F1</span>
          <span className={styles.logoDash}>DASHBOARD</span>
        </NavLink>

        {/* Links */}
        <ul className={styles.links}>
          {NAV_ITEMS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
                end={path === '/'}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Season badge */}
        <div className={styles.season}>
          <span className={styles.seasonDot} />
          <span>2026 SEASON</span>
        </div>
      </div>
    </nav>
  )
}
