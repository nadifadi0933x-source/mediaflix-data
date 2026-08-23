import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Header() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          انیمه فلیکس
        </Link>
        
        <nav className="nav-links">
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            خانه
          </Link>
          <Link to="/search" className={isActive('/search') ? 'active' : ''}>
            جستجو
          </Link>
          
          {user ? (
            <>
              <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
                پروفایل
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={isActive('/admin') ? 'active' : ''}>
                  مدیریت
                </Link>
              )}
              <button onClick={logout} className="btn">
                خروج
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              ورود
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
