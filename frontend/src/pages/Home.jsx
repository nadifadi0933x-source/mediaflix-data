import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { GENRES } from '../utils/constants'

function Home() {
  const [selectedGenre, setSelectedGenre] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const { data, loading, error } = useFetch(
    `/anime?page=${currentPage}&limit=12${selectedGenre ? `&genre=${selectedGenre}` : ''}`
  )

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>به انیمه فلیکس خوش آمدید</h1>
          <p>
            بهترین انیمه‌ها، منگاها و مانهواها را به صورت آنلاین تماشا کنید
          </p>
        </div>
      </section>

      <section className="container">
        <div className="filters">
          <select 
            value={selectedGenre} 
            onChange={(e) => {
              setSelectedGenre(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option value="">همه ژانرها</option>
            {GENRES.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {loading && <div className="loading">در حال بارگذاری...</div>}
        {error && <div className="error">{error}</div>}
        
        {data && (
          <>
            <div className="card-grid">
              {data.animes?.map(anime => (
                <Link to={`/anime/${anime.id}`} key={anime.id}>
                  <div className="card">
                    <img 
                      src={anime.coverImage} 
                      alt={anime.title}
                      className="card-image"
                    />
                    <div className="card-content">
                      <h3 className="card-title">{anime.title}</h3>
                      <div className="card-meta">
                        <span>{anime.status === 'ongoing' ? 'در حال پخش' : 'تمام شده'}</span>
                        <span className="rating">⭐ {anime.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {data.totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => setCurrentPage(p => p - 1)}
                  disabled={currentPage === 1}
                >
                  قبلی
                </button>
                <span>{currentPage} / {data.totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={currentPage === data.totalPages}
                >
                  بعدی
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default Home
