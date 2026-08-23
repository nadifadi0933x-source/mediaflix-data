import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('anime')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    coverImage: '',
    status: 'ongoing',
    totalEpisodes: 0,
    releaseYear: new Date().getFullYear(),
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission
    alert('این قابلیت در نسخه کامل در دسترس خواهد بود.')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="admin">
      <div className="container">
        <h1 className="page-title">پنل مدیریت</h1>
        
        <div className="tabs">
          <button 
            className={activeTab === 'anime' ? 'active' : ''}
            onClick={() => setActiveTab('anime')}
          >
            انیمه
          </button>
          <button 
            className={activeTab === 'manga' ? 'active' : ''}
            onClick={() => setActiveTab('manga')}
          >
            منگا
          </button>
          <button 
            className={activeTab === 'manhwa' ? 'active' : ''}
            onClick={() => setActiveTab('manhwa')}
          >
            مانهوا
          </button>
        </div>

        <div className="admin-form">
          <h3>افزودن {activeTab === 'anime' ? 'انیمه' : activeTab === 'manga' ? 'منگا' : 'مانهوا'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>عنوان</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>توضیحات</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>
            
            <div className="form-group">
              <label>ژانر</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>لینک تصویر کاور</label>
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>وضعیت</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="ongoing">در حال پخش</option>
                <option value="completed">تمام شده</option>
              </select>
            </div>
            
            <button type="submit" className="btn btn-primary">
              افزودن
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Admin
