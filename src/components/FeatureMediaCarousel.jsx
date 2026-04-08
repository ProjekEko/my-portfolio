import { useState } from 'react'

function FeatureMediaCarousel({ feature, images, imagePositions = [], onOpenModal, isVideoFile }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  if (!images || images.length === 0) return null
  
  const currentMedia = images[currentIndex]
  const currentPosition = imagePositions[currentIndex] || 'center center'
  const isVideo = isVideoFile(currentMedia)
  
  const nextSlide = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }
  
  const prevSlide = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  
  const handleMediaClick = (e) => {
    e.stopPropagation()
    // Buka modal dengan semua gambar dari feature ini, mulai dari index yang dipilih
    onOpenModal(feature, currentIndex)
  }
  
  return (
    <div className="feature-media-carousel" style={{ direction: 'ltr' }}>
      <div className="carousel-media-container">
        {isVideo ? (
          <video
            src={currentMedia}
            className="carousel-media"
            style={{ objectPosition: currentPosition }}
            onClick={handleMediaClick}
            controls
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={currentMedia}
            alt={`Feature ${currentIndex + 1}`}
            className="carousel-media"
            style={{ objectPosition: currentPosition }}
            onClick={handleMediaClick}
          />
        )}
        
        {/* Tombol Navigasi */}
        {images.length > 1 && (
          <>
            <button className="carousel-nav prev" onClick={prevSlide}>
              ‹
            </button>
            <button className="carousel-nav next" onClick={nextSlide}>
              ›
            </button>
          </>
        )}
      </div>
      
      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="carousel-media-dots">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`media-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex(idx)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FeatureMediaCarousel