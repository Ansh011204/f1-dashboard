import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Drivers from './pages/Drivers'
import Teams from './pages/Teams'
import Tracks from './pages/Tracks'
import Analysis from './pages/Analysis'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
