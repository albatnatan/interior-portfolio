import { useState, useRef, forwardRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Maximize } from 'lucide-react'
import HTMLFlipBook from 'react-pageflip'

const Page = forwardRef((props, ref) => {
  return (
    <div className="page overflow-hidden bg-white shadow-2xl" ref={ref} data-density={props.density || 'soft'}>
      <div className="w-full h-full relative border border-stone-200/50">
        {props.children}
      </div>
    </div>
  )
})

const ProjectModal = ({ project, onClose }) => {
  const bookRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextImage = () => {
    bookRef.current.pageFlip().flipNext()
  }

  const prevImage = () => {
    bookRef.current.pageFlip().flipPrev()
  }

  const onPage = (e) => {
    setCurrentPage(e.data)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 md:p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-6xl w-full h-[90vh] flex flex-col relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -left-4 z-50 bg-white hover:bg-warm-100 p-3 rounded-full transition-all shadow-2xl border border-warm-200"
        >
          <X className="w-6 h-6 text-warm-800" />
        </button>

        {/* Book Area */}
        <div className="relative flex-grow bg-stone-200/50 backdrop-blur-sm rounded-3xl overflow-hidden flex items-center justify-center p-4 md:p-12 shadow-2xl border border-white/20">
          <div className="w-full h-full flex items-center justify-center">
            <HTMLFlipBook
              width={500}
              height={700}
              size="stretch"
              minWidth={315}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1400}
              maxShadowOpacity={0.6}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onPage}
              className="shadow-2xl"
              ref={bookRef}
              usePortrait={isPortrait}
              startZIndex={0}
              drawShadow={true}
              flippingTime={800}
              useMouseEvents={true}
              clickEventForward={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {/* Front Cover */}
              <Page density="hard">
                <div className="w-full h-full bg-warm-800 text-white flex flex-col items-center justify-center p-12 text-center border-r-4 border-warm-900 relative">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none" />
                  <h3 className="text-warm-300 text-sm tracking-[0.3em] uppercase mb-6 font-medium">Portfolio</h3>
                  <div className="w-24 h-px bg-warm-400 mb-8" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{project.title}</h2>
                  <p className="text-warm-200 text-lg italic">עיצוב פנים | עדן</p>
                  <div className="absolute bottom-12 text-warm-400 text-sm tracking-widest">{project.year}</div>
                </div>
              </Page>

              {project.images.map((img, index) => (
                <Page key={index}>
                  <div className="w-full h-full relative flex items-center justify-center bg-white overflow-hidden">
                    {/* Paper Texture Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 pointer-events-none z-10" />
                    
                    {/* The Image */}
                    <div className="w-full h-full p-2 md:p-4 flex items-center justify-center">
                      <img
                        src={img}
                        alt={`Page ${index + 1}`}
                        className="max-w-full max-h-full object-contain shadow-sm pointer-events-none"
                      />
                    </div>

                    {/* Depth Gradients */}
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-20" />
                    <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/5 to-transparent pointer-events-none z-20" />
                    
                    {/* Page Number */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-stone-400 text-[10px] font-mono tracking-widest uppercase opacity-60 z-20">
                      Page {index + 1}
                    </div>
                  </div>
                </Page>
              ))}

              {/* Back Cover */}
              <Page density="hard">
                <div className="w-full h-full bg-warm-800 flex items-center justify-center border-l-4 border-warm-900 relative">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none" />
                  <div className="text-center p-12">
                    <h2 className="text-2xl text-white font-bold mb-4">תודה שצפיתם</h2>
                    <p className="text-warm-300">עדן | עיצוב פנים</p>
                  </div>
                </div>
              </Page>
            </HTMLFlipBook>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between p-4 z-20 pointer-events-none">
            <button
              className="w-14 h-14 bg-white/40 hover:bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center transition-all pointer-events-auto shadow-2xl border border-white/50 group"
              onClick={nextImage}
            >
              <ChevronRight className="w-10 h-10 text-warm-900 group-hover:scale-110 transition-transform" />
            </button>
            <button
              className="w-14 h-14 bg-white/40 hover:bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center transition-all pointer-events-auto shadow-2xl border border-white/50 group"
              onClick={prevImage}
            >
              <ChevronLeft className="w-10 h-10 text-warm-900 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Counter */}
          <div className="absolute top-8 left-8 z-20 bg-warm-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-xl">
            <span className="text-white text-sm font-bold tracking-widest">
              דף {currentPage + 1} מתוך {project.images.length + 2}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectModal
