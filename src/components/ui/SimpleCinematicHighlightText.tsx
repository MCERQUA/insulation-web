import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HighlightConfig {
  text: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
  animation: 'bounce' | 'pulse' | 'wave' | 'glow' | 'shake';
}

interface SimpleCinematicHighlightTextProps {
  text: string;
  type?: 'fade' | 'blur' | 'split' | 'focus' | 'slide' | 'bounce' | 'typewriter' | 'explosion';
  highlights?: HighlightConfig[];
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  splitBy?: 'chars' | 'words';
  trigger?: boolean;
}

const SimpleCinematicHighlightText: React.FC<SimpleCinematicHighlightTextProps> = ({
  text,
  type = 'fade',
  highlights = [],
  className = '',
  style = {},
  delay = 0,
  duration = 1,
  splitBy = 'words',
  trigger = true
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

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
      default:
        return [text];
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
          rotate: [0, 8, -8, 0],
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
            '0 0 10px currentColor, 0 0 20px currentColor',
            '0 0 30px currentColor, 0 0 50px currentColor, 0 0 70px currentColor',
            '0 0 20px currentColor, 0 0 30px currentColor',
            '0 0 10px currentColor, 0 0 15px currentColor'
          ],
          scale: [1, 1.02, 1],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case 'shake':
        return {
          x: [0, -2, 2, -2, 2, 0],
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
        return 'text-yellow-200';
      default:
        return '';
    }
  };

  const isWordHighlighted = (word: string) => {
    return highlights.find(h => 
      word.toLowerCase().includes(h.text.toLowerCase()) || 
      h.text.toLowerCase().includes(word.toLowerCase())
    );
  };

  const elements = splitText(text, splitBy);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      }
    }
  };

  const getItemVariants = () => {
    switch (type) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { duration: duration * 0.8, ease: "easeOut" } 
          }
        };
      
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(10px)' },
          visible: { 
            opacity: 1, 
            filter: 'blur(0px)',
            transition: { duration: duration * 0.8, ease: "easeOut" }
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
              ease: "easeOut" 
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
              duration: duration * 0.8, 
              ease: "easeOut" 
            }
          }
        };
      
      case 'slide':
        return {
          hidden: { opacity: 0, x: -100 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: duration * 0.8, 
              ease: "easeOut" 
            }
          }
        };
      
      case 'bounce':
        return {
          hidden: { opacity: 0, y: -100, scale: 0.3 },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
              duration: duration * 0.8, 
              ease: "easeOut" 
            }
          }
        };
      
      case 'explosion':
        return {
          hidden: { 
            opacity: 0, 
            scale: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            rotate: Math.random() * 180 - 90
          },
          visible: { 
            opacity: 1, 
            scale: 1,
            x: 0,
            y: 0,
            rotate: 0,
            transition: { 
              duration: duration * 0.8, 
              ease: "easeOut" 
            }
          }
        };
      
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: duration * 0.8 } }
        };
    }
  };

  const itemVariants = getItemVariants();

  return (
    <motion.div
      className={`simple-cinematic-highlight-text ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        gap: '0.25em',
        ...style
      }}
    >
      {elements.map((element, index) => {
        const highlight = isWordHighlighted(element);
        
        if (highlight) {
          const colorClass = getColorClasses(highlight.color);
          const highlightAnimation = getHighlightAnimationVariants(highlight.animation);
          
          return (
            <motion.span
              key={index}
              variants={itemVariants}
              className={`inline-block font-bold ${colorClass}`}
              style={{
                transformOrigin: 'center',
                filter: 'drop-shadow(0 0 6px currentColor)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)'
              }}
              animate={shouldAnimate ? highlightAnimation : {}}
            >
              {element}
            </motion.span>
          );
        }

        return (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block"
            style={{
              transformOrigin: 'center'
            }}
          >
            {element}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default SimpleCinematicHighlightText;