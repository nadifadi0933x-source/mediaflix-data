import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useAuth } from '../hooks/useAuth'
import { usePost } from '../hooks/useFetch'
import { PLACEHOLDER_COVER, handleImageError } from '../utils/helpers'

function AnimeDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [selectedEpisode, setSelectedEpisode] = useState(null)
  const { post } = usePost()
  
  const { data, loading, error } = useFetch(`/anime/${id}`)

  if (loading) return <div className="loading">در حال بارگذاری...</div>
  if (error) return <div className="error">{error}</div>
  if (!data) return <div className="error">انیمه مورد نظر یافت نشد.</div>

  const handleAddToWatchlist = async () => {
    if (!user) {
      alert('لطفاً ابتدا وارد شوید.')
      return
    }
    await post(`/anime/${id}/watchlist/1`, { status: 'watching' })
    alert('به لیست تماشا اضافه شد.')
  }

  return (
    <div className="anime-detail">
      <div className="container">
        <div className="detail-header">
          <img src={data.coverImage || PLACEHOLDER_COVER} alt={data.title} className="detail-cover" onError={handleImageError} />
          <div className="detail-info">
            <h1>{data.title}</h1>
            <div className="meta">
              <span>⭐ {data.rating}</span>
              <span>{data.status === 'ongoing' ? 'در حال پخش' : 'تمام شده'}</span>
              <span>{data.totalEpisodes} قسمت</span>
            </div>
            <p className="description">{data.description}</p>
            <div className="genres">
              {data.genre?.split(',').map((g, i) => (
                <span key={i} className="genre-tag">{g.trim()}</span>
              ))}
            </div>
            {user && (
              <button onClick={handleAddToWatchlist} className="btn btn-primary">
                افزودن به لیست تماشا
              </button>
            )}
          </div>
        </div>

        <h2 className="page-title">قسمت‌ها</h2>
        <div className="episodes-grid">
          {data.episodes?.map(episode => (
            <Link 
              to={`/anime/${id}/watch/${episode.episodeNumber}`} 
              key={episode.id}
            >
              <div className="episode-card">
                <span className="episode-number">قسمت {episode.episodeNumber}</span>
                <span className="episode-title">{episode.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnimeDetail
