import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-warm-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#home" className="text-2xl font-bold text-white">
            עדן | עיצוב פנים
          </a>
          
          <div className="flex items-center gap-6">
            <a href="#projects" className="text-warm-400 hover:text-white transition-colors text-sm">
              פרויקטים
            </a>
            <a href="#about" className="text-warm-400 hover:text-white transition-colors text-sm">
              אודות
            </a>
            <a href="#services" className="text-warm-400 hover:text-white transition-colors text-sm">
              שירותים
            </a>
            <a href="#contact" className="text-warm-400 hover:text-white transition-colors text-sm">
              צור קשר
            </a>
          </div>
          
          <p className="text-warm-500 text-sm flex items-center gap-1">
            נבנה עם <Heart className="w-4 h-4 text-red-400 fill-current" /> כל הזכויות שמורות © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
