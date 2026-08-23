import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

function Profile() {
  const { user } = useAuth()
  const { data, loading } = useFetch('/user/watchlist')
  const [activeTab, setActiveTab] = useState('watchlist')

  if (!user) {
    return (
      <div className="container">
        <div className="loading">لطفاً ابتدا وارد شوید.</div>
      </div>
    )
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-header">
          <div className="avatar">
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <span className="role">{user.role === 'admin' ? 'مدیر' : 'کاربر'}</span>
          </div>
        </div>

        <div className="tabs">
          <button 
            className={activeTab === 'watchlist' ? 'active' : ''}
            onClick={() => setActiveTab('watchlist')}
          >
            لیست تماشا
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            تنظیمات
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'watchlist' && (
            <div>
              {loading && <div className="loading">در حال بارگذاری...</div>}
              {data && (
                <div className="watchlist-grid">
                  {data.map(item => (
                    <Link to={`/${item.item?.type || 'anime'}/${item.item?.id}`} key={item.id}>
                      <div className="card">
                        <img 
                          src={item.item?.coverImage} 
                          alt={item.item?.title}
                          className="card-image"
                        />
                        <div className="card-content">
                          <h3 className="card-title">{item.item?.title}</h3>
                          <div className="card-meta">
                            <span>{item.status}</span>
                            <span>{item.lastEpisode || item.lastChapter || 0} مشاهده شده</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="settings">
              <h3>تنظیمات حساب کاربری</h3>
              <p>تنظیمات در این بخش در دسترس خواهد بود.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
