import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/data'

function Projects() {
  return (
    <section className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Featured Work</span>
          <h2>Latest Projects</h2>
        </div>
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects