import { useState, useEffect } from 'react'

function Preloader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing')

  useEffect(() => {
    const texts = ['Loading assets', 'Configuring magic', 'Almost ready', 'Welcome!']
    let textIndex = 0
    let progressValue = 0
    
    const interval = setInterval(() => {
      progressValue += Math.floor(Math.random() * 10) + 5
      
      if (progressValue >= 100) {
        progressValue = 100
        clearInterval(interval)
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete()
        }, 500)
      }
      
      setProgress(progressValue)
      
      // Ganti teks loading setiap 30% progress
      if (progressValue > (textIndex + 1) * 25 && textIndex < texts.length - 1) {
        textIndex++
        setLoadingText(texts[textIndex])
      }
    }, 150)
    
    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <div className="preloader">
      <div className="preloader-container">
        {/* Logo Animasi */}
        <div className="preloader-logo">
          <div className="preloader-logo-glow"></div>
          <div className="preloader-logo-inner">
            <span className="preloader-logo-text">EH</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="preloader-progress-container">
          <div className="preloader-progress-bar" style={{ width: `${progress}%` }}>
            <div className="preloader-progress-glow"></div>
          </div>
        </div>
        
        {/* Persentase & Status */}
        <div className="preloader-text">
          <span className="preloader-percentage">{progress}%</span>
          <span className="preloader-status">{loadingText}...</span>
        </div>
        
        {/* Loading Dots */}
        <div className="preloader-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  )
}

export default Preloader