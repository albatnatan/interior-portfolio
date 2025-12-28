import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Projects = ({ onProjectClick }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // טעינת הקונפיגורציה שנוצרת אוטומטית בזמן ה-Build
        const baseUrl = import.meta.env.BASE_URL
        const response = await fetch(`${baseUrl}projects/projects-config.json`)
        
        if (!response.ok) {
          throw new Error('Project config not found')
        }

        const data = await response.json()
        setProjects(data.projects || [])
        setLoading(false)
      } catch (err) {
        console.error('Error loading projects:', err)
        setProjects([])
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-warm-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-warm-600">מגלה פרויקטים חדשים...</p>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="py-20 text-center text-warm-500">
        <p className="mb-4 text-xl">עדיין לא הועלו פרויקטים.</p>
        <p className="text-sm">העלו תיקיית פרויקט עם תמונות ל-public/projects ב-GitHub כדי שהם יופיעו כאן.</p>
      </div>
    )
  }

  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-warm-800 mb-4">
            הפרויקטים שלי
          </h2>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            מבחר עבודות עיצוב פנים. כל פרויקט מוצג כספר דפדוף אינטראקטיבי.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onProjectClick(project)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={project.image.startsWith('http') ? project.image : `${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
                  alt={project.title}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-900/80 via-warm-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-xl font-bold mb-2 capitalize">
                    {project.title}
                  </h3>
                </div>
              </div>
              <div className="mt-4 px-2">
                <h3 className="text-warm-800 text-lg font-semibold mt-1 group-hover:text-warm-600 transition-colors capitalize">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
