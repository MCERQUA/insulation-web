"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CinematicText from './CinematicText';

interface StoryScene {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  textAnimation: 'fade' | 'blur' | 'split' | 'focus' | 'slide' | 'bounce' | 'typewriter' | 'explosion';
  titleAnimation: 'fade' | 'blur' | 'split' | 'focus' | 'slide' | 'bounce' | 'typewriter' | 'explosion';
  background?: string;
}

const storyScenes: StoryScene[] = [
  {
    id: 0,
    title: "SHEDDING LIGHT",
    subtitle: "On Your Attic Insulation",
    description: "Welcome to a journey that will reveal the hidden truth about what's happening above your head...",
    image: "/attics/background.jpg",
    textAnimation: 'focus',
    titleAnimation: 'fade',
    background: 'from-blue-900/20 to-indigo-900/20'
  },
  {
    id: 1,
    title: "THE DECEPTION",
    subtitle: "What Lurks Above",
    description: "Your attic may look fine from below, but the real story is happening where you can't see...",
    image: "/images/attics/1-attic-insulation-low-slop-looks-deceiving.JPG",
    textAnimation: 'slide',
    titleAnimation: 'explosion',
    background: 'from-red-900/30 to-orange-900/30'
  },
  {
    id: 2,
    title: "THE OUTSIDE TRUTH",
    subtitle: "Low Slope Reality",
    description: "From the outside, everything appears normal. But thermal imaging reveals the shocking reality...",
    image: "/images/attics/2-Low-Slope-roof-outside-view.JPG",
    textAnimation: 'blur',
    titleAnimation: 'focus',
    background: 'from-blue-900/30 to-cyan-900/30'
  },
  {
    id: 3,
    title: "CLOSER INSPECTION",
    subtitle: "The Plot Thickens",
    description: "A closer look reveals the extent of the thermal nightmare happening above your head...",
    image: "/images/attics/3-Low-Slope-roof-outside-view-closeup.JPG",
    textAnimation: 'bounce',
    titleAnimation: 'split',
    background: 'from-purple-900/30 to-pink-900/30'
  },
  {
    id: 4,
    title: "THE EDGE OF DISASTER",
    subtitle: "Top Plate Catastrophe",
    description: "Here's where your energy dollars are escaping - the top plate edge where heat hemorrhages freely...",
    image: "/images/attics/4-Low-Slope-roof-outside-view-closeup-top-plate-edge.JPG",
    textAnimation: 'typewriter',
    titleAnimation: 'slide',
    background: 'from-yellow-900/30 to-red-900/30'
  },
  {
    id: 5,
    title: "FROST: THE SMOKING GUN",
    subtitle: "Evidence of Energy Loss",
    description: "Frost formation reveals exactly where your heated air is escaping into the cold attic space...",
    image: "/images/attics/5-attic-outside-top-plate-low-slope-frost-closeup.JPG",
    textAnimation: 'focus',
    titleAnimation: 'explosion',
    background: 'from-cyan-900/30 to-blue-900/30'
  },
  {
    id: 6,
    title: "THE BIG PICTURE",
    subtitle: "Full Scale Failure",
    description: "Step back and see the complete thermal failure - this is what's costing you hundreds every month...",
    image: "/images/attics/6-attic-outside-top-plate-low-slope-frost.JPG",
    textAnimation: 'split',
    titleAnimation: 'bounce',
    background: 'from-indigo-900/30 to-purple-900/30'
  },
  {
    id: 7,
    title: "MOLD: THE CONSEQUENCE",
    subtitle: "Health Hazard Alert",
    description: "Poor insulation leads to condensation, which leads to mold. Your family's health is at risk...",
    image: "/images/attics/7-ceiling-corner-mold-low-slope-no-insulation2.JPG",
    textAnimation: 'blur',
    titleAnimation: 'fade',
    background: 'from-green-900/30 to-emerald-900/30'
  },
  {
    id: 8,
    title: "THE SPREADING THREAT",
    subtitle: "Mold Invasion",
    description: "What started as an energy problem becomes a health crisis. Mold spreads silently through your home...",
    image: "/images/attics/8-ceiling-corner-mold-low-slope-no-insulation.JPG",
    textAnimation: 'slide',
    titleAnimation: 'typewriter',
    background: 'from-red-900/30 to-rose-900/30'
  },
  {
    id: 9,
    title: "THE SOLUTION",
    subtitle: "Spray Foam Victory",
    description: "Professional spray foam insulation creates an impermeable barrier, solving the problem permanently...",
    image: "/images/attics/9-attic-spray-foam-top-plates-low-slope.JPG",
    textAnimation: 'explosion',
    titleAnimation: 'focus',
    background: 'from-lime-900/30 to-green-900/30'
  },
  {
    id: 10,
    title: "COMPLETE TRANSFORMATION",
    subtitle: "Energy Efficiency Achieved",
    description: "Proper spray foam and ventilation create the perfect attic environment - saving energy and preventing problems...",
    image: "/images/attics/10-attic-spray-foam-and-ventilation.JPG",
    textAnimation: 'bounce',
    titleAnimation: 'split',
    background: 'from-emerald-900/30 to-teal-900/30'
  }
];

const ScrollStorySystem: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [backgroundImage, setBackgroundImage] = useState(storyScenes[0].image);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(currentScroll / scrollHeight, 1);
      
      setScrollProgress(progress);
      
      // Calculate which scene should be active
      // When progress is 0, we want scene 0, when progress is 1, we want the last scene
      const sceneIndex = Math.floor(progress * (storyScenes.length - 1));
      const clampedIndex = Math.min(Math.max(sceneIndex, 0), storyScenes.length - 1);
      
      if (clampedIndex !== currentScene) {
        setCurrentScene(clampedIndex);
        setBackgroundImage(storyScenes[clampedIndex].image);
      }
    };

    // Set initial tall height for scrolling
    document.body.style.height = '1000vh';
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.height = 'auto';
    };
  }, [currentScene]);

  const currentStoryScene = storyScenes[currentScene];

  return (
    <>
      {/* Dynamic background image */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Gradient overlay */}
      <motion.div
        className={`fixed inset-0 z-10 bg-gradient-to-br ${currentStoryScene.background}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Story content container */}
      <div 
        ref={containerRef}
        className="fixed inset-0 z-20 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            className="text-center max-w-4xl px-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {/* Title */}
            <div className="mb-6">
              <CinematicText
                text={currentStoryScene.title}
                type={currentStoryScene.titleAnimation}
                className="text-6xl md:text-8xl font-black text-white tracking-wider drop-shadow-2xl leading-tight"
                duration={0.8}
                splitBy="words"
                trigger={true}
              />
            </div>
            
            {/* Subtitle */}
            {currentStoryScene.subtitle && (
              <div className="mb-8">
                <CinematicText
                  text={currentStoryScene.subtitle}
                  type="fade"
                  className="text-2xl md:text-3xl font-bold text-yellow-300 tracking-wide drop-shadow-lg"
                  duration={0.6}
                  delay={0.3}
                  trigger={true}
                />
              </div>
            )}
            
            {/* Description */}
            <div className="mb-12">
              <CinematicText
                text={currentStoryScene.description}
                type={currentStoryScene.textAnimation}
                className="text-xl md:text-2xl text-white font-medium leading-relaxed drop-shadow-lg max-w-3xl mx-auto"
                duration={1.2}
                delay={0.6}
                splitBy="words"
                trigger={true}
              />
            </div>
            
            {/* Scene indicator */}
            <div className="flex justify-center space-x-2">
              {storyScenes.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentScene ? 'bg-yellow-400' : 'bg-white/40'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-white text-center">
          <div className="text-sm mb-2 font-medium">Scroll to Continue</div>
          <motion.div
            className="w-48 h-2 bg-white/20 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: 192 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              style={{ width: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ScrollStorySystem;