import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

function Player() {
  const { animeId, episodeNumber } = useParams()
  const navigate = useNavigate()
  
  const { data, loading, error } = useFetch(`/episodes/${animeId}/${episodeNumber}`)
  const { data: animeData } = useFetch(`/anime/${animeId}`)
  const [videoUrl, setVideoUrl] = useState('')

  useEffect(() => {
    if (data?.videoUrl) {
      setVideoUrl(data.videoUrl)
    }
  }, [data])

  if (loading) return <div className="loading">در حال بارگذاری...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="player">
      <div className="container">
        <div className="video-container">
          {videoUrl ? (
            <video 
              controls 
              autoPlay 
              className="video-player"
              src={videoUrl}
            >
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
            </video>
          ) : (
            <div className="no-video">ویدیو در دسترس نیست</div>
          )}
        </div>
        
        <div className="player-info">
          <h2>{data?.title || `قسمت ${episodeNumber}`}</h2>
          
          <div className="navigation">
            <button 
              onClick={() => navigate(`/anime/${animeId}/watch/${parseInt(episodeNumber) - 1}`)}
              disabled={parseInt(episodeNumber) <= 1}
            >
              قسمت قبلی
            </button>
            <button 
              onClick={() => navigate(`/anime/${animeId}/watch/${parseInt(episodeNumber) + 1}`)}
              disabled={!animeData?.episodes?.some(ep => ep.episodeNumber === parseInt(episodeNumber) + 1)}
            >
              قسمت بعدی
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
