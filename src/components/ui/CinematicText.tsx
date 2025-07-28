import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CinematicTextProps {
  text: string;
  type?: 'fade' | 'blur' | 'split' | 'focus' | 'slide' | 'bounce' | 'typewriter' | 'explosion';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  splitBy?: 'chars' | 'words' | 'lines';
  onComplete?: () => void;
  trigger?: boolean;
}

const CinematicText: React.FC<CinematicTextProps> = ({
  text,
  type = 'fade',
  className = '',
  style = {},
  delay = 0,
  duration = 1,
  direction = 'bottom',
  splitBy = 'chars',
  onComplete,
  trigger = true
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger) {
      setShouldAnimate(true);
    }
  }, [trigger]);

  const splitText = (text: string, by: string) => {
    switch (by) {
      case 'chars':
        return text.split('').map((char, i) => char === ' ' ? '\u00A0' : char);
      case 'words':
        return text.split(' ');
      case 'lines':
        return text.split('\n');
      default:
        return [text];
    }
  };

  const getSlideDirection = () => {
    switch (direction) {
      case 'left': return { x: -100, y: 0 };
      case 'right': return { x: 100, y: 0 };
      case 'top': return { x: 0, y: -100 };
      case 'bottom': return { x: 0, y: 100 };
      default: return { x: 0, y: 100 };
    }
  };

  const elements = splitText(text, splitBy);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: type === 'split' || type === 'explosion' ? 0.03 : 0.1,
        delayChildren: delay,
      }
    }
  };

  const getItemVariants = () => {
    const slideDir = getSlideDirection();
    
    switch (type) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { duration, ease: "easeOut" } 
          }
        };
      
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(10px)' },
          visible: { 
            opacity: 1, 
            filter: 'blur(0px)',
            transition: { duration, ease: "easeOut" }
          }
        };
      
      case 'split':
        return {
          hidden: { opacity: 0, y: 50, rotateX: -90 },
          visible: { 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            transition: { 
              duration: duration * 0.6, 
              ease: "back.out(1.7)" 
            }
          }
        };
      
      case 'focus':
        return {
          hidden: { opacity: 0, scale: 0.3, filter: 'blur(8px)' },
          visible: { 
            opacity: 1, 
            scale: 1, 
            filter: 'blur(0px)',
            transition: { 
              duration, 
              ease: "elastic.out(1, 0.5)" 
            }
          }
        };
      
      case 'slide':
        return {
          hidden: { opacity: 0, ...slideDir },
          visible: { 
            opacity: 1, 
            x: 0, 
            y: 0,
            transition: { 
              duration, 
              ease: "power3.out" 
            }
          }
        };
      
      case 'bounce':
        return {
          hidden: { opacity: 0, y: -200, scale: 0.3 },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
              duration, 
              ease: "bounce.out" 
            }
          }
        };
      
      case 'typewriter':
        return {
          hidden: { width: 0 },
          visible: { 
            width: 'auto',
            transition: { 
              duration: duration * 0.05, 
              ease: "steps(1)" 
            }
          }
        };
      
      case 'explosion':
        return {
          hidden: { 
            opacity: 0, 
            scale: 0,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            rotate: Math.random() * 360
          },
          visible: { 
            opacity: 1, 
            scale: 1,
            x: 0,
            y: 0,
            rotate: 0,
            transition: { 
              duration: duration * 0.8, 
              ease: "power4.out" 
            }
          }
        };
      
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration } }
        };
    }
  };

  const itemVariants = getItemVariants();

  return (
    <motion.div
      ref={containerRef}
      className={`cinematic-text ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      onAnimationComplete={onComplete}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1000px',
        textAlign: 'center',
        width: '100%',
        gap: '0.25em',
        ...style
      }}
    >
      {type === 'typewriter' ? (
        <motion.span
          variants={itemVariants}
          style={{ 
            overflow: 'hidden',
            borderRight: shouldAnimate ? '3px solid currentColor' : 'none',
            whiteSpace: 'nowrap'
          }}
        >
          {text}
        </motion.span>
      ) : (
        splitBy === 'words' ? (
          // For words, wrap each word to prevent breaking
          elements.map((element, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              className="inline-block whitespace-nowrap"
              style={{
                transformOrigin: 'center',
                transformStyle: 'preserve-3d'
              }}
            >
              {element}
            </motion.span>
          ))
        ) : (
          // For characters, keep existing behavior
          elements.map((element, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              className="inline-block"
              style={{
                transformOrigin: 'center',
                transformStyle: 'preserve-3d'
              }}
            >
              {element}
            </motion.span>
          ))
        )
      )}
    </motion.div>
  );
};

export default CinematicText;