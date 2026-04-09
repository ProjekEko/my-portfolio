import { Link as ScrollLink } from 'react-scroll'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { projects } from '../data/data'

function Navbar({ isScrolled }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [projectCategory, setProjectCategory] = useState(null)
  const [projectYear, setProjectYear] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCvDropdownOpen, setIsCvDropdownOpen] = useState(false)
  const cvDropdownRef = useRef(null)
  
  // Scroll lock effect
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])
  
  // Deteksi screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])
  
  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cvDropdownRef.current && !cvDropdownRef.current.contains(event.target)) {
        setIsCvDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // Tutup menu saat klik link
  const handleMenuClick = () => {
    setIsMenuOpen(false)
  }
  
  // Fungsi download CV dengan pilihan bahasa
  const handleDownloadCV = (lang) => {
    const cvFiles = {
      id: '/cv-eko-haryadi-id.pdf',
      en: '/cv-eko-haryadi-en.pdf'
    }
    const cvUrl = cvFiles[lang] || cvFiles.id
    const fileName = `CV_Eko_Haryadi_${lang === 'id' ? 'Indonesia' : 'English'}.pdf`
    
    const link = document.createElement('a')
    link.href = cvUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setIsCvDropdownOpen(false)
  }
  
  // Fungsi scroll ke section dari halaman project detail
  const handleScrollToSection = (section) => {
    navigate('/')
    setTimeout(() => {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
    setIsMenuOpen(false)
  }
  
  // Fungsi navigasi ke home
  const handleGoToHome = () => {
    navigate('/')
    setIsMenuOpen(false)
  }
  
  // Toggle CV dropdown
  const toggleCvDropdown = () => {
    setIsCvDropdownOpen(!isCvDropdownOpen)
  }
  
  // Cek apakah sedang di halaman project detail
  const isProjectDetail = location.pathname.startsWith('/project/')
  
  // Ambil data project untuk ditampilkan
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

  // Data category display
  const categoryDisplay = {
    web: { icon: '🌐', name: 'Web Development' },
    android: { icon: '📱', name: 'Mobile Development' },
    iot: { icon: '🔌', name: 'IoT & Embedded' }
  }

  // Komponen tombol CV dengan dropdown (hanya untuk desktop >768px)
  const CvButton = () => (
    <div className={`cv-dropdown desktop-only ${isMobile ? 'hide-on-mobile' : ''}`} ref={cvDropdownRef}>
      <button onClick={toggleCvDropdown} className="resume-btn">
        📄 Download CV ▼
      </button>
      {isCvDropdownOpen && (
        <div className="cv-dropdown-menu">
          <button onClick={() => handleDownloadCV('id')} className="cv-dropdown-item">
            🇮🇩 Bahasa Indonesia
          </button>
          <button onClick={() => handleDownloadCV('en')} className="cv-dropdown-item">
            🇬🇧 English
          </button>
        </div>
      )}
    </div>
  )

  // Komponen CV button untuk mobile menu (selalu tampil di dalam hamburger)
  const MobileCvButton = () => (
    <div className="mobile-cv-dropdown">
      <button onClick={() => handleDownloadCV('id')} className="mobile-resume-btn">
        🇮🇩 Download CV (Indonesia)
      </button>
      <button onClick={() => handleDownloadCV('en')} className="mobile-resume-btn en">
        🇬🇧 Download CV (English)
      </button>
    </div>
  )

  // Jika di halaman project detail, tampilkan navbar dengan menu lengkap
  if (isProjectDetail) {
    return (
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="logo" onClick={handleGoToHome} style={{ cursor: 'pointer' }}>
            <span className="logo-text">EH</span>
            <div className="logo-glow"></div>
          </div>
          
          {/* Desktop Menu */}
          <ul className="nav-links desktop-menu">
            <li>
              <button onClick={() => handleScrollToSection('home')} className="nav-link-btn">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection('skills')} className="nav-link-btn">
                Skills
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection('projects')} className="nav-link-btn">
                Projects
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection('certificates')} className="nav-link-btn">
                Certificates
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection('experience')} className="nav-link-btn">
                Experience
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection('contact')} className="nav-link-btn">
                Contact
              </button>
            </li>
          </ul>
          
          {/* Tombol Download CV Desktop - hanya tampil di desktop */}
          <CvButton />
          
          {/* Mobile Hamburger Button */}
          <button 
            className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
        
        {/* Mobile Menu Overlay - Download CV ada di sini untuk mobile */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            <li onClick={handleMenuClick}>
              <button onClick={() => handleScrollToSection('home')} className="mobile-nav-link">
                🏠 Home
              </button>
            </li>
            <li onClick={handleMenuClick}>
              <button onClick={() => handleScrollToSection('skills')} className="mobile-nav-link">
                ⚡ Skills
              </button>
            </li>
            <li onClick={handleMenuClick}>
              <button onClick={() => handleScrollToSection('projects')} className="mobile-nav-link">
                📱 Projects
              </button>
            </li>
            <li onClick={handleMenuClick}>
              <button onClick={() => handleScrollToSection('certificates')} className="mobile-nav-link">
                📜 Certificates
              </button>
            </li>
            <li onClick={handleMenuClick}>
              <button onClick={() => handleScrollToSection('experience')} className="mobile-nav-link">
                💼 Experience
              </button>
            </li>
            <li onClick={handleMenuClick}>
              <button onClick={() => handleScrollToSection('contact')} className="mobile-nav-link">
                📧 Contact
              </button>
            </li>
            <li className="mobile-cv-divider"></li>
            <li>
              <MobileCvButton />
            </li>
          </ul>
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
        
        {/* Desktop Menu */}
        <ul className="nav-links desktop-menu">
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
        
        {/* Tombol Download CV Desktop - hanya tampil di desktop */}
        <CvButton />
        
        {/* Mobile Hamburger Button */}
        <button 
          className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
      
      {/* Mobile Menu Overlay - Download CV ada di sini untuk mobile */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li onClick={handleMenuClick}>
            <ScrollLink to="home" smooth={true} duration={500} offset={-70} className="mobile-nav-link">
              🏠 Home
            </ScrollLink>
          </li>
          <li onClick={handleMenuClick}>
            <ScrollLink to="skills" smooth={true} duration={500} offset={-70} className="mobile-nav-link">
              ⚡ Skills
            </ScrollLink>
          </li>
          <li onClick={handleMenuClick}>
            <ScrollLink to="projects" smooth={true} duration={500} offset={-70} className="mobile-nav-link">
              📱 Projects
            </ScrollLink>
          </li>
          <li onClick={handleMenuClick}>
            <ScrollLink to="certificates" smooth={true} duration={500} offset={-70} className="mobile-nav-link">
              📜 Certificates
            </ScrollLink>
          </li>
          <li onClick={handleMenuClick}>
            <ScrollLink to="experience" smooth={true} duration={500} offset={-70} className="mobile-nav-link">
              💼 Experience
            </ScrollLink>
          </li>
          <li onClick={handleMenuClick}>
            <ScrollLink to="contact" smooth={true} duration={500} offset={-70} className="mobile-nav-link">
              📧 Contact
            </ScrollLink>
          </li>
          <li className="mobile-cv-divider"></li>
          <li>
            <MobileCvButton />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar