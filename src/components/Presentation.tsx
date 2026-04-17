import { ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PresentationProps {
  slides: ReactNode[];
}

export function Presentation({ slides }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const isFirst = useRef(true);
  useEffect(() => { isFirst.current = false; }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden text-gray-100 p-2 md:p-6">
      {/* Aspect Ratio Container 16:9 maxed to screen bounds */}
      <div
        className="w-full h-full bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] rounded-xl relative overflow-hidden border border-gray-700"
        style={{
          maxWidth: 'calc((100vh - 3rem) * (16/9))',
          maxHeight: 'calc((100vw - 3rem) * (9/16))',
          aspectRatio: '16 / 9'
        }}
      >
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial={isFirst.current ? { x: 0, opacity: 0 } : 'enter'}
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full p-8 md:p-12 flex flex-col"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>

        {/* Controls — embedded bottom-right inside the slide */}
        <div className="absolute bottom-3 right-3 z-50 flex items-center gap-2 bg-white/80 backdrop-blur border border-gray-200 px-3 py-1.5 rounded-full shadow-md">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-0.5 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent text-gray-500 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="text-xs font-semibold text-gray-500 min-w-[2.5rem] text-center">
            {currentSlide + 1} / {slides.length}
          </div>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-0.5 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent text-gray-500 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SlideLayout({ title, subtitle, children }: { title?: ReactNode, subtitle?: ReactNode, children: ReactNode }) {
  return (
    <div className="flex flex-col h-full w-full">
      {(title || subtitle) && (
        <div className="mb-6 shrink-0">
          {title && <h1 className="text-[32px] md:text-[40px] font-semibold text-gray-200 tracking-tight leading-tight mb-2">{title}</h1>}
          {subtitle && <p className="text-lg md:text-xl text-gray-400 font-normal">{subtitle}</p>}
        </div>
      )}
      <div className="flex-1 min-h-0 relative">
        {children}
      </div>
    </div>
  );
}
