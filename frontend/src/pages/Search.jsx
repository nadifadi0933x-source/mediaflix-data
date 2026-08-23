import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

function Search() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('anime')
  
  const { data, loading, error } = useFetch(
    query ? `/${type}?search=${query}&limit=20` : null
  )

  const handleSearch = (e) => {
    e.preventDefault()
  }

  const items = data?.animes || data?.mangas || data?.manhwas || []

  return (
    <div className="search">
      <div className="container">
        <h1 className="page-title">جستجو</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="جستجو کنید..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="anime">انیمه</option>
            <option value="manga">منگا</option>
            <option value="manhwa">مانهوا</option>
          </select>
          <button type="submit" className="btn btn-primary">
            جستجو
          </button>
        </form>

        {loading && <div className="loading">در حال جستجو...</div>}
        {error && <div className="error">{error}</div>}
        
        {query && items.length === 0 && !loading && (
          <div className="no-results">نتیجه‌ای یافت نشد.</div>
        )}

        <div className="card-grid">
          {items.map(item => (
            <Link to={`/${type}/${item.id}`} key={item.id}>
              <div className="card">
                <img 
                  src={item.coverImage} 
                  alt={item.title}
                  className="card-image"
                />
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <div className="card-meta">
                    <span className="rating">⭐ {item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search
