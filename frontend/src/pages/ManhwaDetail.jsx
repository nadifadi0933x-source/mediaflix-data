import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useAuth } from '../hooks/useAuth'
import { usePost } from '../hooks/useFetch'
import { PLACEHOLDER_COVER, handleImageError } from '../utils/helpers'

function ManhwaDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { post } = usePost()
  
  const { data, loading, error } = useFetch(`/manhwa/${id}`)

  if (loading) return <div className="loading">در حال بارگذاری...</div>
  if (error) return <div className="error">{error}</div>
  if (!data) return <div className="error">مانهوا مورد نظر یافت نشد.</div>

  const handleAddToWatchlist = async () => {
    if (!user) {
      alert('لطفاً ابتدا وارد شوید.')
      return
    }
    await post(`/manhwa/${id}/watchlist/1`, { status: 'watching' })
    alert('به لیست تماشا اضافه شد.')
  }

  return (
    <div className="manhwa-detail">
      <div className="container">
        <div className="detail-header">
          <img src={data.coverImage || PLACEHOLDER_COVER} alt={data.title} className="detail-cover" onError={handleImageError} />
          <div className="detail-info">
            <h1>{data.title}</h1>
            <div className="meta">
              <span>⭐ {data.rating}</span>
              <span>{data.status === 'ongoing' ? 'در حال پخش' : 'تمام شده'}</span>
              <span>{data.totalChapters} فصل</span>
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

        <h2 className="page-title">فصل‌ها</h2>
        <div className="chapters-grid">
          {data.chapters?.map(chapter => (
            <Link 
              to={`/manhwa/${id}/read/${chapter.chapterNumber}`} 
              key={chapter.id}
            >
              <div className="chapter-card">
                <span className="chapter-number">فصل {chapter.chapterNumber}</span>
                <span className="chapter-title">{chapter.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManhwaDetail
