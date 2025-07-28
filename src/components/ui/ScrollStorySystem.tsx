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
  },
  {
    id: 11,
    title: "TOP PLATE BEFORE",
    subtitle: "Energy Hemorrhage Zone",
    description: "Inside the attic, the top plate shows clear signs of air leakage and thermal bridging...",
    image: "/images/attics/11-Attic-inside-top-plate-Before.jpg",
    textAnimation: 'fade',
    titleAnimation: 'slide',
    background: 'from-orange-900/30 to-red-900/30'
  },
  {
    id: 12,
    title: "TOP PLATE AFTER",
    subtitle: "Sealed Perfection",
    description: "After professional spray foam application, the top plate is completely air sealed...",
    image: "/images/attics/12-Attic-inside-top-plate-after.jpg",
    textAnimation: 'focus',
    titleAnimation: 'bounce',
    background: 'from-green-900/30 to-teal-900/30'
  },
  {
    id: 13,
    title: "COMPREHENSIVE SEALING",
    subtitle: "Total Air Barrier",
    description: "Multiple angles show the complete transformation of thermal performance...",
    image: "/images/attics/13-Attic-inside-top-plate-after-2.jpg",
    textAnimation: 'explosion',
    titleAnimation: 'focus',
    background: 'from-blue-900/30 to-indigo-900/30'
  },
  {
    id: 14,
    title: "BALLOON FRAME NIGHTMARE",
    subtitle: "Open Top Plate Crisis",
    description: "Old balloon frame construction creates massive air leakage pathways...",
    image: "/images/attics/14-open-top-plate-old-balloon-frame-before.JPG",
    textAnimation: 'slide',
    titleAnimation: 'explosion',
    background: 'from-red-900/30 to-orange-900/30'
  },
  {
    id: 15,
    title: "BALLOON FRAME SOLUTION",
    subtitle: "Spray Foam Victory",
    description: "Professional spray foam completely seals even the most challenging balloon frame openings...",
    image: "/images/attics/15-open-top-plate-old-balloon-frame-after-spray-foam.JPG",
    textAnimation: 'typewriter',
    titleAnimation: 'fade',
    background: 'from-green-900/30 to-emerald-900/30'
  },
  {
    id: 16,
    title: "AIR LOSS EVIDENCE",
    subtitle: "Before Air Sealing",
    description: "Visible signs of air movement and thermal bridging throughout the attic space...",
    image: "/images/attics/16-attic-air-loss-before-airsealing-sprayfoam.JPG",
    textAnimation: 'blur',
    titleAnimation: 'split',
    background: 'from-yellow-900/30 to-red-900/30'
  },
  {
    id: 17,
    title: "LARGE VOID DISCOVERY",
    subtitle: "Hidden Energy Drain",
    description: "Large voids in the building envelope create massive energy loss pathways...",
    image: "/images/attics/18-attic-air-sealing-large-void-before-foam.JPG",
    textAnimation: 'focus',
    titleAnimation: 'slide',
    background: 'from-purple-900/30 to-pink-900/30'
  },
  {
    id: 18,
    title: "DROP CEILING SOLUTION",
    subtitle: "Spray Foam Transformation",
    description: "Drop ceiling areas receive comprehensive spray foam treatment for complete air sealing...",
    image: "/images/attics/19-attic-drop-ceiling-spray-foam-after.JPG",
    textAnimation: 'bounce',
    titleAnimation: 'explosion',
    background: 'from-teal-900/30 to-cyan-900/30'
  },
  {
    id: 19,
    title: "DUCTWORK DISASTER",
    subtitle: "Before Treatment",
    description: "Uninsulated ductwork in unconditioned space wastes massive amounts of energy...",
    image: "/images/attics/20-attic-ductwork-before-spray-foam.JPG",
    textAnimation: 'slide',
    titleAnimation: 'focus',
    background: 'from-orange-900/30 to-red-900/30'
  },
  {
    id: 20,
    title: "LOOSE LEAKY DUCTS",
    subtitle: "Energy Hemorrhage",
    description: "Loose and leaky ductwork connections waste conditioned air directly into the attic...",
    image: "/images/attics/21-attic-ductwork-before-spray-foam-loose-leaky.JPG",
    textAnimation: 'typewriter',
    titleAnimation: 'bounce',
    background: 'from-red-900/30 to-rose-900/30'
  },
  {
    id: 21,
    title: "SPLIT OPEN DUCTS",
    subtitle: "Critical Failure",
    description: "Split ductwork dumps expensive conditioned air directly into the unconditioned attic...",
    image: "/images/attics/22-attic-ductwork-split-open-leaking-into-attic.JPG",
    textAnimation: 'explosion',
    titleAnimation: 'slide',
    background: 'from-yellow-900/30 to-orange-900/30'
  },
  {
    id: 22,
    title: "DUCTWORK TRANSFORMATION",
    subtitle: "After Spray Foam",
    description: "Professional spray foam encapsulation protects and insulates all ductwork...",
    image: "/images/attics/23-attic-ductwork-after-spray-foam.JPG",
    textAnimation: 'focus',
    titleAnimation: 'fade',
    background: 'from-green-900/30 to-teal-900/30'
  },
  {
    id: 23,
    title: "CRUSHED DUCTS",
    subtitle: "Airflow Restriction",
    description: "Crushed ductwork restricts airflow and reduces HVAC system efficiency...",
    image: "/images/attics/24-attic-ductwork-crushed.JPG",
    textAnimation: 'blur',
    titleAnimation: 'explosion',
    background: 'from-purple-900/30 to-indigo-900/30'
  },
  {
    id: 24,
    title: "PROFESSIONAL ENCAPSULATION",
    subtitle: "Ductwork Protection",
    description: "Spray foam encapsulation provides thermal protection and structural support for ductwork...",
    image: "/images/attics/25-attic-spray-foam-ductwork-after.JPG",
    textAnimation: 'slide',
    titleAnimation: 'focus',
    background: 'from-emerald-900/30 to-green-900/30'
  },
  {
    id: 25,
    title: "SKYLIGHT SEALING",
    subtitle: "Light Well Treatment",
    description: "Skylights receive specialized spray foam treatment to eliminate thermal bridging...",
    image: "/images/attics/27-attic-spray-foam-skylight-after.JPG",
    textAnimation: 'typewriter',
    titleAnimation: 'split',
    background: 'from-cyan-900/30 to-blue-900/30'
  },
  {
    id: 26,
    title: "COMPLETE AIR BARRIER",
    subtitle: "Thermal Envelope Perfection",
    description: "Professional spray foam creates a continuous air barrier throughout the entire attic space...",
    image: "/images/attics/28-attic-spray-foam-airseal-air-barrier.JPG",
    textAnimation: 'bounce',
    titleAnimation: 'explosion',
    background: 'from-lime-900/30 to-emerald-900/30'
  },
  {
    id: 27,
    title: "ANIMAL DAMAGE",
    subtitle: "Insulation Disturbed",
    description: "Animals can disturb and contaminate traditional insulation, reducing its effectiveness...",
    image: "/images/attics/29-attic-insulation-distrubed-animals.JPG",
    textAnimation: 'fade',
    titleAnimation: 'slide',
    background: 'from-brown-900/30 to-orange-900/30'
  },
  {
    id: 28,
    title: "COMPLETE REMOVAL",
    subtitle: "Animals Destroy Insulation",
    description: "Severe animal damage requires complete insulation removal and replacement...",
    image: "/images/attics/30-attic-insulation-removed-by-animals.JPG",
    textAnimation: 'focus',
    titleAnimation: 'bounce',
    background: 'from-gray-900/30 to-slate-900/30'
  },
  {
    id: 29,
    title: "CELLULOSE RESTORATION",
    subtitle: "Traditional Insulation",
    description: "When appropriate, cellulose insulation provides effective thermal performance...",
    image: "/images/attics/31-attic-cellulose-insulation-finished.JPG",
    textAnimation: 'explosion',
    titleAnimation: 'fade',
    background: 'from-amber-900/30 to-yellow-900/30'
  },
  {
    id: 30,
    title: "YOUR TRANSFORMATION",
    subtitle: "Ready to Begin?",
    description: "Contact us today for your free attic assessment and discover how much you could save...",
    image: "/images/attics/10-attic-spray-foam-and-ventilation.JPG",
    textAnimation: 'focus',
    titleAnimation: 'explosion',
    background: 'from-green-900/20 to-emerald-900/20'
  }
];

const ScrollStorySystem: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [backgroundImage, setBackgroundImage] = useState('/attics/background.jpg'); // Force start with background.jpg
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(currentScroll / scrollHeight, 1);
      
      setScrollProgress(progress);
      
      // Calculate which scene should be active
      // Simple calculation that works with the larger scroll area
      const sceneIndex = Math.floor(progress * (storyScenes.length - 1));
      const clampedIndex = Math.min(Math.max(sceneIndex, 0), storyScenes.length - 1);
      
      if (clampedIndex !== currentScene) {
        setCurrentScene(clampedIndex);
        setBackgroundImage(storyScenes[clampedIndex].image);
      }
    };

    // Initialize everything
    const initialize = () => {
      // Set appropriate height for 31 scenes with smooth transitions
      document.body.style.height = '1000vh';
      
      // Add touch-action for mobile support
      document.body.style.touchAction = 'pan-y';
      document.documentElement.style.touchAction = 'pan-y';
      
      // Add smooth scrolling behavior
      document.documentElement.style.scrollBehavior = 'auto'; // Keep instant for programmatic scrolls
      
      // Ensure we start at scene 0 with the background.jpg
      console.log('Initializing to scene 0 with image:', storyScenes[0].image);
      setCurrentScene(0);
      setBackgroundImage('/attics/background.jpg'); // Force the correct path
      setScrollProgress(0);
      setIsInitialized(true);
      
      // Scroll to top to ensure we start at scene 0
      window.scrollTo(0, 0);
    };

    initialize();
    window.addEventListener('scroll', handleScroll);
    
    // Add touch event support for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      // Allow normal scrolling behavior
      touchEndY = e.touches[0].clientY;
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.body.style.height = 'auto';
      document.body.style.touchAction = 'auto';
      document.documentElement.style.touchAction = 'auto';
    };
  }, []); // Remove currentScene dependency to prevent loops

  // Additional failsafe to ensure we start at scene 0
  useEffect(() => {
    if (!isInitialized) {
      setTimeout(() => {
        console.log('Failsafe: Forcing scene 0 with background.jpg');
        setCurrentScene(0);
        setBackgroundImage('/attics/background.jpg');
      }, 100);
    }
  }, [isInitialized]);

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
        className="fixed inset-0 z-20"
      >
        <AnimatePresence mode="wait">
          {currentScene === 0 ? (
            /* First scene - Centered layout */
            <motion.div
              key="intro-scene"
              className="flex flex-col items-center justify-center h-full px-4 md:px-8 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              {/* Title */}
              <div className="mb-6">
                <CinematicText
                  text={currentStoryScene.title}
                  type={currentStoryScene.titleAnimation}
                  className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-wider leading-tight text-center"
                  style={{
                    textShadow: `
                      0 0 15px rgba(0, 0, 0, 0.9),
                      0 0 30px rgba(0, 0, 0, 0.8),
                      0 0 45px rgba(0, 0, 0, 0.7),
                      3px 3px 6px rgba(0, 0, 0, 1),
                      6px 6px 12px rgba(0, 0, 0, 0.8)
                    `
                  }}
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
                    className="text-2xl md:text-3xl font-bold text-yellow-300 tracking-wide"
                    style={{
                      textShadow: `
                        0 0 12px rgba(0, 0, 0, 0.9),
                        0 0 24px rgba(0, 0, 0, 0.8),
                        3px 3px 6px rgba(0, 0, 0, 1),
                        4px 4px 8px rgba(0, 0, 0, 0.8)
                      `
                    }}
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
                  className="text-xl md:text-2xl text-white font-medium leading-relaxed max-w-4xl mx-auto"
                  style={{
                    textShadow: `
                      0 0 10px rgba(0, 0, 0, 0.9),
                      0 0 20px rgba(0, 0, 0, 0.8),
                      2px 2px 4px rgba(0, 0, 0, 1),
                      3px 3px 6px rgba(0, 0, 0, 0.8)
                    `
                  }}
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
                    style={{
                      boxShadow: '0 0 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)'
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* Other scenes - Top/Bottom layout */
            <div className="flex flex-col justify-between h-full">
              {/* Top section - Title and Subtitle */}
              <motion.div
                key={`top-${currentScene}`}
                className="pt-32 pb-4 px-4 md:px-8 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Title */}
                <div className="mb-4">
                  <CinematicText
                    text={currentStoryScene.title}
                    type={currentStoryScene.titleAnimation}
                    className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider leading-tight text-center"
                    style={{
                      textShadow: `
                        0 0 10px rgba(0, 0, 0, 0.9),
                        0 0 20px rgba(0, 0, 0, 0.8),
                        0 0 30px rgba(0, 0, 0, 0.7),
                        2px 2px 4px rgba(0, 0, 0, 1),
                        4px 4px 8px rgba(0, 0, 0, 0.8)
                      `
                    }}
                    duration={0.8}
                    splitBy="words"
                    trigger={true}
                  />
                </div>
                
                {/* Subtitle */}
                {currentStoryScene.subtitle && (
                  <div>
                    <CinematicText
                      text={currentStoryScene.subtitle}
                      type="fade"
                      className="text-lg md:text-xl font-bold text-yellow-300 tracking-wide"
                      style={{
                        textShadow: `
                          0 0 8px rgba(0, 0, 0, 0.9),
                          0 0 16px rgba(0, 0, 0, 0.8),
                          2px 2px 4px rgba(0, 0, 0, 1),
                          3px 3px 6px rgba(0, 0, 0, 0.8)
                        `
                      }}
                      duration={0.6}
                      delay={0.3}
                      trigger={true}
                    />
                  </div>
                )}
              </motion.div>

              {/* Bottom section - Description and Scene indicator */}
              <motion.div
                key={`bottom-${currentScene}`}
                className="pb-32 pt-4 px-4 md:px-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Description */}
                <div className="mb-8">
                  <CinematicText
                    text={currentStoryScene.description}
                    type={currentStoryScene.textAnimation}
                    className="text-lg md:text-xl text-white font-medium leading-relaxed max-w-4xl mx-auto"
                    style={{
                      textShadow: `
                        0 0 8px rgba(0, 0, 0, 0.9),
                        0 0 16px rgba(0, 0, 0, 0.8),
                        1px 1px 3px rgba(0, 0, 0, 1),
                        2px 2px 6px rgba(0, 0, 0, 0.8)
                      `
                    }}
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
                      style={{
                        boxShadow: '0 0 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)'
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          )}
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