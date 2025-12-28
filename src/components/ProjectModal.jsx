import { useState, useRef, forwardRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Maximize } from 'lucide-react'
import HTMLFlipBook from 'react-pageflip'

const Page = forwardRef((props, ref) => {
  return (
    <div className="page overflow-hidden bg-white" ref={ref} data-density={props.density || 'soft'}>
      <div className="w-full h-full relative">
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
    
    // Prevent scrolling on body when modal is open
    const scrollY = window.scrollY;
    const originalStyle = document.body.style.cssText;
    
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    document.documentElement.style.overscrollBehavior = 'none'
    
    const preventDefault = (e) => {
      if (e.touches.length > 1) return;
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.style.cssText = originalStyle;
      window.scrollTo(0, scrollY);
      document.documentElement.style.overscrollBehavior = ''
      document.removeEventListener('touchmove', preventDefault);
    }
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
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-0 touch-none overscroll-none"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[98vw] w-full h-[95vh] flex flex-col relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -left-4 z-50 bg-white hover:bg-warm-100 p-3 rounded-full transition-all shadow-2xl border border-warm-200"
        >
          <X className="w-6 h-6 text-warm-800" />
        </button>

        <div className="relative flex-grow bg-stone-900 overflow-hidden flex items-center justify-center p-0 shadow-2xl touch-none">
          <div className="w-full h-full flex items-center justify-center">
            <HTMLFlipBook
              width={900}
              height={636}
              size="stretch"
              minWidth={315}
              maxWidth={2000}
              minHeight={400}
              maxHeight={2000}
              maxShadowOpacity={0.4}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onPage}
              className="shadow-2xl"
              ref={bookRef}
              usePortrait={isPortrait}
              startZIndex={0}
              drawShadow={true}
              flippingTime={1000}
              useMouseEvents={true}
              clickEventForward={true}
              swipeDistance={30}
              showPageCorners={false}
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
                  <div className="w-full h-full bg-white">
                    <img
                      src={img}
                      alt={`Page ${index + 1}`}
                      className="w-full h-full object-fill pointer-events-none"
                    />
                    
                    {/* Subtle Gutter Shadow only */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-20" />
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
