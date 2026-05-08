import { useState } from 'react'
import { useDrivers } from '../hooks/useF1Data'
import DriverCard from '../components/DriverCard'
import PageHeader from '../components/PageHeader'
import styles from './Drivers.module.css'

export default function Drivers() {
  const { data: drivers } = useDrivers()
  const [search, setSearch] = useState('')
  const [filterTeam, setFilterTeam] = useState('ALL')

  const teams = ['ALL', ...new Set(drivers?.map(d => d.team) || [])]

  const filtered = drivers?.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
                        d.code.toLowerCase().includes(search.toLowerCase())
    const matchTeam = filterTeam === 'ALL' || d.team === filterTeam
    return matchSearch && matchTeam
  }) || []

  return (
    <div className={`${styles.page} page-enter`}>
      <PageHeader
        accent="2024 Season"
        title="Drivers"
        subtitle="Current Formula 1 drivers — click any card to view on Wikipedia."
      />

      {/* Filters */}
      <div className={styles.filters}>
        <input
          className={styles.search}
          placeholder="Search driver or code…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.teamFilters}>
          {teams.map(t => (
            <button
              key={t}
              className={`${styles.filterBtn} ${filterTeam === t ? styles.filterActive : ''}`}
              onClick={() => setFilterTeam(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className={styles.count}>
        {filtered.length} driver{filtered.length !== 1 ? 's' : ''} shown
      </div>

      {/* Grid */}
      <div className={`${styles.grid} stagger`}>
        {filtered.map(driver => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  )
}
