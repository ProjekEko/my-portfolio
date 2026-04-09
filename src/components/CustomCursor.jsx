import { useState, useEffect, useRef } from 'react'

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    // Update posisi cursor
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    // Detect hover pada elemen interaktif
    const handleMouseOver = (e) => {
      const interactiveElements = [
        'button', 'a', '.project-card', '.btn-primary', '.btn-secondary', 
        '.view-btn', '.live-demo-btn', '.project-link', '.certificate-image-wrapper',
        '.feature-image', '.modal-close', '.back-to-top-btn', '.theme-toggle-btn',
        '.resume-btn', '.detail-link', '.social-icon', '.hamburger-btn',
        '.mobile-nav-link', '.logo', '.nav-link-btn', '.back-home-btn',
        '.cv-dropdown-item', '.mobile-resume-btn', '.mobile-theme-btn',
        '.profile-image-container', '.profile-image-wrapper', '.project-hero',
        '.hero-image', '[onclick]', '[onClick]'
      ]
      
      let isInteractive = false
      for (const selector of interactiveElements) {
        if (e.target.closest(selector)) {
          isInteractive = true
          break
        }
      }
      
      setIsHovering(isInteractive)
    }

    // Detect click
    const handleMouseDown = () => {
      setIsClicking(true)
      setTimeout(() => setIsClicking(false), 150)
    }

    // Mouse leave window
    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1'
      if (dotRef.current) dotRef.current.style.opacity = '1'
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <>
      <div 
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
      />
      <div 
        ref={dotRef}
        className={`custom-cursor-dot ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
      />
    </>
  )
}

export default CustomCursor