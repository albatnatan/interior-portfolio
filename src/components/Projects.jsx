import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Projects = ({ onProjectClick }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // הגדרות - המתכנת צריך לעדכן את אלה פעם אחת
  const GITHUB_USERNAME = 'albatnatan' // <-- כאן שמים את שם המשתמש בגיטהאב
  const REPO_NAME = 'interior-portfolio'
  const PROJECTS_PATH = 'public/projects'

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${PROJECTS_PATH}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects from GitHub')
        }

        const items = await response.json()
        
        if (!Array.isArray(items)) {
          setProjects([])
          setLoading(false)
          return
        }

        const folders = items.filter(item => item.type === 'dir')
        
        if (folders.length === 0) {
          setProjects([])
          setLoading(false)
          return
        }
        
        const projectData = await Promise.all(folders.map(async (folder) => {
          const folderRes = await fetch(folder.url)
          const files = await folderRes.json()
          
          // קבלת נתיב בסיס יחסי שעובד גם ב-Vite וגם ב-GitHub Pages
          const baseUrl = import.meta.env.BASE_URL
          
          const images = files
            .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f.name))
            .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
            .map(f => `${baseUrl}projects/${folder.name}/${f.name}`)

          if (images.length === 0) return null

          const coverImage = images.find(img => img.toLowerCase().includes('cover')) || images[0]

          return {
            id: folder.sha,
            title: folder.name.replace(/-/g, ' '),
            image: coverImage,
            images: images,
            year: '2024'
          }
        }))

        setProjects(projectData.filter(p => p !== null))
        setLoading(false)
      } catch (err) {
        console.error('Error fetching from GitHub API:', err)
        setLoading(false)
      }
    }

    if (GITHUB_USERNAME !== 'YOUR_USERNAME') {
      fetchProjects()
    }
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
        לא נמצאו פרויקטים בתיקיית public/projects
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
            כאן מופיעים הפרויקטים שהועלו לתיקיית public/projects ב-GitHub.
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
                  src={project.image}
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
