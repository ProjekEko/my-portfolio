function Contact() {
    return (
      <section className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <span className="section-tag">Get in Touch</span>
              <h2>Let's Work Together</h2>
              <p>Saya selalu terbuka untuk kolaborasi dan project baru</p>
              <div className="contact-details">
                <div className="contact-item"><span>📧</span><p>eko.haryadi@dev.com</p></div>
                <div className="contact-item"><span>📱</span><p>+62 812 3456 7890</p></div>
                <div className="contact-item"><span>📍</span><p>Jakarta, Indonesia</p></div>
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
    )
  }
  
  export default Contact