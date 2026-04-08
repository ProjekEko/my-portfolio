import { Link as ScrollLink } from 'react-scroll'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { projects } from '../data/data'

function Navbar({ isScrolled }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [projectCategory, setProjectCategory] = useState(null)
  const [projectYear, setProjectYear] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Deteksi screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])
  
  // Cek apakah sedang di halaman project detail
  const isProjectDetail = location.pathname.startsWith('/project/')
  
  // Ambil data project untuk ditampilkan di navbar
  useEffect(() => {
    if (isProjectDetail) {
      const id = location.pathname.split('/')[2]
      const project = projects.find(p => p.id === parseInt(id))
      if (project) {
        setProjectCategory(project.category)
        setProjectYear(project.year)
      }
    }
  }, [isProjectDetail, location.pathname])
  
  // Fungsi back to home
  const handleBackToHome = () => {
    navigate('/')
  }

  // Data category display
  const categoryDisplay = {
    web: { icon: '🌐', name: 'Web Development' },
    android: { icon: '📱', name: 'Mobile Development' },
    iot: { icon: '🔌', name: 'IoT & Embedded' }
  }

  // Jika di halaman project detail, tampilkan navbar khusus
  if (isProjectDetail) {
    return (
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="nav-container">
          <ScrollLink to="home" smooth={true} duration={500} offset={-70}>
            <div className="logo" style={{ cursor: 'pointer' }}>
              <span className="logo-text">EH</span>
              <div className="logo-glow"></div>
            </div>
          </ScrollLink>
          
          {/* Category & Year di tengah navbar */}
          {projectCategory && (
            <div className="navbar-category">
              <span className="navbar-category-icon">{categoryDisplay[projectCategory]?.icon}</span>
              {/* Sembunyikan teks kategori di mobile kecil */}
              {!isMobile && (
                <span className="navbar-category-name">{categoryDisplay[projectCategory]?.name}</span>
              )}
              <span className="navbar-category-year">{projectYear}</span>
            </div>
          )}
          
          <button onClick={handleBackToHome} className="back-home-btn">
            {isMobile ? '←' : '← Back to Home'}
          </button>
        </div>
      </nav>
    )
  }

  // Tampilan navbar normal untuk halaman Home
  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="nav-container">
        <ScrollLink to="home" smooth={true} duration={500} offset={-70}>
          <div className="logo" style={{ cursor: 'pointer' }}>
            <span className="logo-text">EH</span>
            <div className="logo-glow"></div>
          </div>
        </ScrollLink>
        <ul className="nav-links">
          <li>
            <ScrollLink to="home" smooth={true} duration={500} offset={-70} className="nav-link-btn">
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="skills" smooth={true} duration={500} offset={-70} className="nav-link-btn">
              Skills
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="projects" smooth={true} duration={500} offset={-70} className="nav-link-btn">
              Projects
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="certificates" smooth={true} duration={500} offset={-70} className="nav-link-btn">
              Certificates
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="experience" smooth={true} duration={500} offset={-70} className="nav-link-btn">
              Experience
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="contact" smooth={true} duration={500} offset={-70} className="nav-link-btn">
              Contact
            </ScrollLink>
          </li>
        </ul>
        <button className="resume-btn">Resume →</button>
      </div>
    </nav>
  )
}

export default Navbar