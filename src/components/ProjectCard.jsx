import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProjectCard({ project, index, onImageClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const navigate = useNavigate()

  // Fungsi untuk handle Live Demo (khusus web)
  const handleLiveDemo = (e) => {
    e.stopPropagation()
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank')
    }
  }

  // Fungsi untuk handle Lihat Projek - navigasi ke halaman detail
  const handleViewProject = (e) => {
    e.stopPropagation()
    navigate(`/project/${project.id}`)
  }

  // Fungsi untuk handle klik gambar - buka modal perbesar
  const handleImageClick = (e) => {
    e.stopPropagation()
    if (onImageClick) {
      onImageClick(project.image)
    }
  }

  // Tentukan teks tombol Lihat Projek berdasarkan kategori
  const getViewButtonText = () => {
    if (project.category === 'web') return '📂 Lihat Projek'
    if (project.category === 'android') return '📂 Lihat Projek'
    if (project.category === 'iot') return '📂 Lihat Projek'
    return '📂 Lihat Projek'
  }

  // Atur posisi gambar (default: center center jika tidak diatur)
  const imagePosition = project.imagePosition || 'center center'

  return (
    <div 
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)'
      }}
    >
      {/* Gambar Project - Klik untuk perbesar (modal) */}
      <div className="project-image-wrapper" onClick={handleImageClick}>
        {!imageError ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="project-image"
            style={{
              objectPosition: imagePosition  // ← atur posisi gambar
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="project-image-placeholder">
            <span className="placeholder-icon">🖼️</span>
          </div>
        )}
        <div className="project-image-overlay">
          <span className="overlay-text">🔍 Klik untuk perbesar</span>
        </div>
      </div>
      
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tech">
        {project.tech.map((tech, i) => (
          <span key={i} className="tech-tag">{tech}</span>
        ))}
      </div>
      <div className="project-footer">
        <span className="project-year">{project.year}</span>
        <div className="project-buttons">
          {/* Web: Live Demo + Lihat Projek */}
          {project.category === 'web' && project.liveUrl && (
            <button 
              onClick={handleLiveDemo} 
              className="project-btn live-demo-btn"
            >
              🔗 Live Demo →
            </button>
          )}
          {/* Tombol Lihat Projek untuk semua kategori */}
          <button 
            onClick={handleViewProject} 
            className="project-btn view-btn"
          >
            {getViewButtonText()} →
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard