import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
          alt="Interior Design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-900/40 via-warm-900/30 to-warm-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-warm-200 text-lg md:text-xl mb-4 tracking-widest"
        >
          ברוכים הבאים לסטודיו של עדן
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          עיצוב פנים
          <br />
          <span className="text-warm-300">שמספר סיפור</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-warm-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          יוצרת חללים ייחודיים המשלבים אסתטיקה, פונקציונליות ואופי אישי.
          כל פרויקט הוא מסע יצירתי לעיצוב הבית המושלם עבורכם.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-white text-warm-800 font-semibold rounded-full hover:bg-warm-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            צפו בפרויקטים
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-warm-800 transition-all duration-300"
          >
            יצירת קשר
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="text-white w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
