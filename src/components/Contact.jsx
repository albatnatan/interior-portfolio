import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Instagram, Facebook } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-20 px-4 bg-warm-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            בואו נדבר
          </h2>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            מוזמנים ליצור קשר לייעוץ ראשוני ללא התחייבות. אשמח לשמוע על הפרויקט שלכם.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-warm-700 rounded-xl">
                  <Phone className="w-6 h-6 text-warm-300" />
                </div>
                <div>
                  <p className="text-warm-400 text-sm">טלפון</p>
                  <p className="text-white text-lg font-medium">052-5298956</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-4 bg-warm-700 rounded-xl">
                  <Mail className="w-6 h-6 text-warm-300" />
                </div>
                <div>
                  <p className="text-warm-400 text-sm">אימייל</p>
                  <p className="text-white text-lg font-medium">design@studio.co.il</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <p className="text-warm-400 mb-4">עקבו אחריי ברשתות</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 bg-warm-700 rounded-full hover:bg-warm-600 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-warm-700 rounded-full hover:bg-warm-600 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="שם מלא"
                  required
                  className="w-full px-6 py-4 bg-warm-700 text-white placeholder-warm-400 rounded-xl border border-warm-600 focus:border-warm-400 focus:outline-none transition-colors"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="אימייל"
                  required
                  className="w-full px-6 py-4 bg-warm-700 text-white placeholder-warm-400 rounded-xl border border-warm-600 focus:border-warm-400 focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="טלפון"
                  className="w-full px-6 py-4 bg-warm-700 text-white placeholder-warm-400 rounded-xl border border-warm-600 focus:border-warm-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="ספרו לי על הפרויקט שלכם..."
                  rows={5}
                  required
                  className="w-full px-6 py-4 bg-warm-700 text-white placeholder-warm-400 rounded-xl border border-warm-600 focus:border-warm-400 focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-white text-warm-800 font-bold rounded-xl hover:bg-warm-100 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                שלחו הודעה
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
