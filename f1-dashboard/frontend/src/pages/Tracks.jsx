import { useState } from 'react'
import { useTracks } from '../hooks/useF1Data'
import TrackCard from '../components/TrackCard'
import PageHeader from '../components/PageHeader'
import styles from './Tracks.module.css'

export default function Tracks() {
  const { data: tracks } = useTracks()
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const types = ['ALL', 'Permanent', 'Street']

  const filtered = tracks?.filter(t => {
    const matchType = filter === 'ALL' || t.type === filter
    const matchSearch = t.shortName.toLowerCase().includes(search.toLowerCase()) ||
                        t.country.toLowerCase().includes(search.toLowerCase()) ||
                        t.city.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  }) || []

  return (
    <div className={`${styles.page} page-enter`}>
      <PageHeader
        accent="2024 Calendar"
        title="Circuits"
        subtitle={`${tracks?.length || 0} circuits on the 2024 Formula 1 calendar — click to view on Wikipedia.`}
      />

      {/* Filters */}
      <div className={styles.filters}>
        <input
          className={styles.search}
          placeholder="Search country or city…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.typeFilters}>
          {types.map(t => (
            <button
              key={t}
              className={`${styles.filterBtn} ${filter === t ? styles.filterActive : ''}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className={styles.count}>{filtered.length} circuits</div>
      </div>

      {/* Grid */}
      <div className={`${styles.grid} stagger`}>
        {filtered.map(track => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  )
}
