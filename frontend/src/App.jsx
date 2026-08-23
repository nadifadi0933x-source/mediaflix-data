import { Routes, Route } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AnimeDetail from './pages/AnimeDetail'
import MangaDetail from './pages/MangaDetail'
import ManhwaDetail from './pages/ManhwaDetail'
import Player from './pages/Player'
import Reader from './pages/Reader'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Search from './pages/Search'

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/anime/:animeId/watch/:episodeNumber" element={<Player />} />
            <Route path="/manga/:id" element={<MangaDetail />} />
            <Route path="/manga/:mangaId/read/:chapterNumber" element={<Reader />} />
            <Route path="/manhwa/:id" element={<ManhwaDetail />} />
            <Route path="/manhwa/:manhwaId/read/:chapterNumber" element={<Reader />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
