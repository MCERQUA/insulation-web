import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface HighlightConfig {
  text: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
  animation: 'bounce' | 'pulse' | 'wave' | 'glow' | 'shake';
}

interface CinematicHighlightTextProps {
  text: string;
  type?: 'fade' | 'blur' | 'split' | 'focus' | 'slide' | 'bounce' | 'typewriter' | 'explosion' | 'lightInteraction';
  highlights?: HighlightConfig[];
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  splitBy?: 'chars' | 'words' | 'lines';
  onComplete?: () => void;
  trigger?: boolean;
}

const CinematicHighlightText: React.FC<CinematicHighlightTextProps> = ({
  text,
  type = 'fade',
  highlights = [],
  className = '',
  style = {},
  delay = 0,
  duration = 1,
  direction = 'bottom',
  splitBy = 'words',
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

  const getHighlightAnimationVariants = (animation: string) => {
    switch (animation) {
      case 'bounce':
        return {
          y: [0, -8, 0],
          transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }
        };
      case 'pulse':
        return {
          scale: [1, 1.15, 1],
          transition: {
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut"
          }
        };
      case 'wave':
        return {
          rotate: [0, 12, -12, 0],
          transition: {
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }
        };
      case 'glow':
        return {
          textShadow: [
            '0 0 5px currentColor',
            '0 0 20px currentColor, 0 0 30px currentColor',
            '0 0 5px currentColor'
          ],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case 'shake':
        return {
          x: [0, -3, 3, -3, 3, 0],
          transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut"
          }
        };
      default:
        return {};
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return 'text-red-400';
      case 'blue':
        return 'text-blue-400';
      case 'green':
        return 'text-green-400';
      case 'yellow':
        return 'text-yellow-400';
      default:
        return '';
    }
  };

  const isHighlighted = (word: string) => {
    return highlights.find(h => word.includes(h.text) || h.text.includes(word));
  };

  const getWordHighlight = (word: string) => {
    // Check for exact matches first
    let highlight = highlights.find(h => h.text === word);
    if (highlight) return highlight;

    // Check for partial matches
    highlight = highlights.find(h => word.includes(h.text));
    if (highlight) return highlight;

    // Check for multi-word highlights
    highlight = highlights.find(h => h.text.includes(word) && h.text.split(' ').length > 1);
    return highlight;
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
      
      case 'lightInteraction':
        return {
          hidden: { 
            opacity: 0,
            scale: 0.8
          },
          visible: { 
            opacity: 1,
            scale: 1,
            transition: { 
              duration: duration * 1.2,
              ease: "power2.out"
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

  // Process multi-word highlights
  const processMultiWordHighlights = () => {
    let processedElements = [...elements];
    
    highlights.forEach(highlight => {
      if (highlight.text.includes(' ')) {
        const words = highlight.text.split(' ');
        const startIndex = processedElements.findIndex((element, index) => {
          return words.every((word, wordIndex) => 
            processedElements[index + wordIndex] && 
            processedElements[index + wordIndex].toLowerCase().replace(/[^\w]/g, '') === word.toLowerCase().replace(/[^\w]/g, '')
          );
        });
        
        if (startIndex !== -1) {
          // Mark these elements as part of a multi-word highlight
          for (let i = 0; i < words.length; i++) {
            if (processedElements[startIndex + i]) {
              processedElements[startIndex + i] = {
                text: processedElements[startIndex + i],
                highlight: highlight,
                isMultiWord: true,
                multiWordIndex: i
              };
            }
          }
        }
      }
    });
    
    return processedElements;
  };

  const processedElements = processMultiWordHighlights();

  return (
    <motion.div
      ref={containerRef}
      className={`cinematic-highlight-text ${className}`}
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
        processedElements.map((element, index) => {
          const isElementObject = typeof element === 'object';
          const elementText = isElementObject ? element.text : element;
          const elementHighlight = isElementObject ? element.highlight : getWordHighlight(elementText);
          
          const baseStyle = {
            transformOrigin: 'center',
            transformStyle: 'preserve-3d' as const,
            display: 'inline-block'
          };

          if (elementHighlight) {
            const colorClass = getColorClasses(elementHighlight.color);
            const highlightAnimation = getHighlightAnimationVariants(elementHighlight.animation);
            
            return (
              <motion.span
                key={index}
                variants={itemVariants}
                className={`${colorClass} font-bold`}
                style={{
                  ...baseStyle,
                  filter: 'drop-shadow(0 0 8px currentColor)'
                }}
                animate={shouldAnimate ? highlightAnimation : {}}
              >
                {elementText}
              </motion.span>
            );
          }

          return (
            <motion.span
              key={index}
              variants={itemVariants}
              className="inline-block"
              style={baseStyle}
            >
              {elementText}
            </motion.span>
          );
        })
      )}
    </motion.div>
  );
};

export default CinematicHighlightText;