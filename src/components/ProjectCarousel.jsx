import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProjectCarousel({ projects, category, onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const navigate = useNavigate()

  // Deteksi screen size
  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth
      setIsMobile(width <= 768)
      setIsTablet(width > 768 && width <= 1024)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // Auto slide setiap 5 detik
  useEffect(() => {
    if (projects.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [projects.length])

  // Fungsi untuk handle dot click
  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Fungsi untuk handle Live Demo
  const handleLiveDemo = (e, project) => {
    e.stopPropagation()
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank')
    }
  }

  // Fungsi untuk handle Lihat Projek
  const handleViewProject = (e, project) => {
    e.stopPropagation()
    navigate(`/project/${project.id}`)
  }

  // Fungsi untuk handle klik gambar
  const handleImageClick = (e, project) => {
    e.stopPropagation()
    if (onImageClick) {
      onImageClick(project.image)
    }
  }

  // Tentukan teks tombol berdasarkan device (tetap ada teksnya)
  const getViewButtonText = (project) => {
    if (isMobile) {
      if (project.category === 'web') return '📂 Lihat Projek →'
      if (project.category === 'android') return '📂 Lihat Projek →'
      if (project.category === 'iot') return '📂 Lihat Projek →'
      return '👁️ Lihat'
    }
    if (isTablet) {
      if (project.category === 'web') return '📂 Lihat Web'
      if (project.category === 'android') return '📂 Lihat Mobile'
      if (project.category === 'iot') return '📂 Lihat IoT'
      return '👁️ Lihat Detail'
    }
    if (project.category === 'web') return '📂   →'
    if (project.category === 'android') return '📂 Lihat Projek →'
    if (project.category === 'iot') return '📂 Lihat Projek →'
    return '📂 Lihat Projek →'
  }

  const getLiveDemoText = () => {
    if (isMobile) return '🔗 Live Demo'
    if (isTablet) return '🔗 Live Demo'
    return '🔗 Live Demo →'
  }

  if (!projects || projects.length === 0) return null

  const currentProject = projects[currentIndex]
  const imagePosition = currentProject.imagePosition || 'center center'

  return (
    <div className="project-carousel">
      {/* Carousel Container */}
      <div className="carousel-container">
        <div className="carousel-card">
          {/* Gambar Project */}
          <div 
            className="carousel-image-wrapper" 
            onClick={(e) => handleImageClick(e, currentProject)}
          >
            <img 
              src={currentProject.image} 
              alt={currentProject.title} 
              className="carousel-image"
              style={{ objectPosition: imagePosition }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'
              }}
            />
            <div className="carousel-image-overlay">
              <span className="overlay-text">🔍 Klik untuk perbesar</span>
            </div>
          </div>
          
          {/* Konten */}
          <h3>{currentProject.title}</h3>
          <p>{currentProject.description}</p>
          
          <div className="carousel-tech">
            {currentProject.tech.slice(0, 4).map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
            {currentProject.tech.length > 4 && (
              <span className="tech-tag">+{currentProject.tech.length - 4}</span>
            )}
          </div>
          
          <div className="carousel-footer">
            <span className="project-year">{currentProject.year}</span>
            <div className="carousel-buttons">
              {currentProject.category === 'web' && currentProject.liveUrl && (
                <button 
                  onClick={(e) => handleLiveDemo(e, currentProject)} 
                  className="project-btn live-demo-btn"
                >
                  {getLiveDemoText()}
                </button>
              )}
              <button 
                onClick={(e) => handleViewProject(e, currentProject)} 
                className="project-btn view-btn"
              >
                {getViewButtonText(currentProject)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      {projects.length > 1 && (
        <div className="carousel-dots">
          {projects.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectCarousel