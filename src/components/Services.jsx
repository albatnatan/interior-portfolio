import { motion } from 'framer-motion'
import { Palette, Ruler, Lightbulb, Sofa, PenTool, Eye } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Lightbulb,
      title: 'ייעוץ ראשוני',
      description: 'פגישת היכרות להבנת הצרכים, הסגנון האישי והתקציב שלכם.',
    },
    {
      icon: PenTool,
      title: 'תכנון ועיצוב',
      description: 'יצירת תוכניות מפורטות, בחירת חומרים וצבעים לחלל המושלם.',
    },
    {
      icon: Ruler,
      title: 'תכנון אדריכלי',
      description: 'שינויים מבניים, תכנון חללים ופתרונות אחסון חכמים.',
    },
    {
      icon: Palette,
      title: 'בחירת צבעים',
      description: 'יצירת פלטת צבעים מושלמת המשקפת את האישיות שלכם.',
    },
    {
      icon: Sofa,
      title: 'בחירת ריהוט',
      description: 'ליווי בבחירת ריהוט ואביזרים המשתלבים בעיצוב הכללי.',
    },
    {
      icon: Eye,
      title: 'פיקוח ביצוע',
      description: 'ליווי מלא בתהליך הביצוע עד לתוצאה הסופית המושלמת.',
    },
  ]

  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-warm-800 mb-4">
            השירותים שלי
          </h2>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            מגוון שירותי עיצוב פנים מקיפים להפיכת הבית שלכם למקום מושלם.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-warm-50 rounded-2xl hover:bg-warm-700 transition-all duration-500 cursor-pointer"
            >
              <div className="p-4 bg-white rounded-xl w-fit mb-6 group-hover:bg-warm-600 transition-colors">
                <service.icon className="w-8 h-8 text-warm-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-warm-800 mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-warm-600 group-hover:text-warm-200 transition-colors leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
