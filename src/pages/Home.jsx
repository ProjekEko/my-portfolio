import { useState, useEffect, useRef } from 'react'
import { skills, projects, certificates, experiences } from '../data/data'
import ProjectCard from '../components/ProjectCard'
import ScrollReveal from 'scrollreveal'  // ← TAMBAHKAN
import ProjectCarousel from '../components/ProjectCarousel'

function Home() {
  // Tambahkan state untuk modal gambar
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Fungsi untuk membuka modal
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl)
    setIsModalOpen(true)
  }
  
  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  // REF untuk efek foto magnetic
  const imageRef = useRef(null)
  const [imageStyle, setImageStyle] = useState({})

  // Efek typing animation untuk nama
  const [text, setText] = useState('')
  const fullText = 'Eko Haryadi'
  
  // Efek re-typing untuk role
  const [roleText, setRoleText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const roles = [
    "Software Developer | Web, Mobile & IoT",
    "Fullstack Developer",
    "React & Flutter Expert",
    "AI & IoT Enthusiast",
    "Tech Content Creator"
  ]
  const typingSpeed = 100
  const deletingSpeed = 50
  const pauseTime = 15000

  // Typing nama
  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typing)
      }
    }, 100)
    return () => clearInterval(typing)
  }, [])

  // Re-typing role
  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[loopNum % roles.length]
      
      if (isDeleting) {
        setRoleText(currentRole.substring(0, roleText.length - 1))
        if (roleText.length === 0) {
          setIsDeleting(false)
          setLoopNum(loopNum + 1)
        }
      } else {
        setRoleText(currentRole.substring(0, roleText.length + 1))
        if (roleText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      }
    }
    
    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timer)
  }, [roleText, isDeleting, loopNum, pauseTime])

  // Efek magnetic foto
  const handleMouseMove = (e) => {
    if (!imageRef.current) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -15
    const rotateY = ((x - centerX) / centerX) * 15
    
    const shineX = (x / rect.width) * 100
    const shineY = (y / rect.height) * 100
    
    setImageStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      transition: 'transform 0.05s ease-out',
      boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(102,126,234,0.5)`,
      '--shine-x': `${shineX}%`,
      '--shine-y': `${shineY}%`
    })
  }
  
  const handleMouseLeave = () => {
    setImageStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.3s ease-out',
      boxShadow: '0 0 30px rgba(102, 126, 234, 0.3)'
    })
  }

  // ========== SCROLL REVEAL ==========
  useEffect(() => {
    ScrollReveal().reveal('.hero', {
      origin: 'top',
      distance: '50px',
      duration: 1000,
      delay: 200,
      reset: true,
      easing: 'ease-in-out'
    })
    
    ScrollReveal().reveal('.skills-section', {
      origin: 'left',
      distance: '50px',
      duration: 800,
      delay: 300,
      reset: false,
      interval: 200
    })
    
    ScrollReveal().reveal('.projects-section', {
      origin: 'right',
      distance: '50px',
      duration: 800,
      delay: 300,
      reset: true
    })
    
    ScrollReveal().reveal('.certificates-section', {
      origin: 'left',
      distance: '50px',
      duration: 800,
      delay: 300,
      reset: true
    })
    
    ScrollReveal().reveal('.experience-section', {
      origin: 'right',
      distance: '50px',
      duration: 800,
      delay: 300,
      reset: true
    })
    
    ScrollReveal().reveal('.contact-section', {
      origin: 'bottom',
      distance: '50px',
      duration: 800,
      delay: 300,
      reset: true
    })
    
    // Animasi untuk setiap project card
    ScrollReveal().reveal('.project-card', {
      origin: 'bottom',
      distance: '30px',
      duration: 600,
      delay: 100,
      interval: 100,
      reset: true
    })
    
    // Animasi untuk setiap certificate card
    ScrollReveal().reveal('.certificate-card', {
      origin: 'bottom',
      distance: '30px',
      duration: 600,
      delay: 100,
      interval: 100,
      reset: true
    })
    
    // Animasi untuk setiap timeline item
    ScrollReveal().reveal('.timeline-item', {
      origin: 'left',
      distance: '30px',
      duration: 600,
      delay: 100,
      interval: 150,
      reset: true
    })
    
    // Animasi untuk skill pills
    ScrollReveal().reveal('.skill-pill', {
      origin: 'right',
      distance: '20px',
      duration: 500,
      delay: 50,
      interval: 80,
      reset: true
    })
    
    // Animasi untuk category headers
    ScrollReveal().reveal('.project-category-header', {
      origin: 'top',
      distance: '20px',
      duration: 500,
      delay: 200,
      reset: true
    })
    
    ScrollReveal().reveal('.pill-category', {
      origin: 'bottom',
      distance: '30px',
      duration: 600,
      delay: 150,
      interval: 150,
      reset: true
    })
    
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="badge">✨ Available for work</div>

          <div className="profile-image-container">
            <div 
              className="profile-image-wrapper"
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={imageStyle}
            >
              <img 
                src="/foto-eko.jpg" 
                alt="Eko Haryadi" 
                className="profile-image"
              />
              <div className="profile-glow"></div>
            </div>
          </div>
  
          <h1 className="glitch-text laser-text" data-text={text}>
            {text}
          </h1>
          
          <div className="typed-container">
            <span className="typed-text">{roleText}</span>
            <span className="cursor">|</span>
          </div>
          
          <p className="hero-desc">
            Membangun aplikasi modern dengan teknologi terbaru. 
            Fokus pada UI/UX yang menarik dan performa optimal.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">View Projects →</button>
            <button className="btn-secondary">Contact Me</button>
          </div>
          <div className="stats">
            <div className="stat"><h3>4+</h3><p>Years Exp</p></div>
            <div className="stat"><h3>20+</h3><p>Projects</p></div>
            <div className="stat"><h3>15+</h3><p>Clients</p></div>
          </div>
        </div>
      </section>

      {/* Skills Section - Modern Pill Design */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">My Skills</span>
            <h2>Tech Stack & Expertise</h2>
          </div>
          
          <div className="skills-pill-container">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="pill-category">
                <div className="pill-category-title">
                  <span className="pill-category-icon">
                    {category === 'web' && '🌐'}
                    {category === 'mobile' && '📱'}
                    {category === 'iot' && '🔌'}
                  </span>
                  <span>
                    {category === 'web' && 'Web Development'}
                    {category === 'mobile' && 'Mobile Development'}
                    {category === 'iot' && 'IoT & Embedded'}
                  </span>
                </div>
                <div className="skills-pill-grid">
                  {skillList.map((skill, idx) => (
                    <div key={idx} className="skill-pill">
                      <div className="pill-icon">{skill.icon}</div>
                      <div className="pill-info">
                        <div className="pill-name">{skill.name}</div>
                        <div className="pill-bar-container">
                          <div className="pill-bar-fill" style={{width: `${skill.level}%`}}></div>
                        </div>
                      </div>
                      <div className="pill-percentage">{skill.level}%</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Dengan Kategori */}
<section id="projects" className="projects-section">
  <div className="container">
    <div className="section-header">
      <span className="section-tag">Featured Work</span>
      <h2>Latest Projects</h2>
    </div>
    
    {/* Web Projects */}
    <div className="project-category">
      <div className="project-category-header">
        <span className="project-category-icon">🌐</span>
        <h3 className="project-category-title">Web Development</h3>
        <span className="project-count">{projects.filter(p => p.category === 'web').length} Projects</span>
      </div>
      
      {/* Desktop: Grid View */}
      <div className="projects-grid desktop-grid">
        {projects.filter(p => p.category === 'web').slice(0, 3).map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={idx} 
            onImageClick={openModal}
          />
        ))}
      </div>
      
      {/* Mobile/Tablet: Carousel View */}
      <div className="mobile-carousel">
        <ProjectCarousel 
          projects={projects.filter(p => p.category === 'web')}
          category="web"
          onImageClick={openModal}
        />
      </div>
    </div>

    {/* Android Projects */}
    <div className="project-category">
      <div className="project-category-header">
        <span className="project-category-icon">📱</span>
        <h3 className="project-category-title">Android / Mobile Development</h3>
        <span className="project-count">{projects.filter(p => p.category === 'android').length} Projects</span>
      </div>
      
      <div className="projects-grid desktop-grid">
        {projects.filter(p => p.category === 'android').slice(0, 3).map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={idx} 
            onImageClick={openModal}
          />
        ))}
      </div>
      
      <div className="mobile-carousel">
        <ProjectCarousel 
          projects={projects.filter(p => p.category === 'android')}
          category="android"
          onImageClick={openModal}
        />
      </div>
    </div>

    {/* IoT Projects */}
    <div className="project-category">
      <div className="project-category-header">
        <span className="project-category-icon">🔌</span>
        <h3 className="project-category-title">IoT & Embedded Systems</h3>
        <span className="project-count">{projects.filter(p => p.category === 'iot').length} Projects</span>
      </div>
      
      <div className="projects-grid desktop-grid">
        {projects.filter(p => p.category === 'iot').slice(0, 3).map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={idx} 
            onImageClick={openModal}
          />
        ))}
      </div>
      
      <div className="mobile-carousel">
        <ProjectCarousel 
          projects={projects.filter(p => p.category === 'iot')}
          category="iot"
          onImageClick={openModal}
        />
      </div>
    </div>
  </div>
</section>
      {/* Certificates Section */}
      <section id="certificates" className="certificates-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">My Certificates</span>
            <h2>Professional Certification</h2>
          </div>
          <div className="certificates-grid">
            {certificates.map((cert) => {
              const certImagePosition = cert.imagePosition || 'center center'
              
              return (
                <div key={cert.id} className="certificate-card">
                  <div 
                    className="certificate-image-wrapper"
                    onClick={() => openModal(cert.image)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="certificate-image"
                      style={{ objectPosition: certImagePosition }}
                    />
                    <div className="image-overlay">
                      <span>🔍 Klik untuk perbesar</span>
                    </div>
                  </div>
                  <h3>{cert.title}</h3>
                  <p className="certificate-issuer">{cert.issuer}</p>
                  <span className="certificate-date">{cert.date}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal untuk lihat gambar full screen */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <img src={selectedImage} alt="Full Certificate" className="modal-image" />
          </div>
        </div>
      )}

      {/* Experience Section */}
      <section id="experience" className="experience-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Work Experience</span>
            <h2>Professional Journey</h2>
          </div>
          <div className="timeline">
            {experiences.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-icon">{exp.icon}</div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{exp.position}</h3>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <h4 className="timeline-company">{exp.company} • {exp.location}</h4>
                  <p className="timeline-description">{exp.description}</p>
                  <ul className="timeline-achievements">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li> 
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <span className="section-tag">Get in Touch</span>
              <h2>Let's Work Together</h2>
              <p>Saya selalu terbuka untuk kolaborasi dan project baru</p>
              <div className="contact-details">
                <div className="contact-item"><span>📧</span><p>eko.haryadi321@gmail.com</p></div>
                <div className="contact-item"><span>📱</span><p>+62 851 5724 4997</p></div>
                <div className="contact-item"><span>📍</span><p>Tangerang, Indonesia</p></div>
              </div>
              <div className="social-links">
                <a href="#" className="social-icon">GitHub</a>
                <a href="#" className="social-icon">LinkedIn</a>
                <a href="#" className="social-icon">Twitter</a>
                <a href="#" className="social-icon">Instagram</a>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea rows="5" placeholder="Your Message"></textarea>
              <button type="submit" className="btn-primary">Send Message →</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home