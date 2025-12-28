import { motion } from 'framer-motion'
import { Award, Users, Home, Heart } from 'lucide-react'

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-warm-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
                alt="Interior Designer at work"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-warm-800 mb-6">
              קצת עליי
            </h2>
            <p className="text-warm-600 text-lg leading-relaxed mb-6">
              שמי עדן, מעצבת פנים עם תשוקה ליצירת חללים המספרים סיפור. 
              אני מאמינה שכל בית צריך להיות השתקפות של האנשים החיים בו - 
              ייחודי, נעים ומלא באופי אישי.
            </p>
            <p className="text-warm-600 text-lg leading-relaxed mb-8">
              בכל פרויקט אני משלבת בין אסתטיקה לפונקציונליות, 
              תוך הקשבה לצרכים ולחלומות של הלקוחות שלי. 
              המטרה שלי היא להפוך כל בית למקום שנעים לחזור אליו.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
