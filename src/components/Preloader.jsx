import { useState, useEffect } from 'react'

function Preloader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulasi loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
            if (onLoadingComplete) onLoadingComplete()
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  if (!isLoading) return null

  return (
    <div className="preloader">
      <div className="preloader-container">
        {/* Logo Animation */}
        <div className="preloader-logo">
          <div className="preloader-logo-inner">
            <span className="preloader-logo-text">EH</span>
          </div>
          <div className="preloader-logo-glow"></div>
        </div>

        {/* Progress Bar */}
        <div className="preloader-progress-container">
          <div className="preloader-progress-bar" style={{ width: `${progress}%` }}>
            <div className="preloader-progress-glow"></div>
          </div>
        </div>

        {/* Progress Text */}
        <div className="preloader-text">
          <span className="preloader-percentage">{Math.floor(progress)}%</span>
          <span className="preloader-status">
            {progress < 30 && "Loading assets..."}
            {progress >= 30 && progress < 60 && "Preparing components..."}
            {progress >= 60 && progress < 90 && "Almost there..."}
            {progress >= 90 && "Ready to launch! 🚀"}
          </span>
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