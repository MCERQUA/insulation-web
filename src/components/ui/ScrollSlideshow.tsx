import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SlideData {
  id: string;
  backgroundImage: string;
  title: string;
  subtitle: string;
  description: string;
}

interface ScrollSlideshowProps {
  slides: SlideData[];
}

export function ScrollSlideshow({ slides }: ScrollSlideshowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate which slide should be active based on scroll progress
  const slideProgress = useTransform(scrollYProgress, [0, 1], [0, slides.length - 1]);

  useEffect(() => {
    const unsubscribe = slideProgress.onChange((latest) => {
      const newSlide = Math.floor(latest);
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < slides.length) {
        setCurrentSlide(newSlide);
      }
    });

    return unsubscribe;
  }, [slideProgress, currentSlide, slides.length]);

  // Create scroll-based animations for text
  const titleY = useTransform(scrollYProgress, 
    [currentSlide / slides.length, (currentSlide + 0.5) / slides.length, (currentSlide + 1) / slides.length],
    [100, 0, -100]
  );

  const titleOpacity = useTransform(scrollYProgress,
    [currentSlide / slides.length, (currentSlide + 0.2) / slides.length, (currentSlide + 0.8) / slides.length, (currentSlide + 1) / slides.length],
    [0, 1, 1, 0]
  );

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen"
      style={{ height: `${slides.length * 100}vh` }}
    >
      {/* Fixed background images */}
      <div className="fixed inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${slide.backgroundImage}')`,
              backgroundAttachment: 'fixed'
            }}
          />
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Scrolling content sections */}
      {slides.map((slide, index) => (
        <section
          key={slide.id}
          className="relative h-screen flex items-center justify-center px-4 z-10"
        >
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              style={{
                y: index === currentSlide ? titleY : 100,
                opacity: index === currentSlide ? titleOpacity : 0
              }}
              className="space-y-6"
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold"
                style={{
                  textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.3)'
                }}
              >
                {slide.title}
              </motion.h1>
              
              <motion.h2 
                className="text-2xl md:text-4xl font-medium opacity-90"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                }}
              >
                {slide.subtitle}
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl max-w-2xl mx-auto opacity-80"
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                }}
              >
                {slide.description}
              </motion.p>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default ScrollSlideshow;