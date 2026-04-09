import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'  // ← TAMBAHKAN

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Preloader */}
      {isLoading && <Preloader onLoadingComplete={handleLoadingComplete} />}
      
      <div className="app" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <div className="noise"></div>
        <div className="gradient-bg"></div>
        
        <BrowserRouter>
          <Navbar isScrolled={isScrolled} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </BrowserRouter>
        
        <footer className="footer">
          <p>© 2026 Eko Haryadi | Portofolio</p>
        </footer>
      </div>
    </>
  )
}

export default App