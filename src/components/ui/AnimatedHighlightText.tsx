import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface HighlightConfig {
  text: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
  animation: 'bounce' | 'pulse' | 'wave' | 'glow' | 'shake';
}

interface AnimatedHighlightTextProps {
  text: string;
  highlights?: HighlightConfig[];
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  trigger?: boolean;
}

const AnimatedHighlightText: React.FC<AnimatedHighlightTextProps> = ({
  text,
  highlights = [],
  className = '',
  style = {},
  delay = 0,
  duration = 1,
  trigger = true
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShouldAnimate(true);
    }
  }, [trigger]);

  const getAnimationVariants = (animation: string) => {
    switch (animation) {
      case 'bounce':
        return {
          animate: {
            y: [0, -8, 0],
            transition: {
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }
          }
        };
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.1, 1],
            transition: {
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut"
            }
          }
        };
      case 'wave':
        return {
          animate: {
            rotate: [0, 8, -8, 0],
            transition: {
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }
          }
        };
      case 'glow':
        return {
          animate: {
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
          }
        };
      case 'shake':
        return {
          animate: {
            x: [0, -2, 2, -2, 2, 0],
            transition: {
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut"
            }
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

  const processText = () => {
    if (highlights.length === 0) {
      return <span>{text}</span>;
    }

    let processedText = text;
    const replacements: { original: string; replacement: JSX.Element }[] = [];

    highlights.forEach((highlight, index) => {
      const highlightKey = `__HIGHLIGHT_${index}__`;
      const animationProps = getAnimationVariants(highlight.animation);
      
      const replacement = (
        <motion.span
          key={`highlight-${index}`}
          className={`inline-block font-bold ${getColorClasses(highlight.color)}`}
          style={{
            filter: 'drop-shadow(0 0 8px currentColor)',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)'
          }}
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1, ...animationProps.animate } : { opacity: 0 }}
        >
          {highlight.text}
        </motion.span>
      );

      replacements.push({
        original: highlight.text,
        replacement
      });

      processedText = processedText.replace(highlight.text, highlightKey);
    });

    // Split the text and replace highlights
    const parts = processedText.split(/(__HIGHLIGHT_\d+__)/);
    
    return parts.map((part, index) => {
      const highlightMatch = part.match(/__HIGHLIGHT_(\d+)__/);
      if (highlightMatch) {
        const highlightIndex = parseInt(highlightMatch[1]);
        return replacements[highlightIndex]?.replacement;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.div
      className={`animated-highlight-text ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay }}
    >
      {processText()}
    </motion.div>
  );
};

export default AnimatedHighlightText;