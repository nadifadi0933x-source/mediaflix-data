import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

function Reader() {
  const { type, id, chapterNumber } = useParams()
  const navigate = useNavigate()
  
  const { data, loading, error } = useFetch(`/chapters/${type}/${id}/${chapterNumber}`)

  const images = data?.images || []

  const goToNextChapter = () => {
    navigate(`/${type}/${id}/read/${parseInt(chapterNumber) + 1}`)
  }

  const goToPrevChapter = () => {
    if (parseInt(chapterNumber) > 1) {
      navigate(`/${type}/${id}/read/${parseInt(chapterNumber) - 1}`)
    }
  }

  if (loading) return <div className="loading">در حال بارگذاری...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="reader">
      <div className="container">
        <div className="reader-header">
          <h2>{data?.title || `فصل ${chapterNumber}`}</h2>
          <div className="navigation">
            <button onClick={goToPrevChapter} disabled={parseInt(chapterNumber) <= 1}>
              فصل قبلی
            </button>
            <button onClick={goToNextChapter}>
              فصل بعدی
            </button>
          </div>
        </div>

        <div className="images-container">
          {images.length > 0 ? (
            images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`صفحه ${index + 1}`}
                className="reader-image"
              />
            ))
          ) : (
            <div className="no-images">تصویری برای نمایش وجود ندارد.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reader
