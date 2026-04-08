import { useParams, useNavigate } from 'react-router-dom'
import { projects } from '../data/data'
import { useState, useEffect } from 'react'
import ScrollReveal from 'scrollreveal'
import FeatureMediaCarousel from '../components/FeatureMediaCarousel'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImages, setModalImages] = useState([])
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0)
  const [modalIsVideo, setModalIsVideo] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  useEffect(() => {
    ScrollReveal({ reset: true, distance: '50px', duration: 800, delay: 200 })
    ScrollReveal().reveal('.project-hero', { origin: 'bottom', distance: '30px', duration: 900, delay: 200 })
    ScrollReveal().reveal('.project-detail-tech', { origin: 'left', distance: '40px', duration: 700, delay: 300 })
    ScrollReveal().reveal('.feature-row', { origin: 'bottom', distance: '40px', duration: 700, delay: 150, interval: 200 })
    ScrollReveal().reveal('.project-detail-links', { origin: 'bottom', distance: '30px', duration: 700, delay: 400 })
    ScrollReveal().reveal('.tech-tag-large', { origin: 'bottom', distance: '20px', duration: 700, delay: 50, interval: 80 })
    ScrollReveal().reveal('.feature-image', { origin: 'left', distance: '30px', duration: 600, delay: 100, interval: 200 })
    ScrollReveal().reveal('.feature-content', { origin: 'right', distance: '30px', duration: 600, delay: 100, interval: 200 })
    ScrollReveal().reveal('.detail-link', { origin: 'bottom', distance: '20px', duration: 500, delay: 80, interval: 100 })
  }, [id])

  const project = projects.find(p => p.id === parseInt(id))

  if (!project) {
    return (
      <section className="hero">
        <div className="hero-content">
          <h1>Project Tidak Ditemukan</h1>
          <button onClick={() => navigate('/')} className="btn-primary">Kembali ke Home</button>
        </div>
      </section>
    )
  }

  const isVideoFile = (src) => {
    if (!src) return false
    const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv']
    return videoExtensions.some(ext => src.toLowerCase().endsWith(ext))
  }

  // Fungsi untuk membuka modal dengan semua gambar dari feature
  const openModalFromFeature = (feature, clickedIndex = 0) => {
    if (feature.images && feature.images.length > 0) {
      // Jika feature punya multiple images
      setModalImages(feature.images)
      setModalCurrentIndex(clickedIndex)
      setModalIsVideo(isVideoFile(feature.images[clickedIndex]))
    } else if (feature.image) {
      // Jika feature cuma 1 gambar
      setModalImages([feature.image])
      setModalCurrentIndex(0)
      setModalIsVideo(isVideoFile(feature.image))
    }
    setIsModalOpen(true)
  }

  // Fungsi untuk membuka modal dari hero image
  const openModalFromHero = () => {
    setModalImages([project.image])
    setModalCurrentIndex(0)
    setModalIsVideo(isVideoFile(project.image))
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalImages([])
    setModalCurrentIndex(0)
    setModalIsVideo(false)
  }

  const nextModalSlide = () => {
    setModalCurrentIndex((prev) => (prev + 1) % modalImages.length)
    setModalIsVideo(isVideoFile(modalImages[(modalCurrentIndex + 1) % modalImages.length]))
  }

  const prevModalSlide = () => {
    setModalCurrentIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length)
    setModalIsVideo(isVideoFile(modalImages[(modalCurrentIndex - 1 + modalImages.length) % modalImages.length]))
  }

  const projectFeatures = project.features || [
    {
      id: 1,
      title: "Fitur Utama",
      description: project.description,
      image: project.image,
      imagePosition: "center center",
      side: "left",
      tags: ["✨ Fitur 1", "⚡ Fitur 2", "🔒 Fitur 3"]
    }
  ]

  const heroImagePosition = project.imagePosition || 'center center'

  return (
    <>
      <section className="project-detail-section">
        <div className="container">
          {/* HERO IMAGE */}
          <div className="project-hero" onClick={openModalFromHero}>
            {isVideoFile(project.image) ? (
              <video 
                src={project.image} 
                className="hero-image"
                style={{ objectPosition: heroImagePosition }}
                controls
                muted
                loop
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img 
                src={project.image} 
                alt={project.title} 
                className="hero-image"
                style={{ objectPosition: heroImagePosition }}
              />
            )}
            <div className="project-hero-overlay">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>

          {/* Teknologi yang Digunakan */}
          <div className="project-detail-tech">
            <h2>⚡ Teknologi yang Digunakan</h2>
            <div className="tech-list">
              {project.tech.map((tech, i) => (
                <span key={i} className="tech-tag-large">{tech}</span>
              ))}
            </div>
          </div>

          {/* Fitur & Penjelasan */}
          <div className="project-features">
            <h2>📱 Fitur & Penjelasan</h2>
            <div className="features-container">
              {projectFeatures.map((feature, idx) => {
                const side = feature.side || (feature.id % 2 === 1 ? 'left' : 'right')
                const hasMultipleImages = feature.images && feature.images.length > 0
                
                return (
                  <div 
                    key={feature.id} 
                    className={`feature-row ${side === 'right' ? 'feature-row-reverse' : ''}`}
                  >
                    <div className="feature-image">
                      {hasMultipleImages ? (
                        <FeatureMediaCarousel
                          feature={feature}
                          images={feature.images}
                          imagePositions={feature.imagePositions || []}
                          onOpenModal={openModalFromFeature}
                          isVideoFile={isVideoFile}
                        />
                      ) : (
                        <>
                          {isVideoFile(feature.image) ? (
                            <video 
                              src={feature.image} 
                              style={{ objectPosition: feature.imagePosition || 'center center' }}
                              onClick={() => openModalFromFeature(feature, 0)}
                              controls
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <img 
                              src={feature.image} 
                              alt={feature.title} 
                              style={{ objectPosition: feature.imagePosition || 'center center' }}
                              onClick={() => openModalFromFeature(feature, 0)}
                            />
                          )}
                        </>
                      )}
                      <div className="feature-image-badge">
                        <span>Fitur {idx + 1}</span>
                      </div>
                    </div>
                    <div className="feature-content">
                      <div className="feature-number">{feature.id}</div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                      <div className="feature-tags">
                        {feature.tags && feature.tags.map((tag, i) => (
                          <span key={i} className="feature-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Link Project */}
          <div className="project-detail-links">
            <h2>🔗 Link Project</h2>
            <div className="links-container">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="detail-link live">
                  🔗 Live Demo
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="detail-link github">
                  📂 GitHub Repository
                </a>
              )}
              {project.documentation && (
                <a href={project.documentation} target="_blank" rel="noopener noreferrer" className="detail-link docs">
                  📄 Dokumentasi
                </a>
              )}
              {project.videoUrl && (
                <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="detail-link video">
                  🎥 Video Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL CAROUSEL - untuk melihat semua gambar dari feature */}
      {isModalOpen && modalImages.length > 0 && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            
            {/* Modal Carousel Container */}
            <div className="modal-carousel-container">
              {modalImages.length > 1 && (
                <button className="modal-nav prev" onClick={prevModalSlide}>
                  ‹
                </button>
              )}
              
              <div className="modal-media-wrapper">
                {modalIsVideo ? (
                  <video 
                    src={modalImages[modalCurrentIndex]} 
                    className="modal-image"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img 
                    src={modalImages[modalCurrentIndex]} 
                    alt={`Slide ${modalCurrentIndex + 1}`} 
                    className="modal-image" 
                  />
                )}
              </div>
              
              {modalImages.length > 1 && (
                <button className="modal-nav next" onClick={nextModalSlide}>
                  ›
                </button>
              )}
            </div>
            
            {/* Modal Dot Indicators */}
            {modalImages.length > 1 && (
              <div className="modal-dots">
                {modalImages.map((_, idx) => (
                  <button
                    key={idx}
                    className={`modal-dot ${idx === modalCurrentIndex ? 'active' : ''}`}
                    onClick={() => {
                      setModalCurrentIndex(idx)
                      setModalIsVideo(isVideoFile(modalImages[idx]))
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Counter */}
            {modalImages.length > 1 && (
              <div className="modal-counter">
                {modalCurrentIndex + 1} / {modalImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectDetail