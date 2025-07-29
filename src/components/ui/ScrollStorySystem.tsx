"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CinematicText from './CinematicText';
import ColdClimateStamp from './ColdClimateStamp';
import SimpleCinematicHighlightText from './SimpleCinematicHighlightText';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HighlightConfig {
  text: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
  animation: 'bounce' | 'pulse' | 'wave' | 'glow' | 'shake';
}

interface StoryScene {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  textAnimation: 'fade' | 'blur' | 'split' | 'focus' | 'slide' | 'bounce' | 'typewriter' | 'explosion';
  titleAnimation: 'fade' | 'blur' | 'split' | 'focus' | 'slide' | 'bounce' | 'typewriter' | 'explosion';
  background?: string;
  highlights?: HighlightConfig[];
}

const storyScenes: StoryScene[] = [
  {
    id: 0,
    title: "SHEDDING LIGHT",
    subtitle: "On Your Attic Insulation",
    description: "Welcome to a journey that will reveal the hidden truth about what's happening above your head...",
    image: "/attics/background.jpg",
    textAnimation: 'fade',
    titleAnimation: 'fade',
    background: 'from-blue-900/20 to-indigo-900/20'
  },
  {
    id: 1,
    title: "HIDDEN IN PLAIN SIGHT",
    subtitle: "The Unseen Story",
    description: "Your attic may look fine from the hatch, but the real story is happening where you can't see. Even when your attic appears to have plenty of insulation, it's the hidden areas that matter most.",
    image: "/images/attics/1-attic-insulation-low-slop-looks-deceiving.JPG",
    textAnimation: 'slide',
    titleAnimation: 'explosion',
    background: 'from-red-900/30 to-orange-900/30',
    highlights: [
      { text: "can't see", color: 'red', animation: 'pulse' },
      { text: "hidden areas", color: 'blue', animation: 'glow' }
    ]
  },
  {
    id: 2,
    title: "THE TRUTH ABOUT LOW SLOPES",
    subtitle: "Low Slope Reality",
    description: "With the roof sheathing removed, we can see these hidden areas for the shocking reality. Low slope roofs create impossible-to-insulate spaces that most homeowners never know exist.",
    image: "/images/attics/2-Low-Slope-roof-outside-view.JPG",
    textAnimation: 'blur',
    titleAnimation: 'bounce',
    background: 'from-blue-900/30 to-cyan-900/30'
  },
  {
    id: 3,
    title: "CLOSER INSPECTION",
    subtitle: "The Plot Thickens",
    description: "Closer inspection reveals the devastating truth - bare spots with no insulation left completely empty where protection is needed most. Low slopes make it impossible to properly insulate these critical areas.",
    image: "/images/attics/3-Low-Slope-roof-outside-view-closeup.JPG",
    textAnimation: 'split',
    titleAnimation: 'focus',
    background: 'from-purple-900/30 to-pink-900/30'
  },
  {
    id: 4,
    title: "THE EDGE OF DISASTER",
    subtitle: "Top Plate Catastrophe",
    description: "Here's where your energy dollars are escaping - there's no protection or insulation where heat loss is most critical.",
    image: "/images/attics/4-Low-Slope-roof-outside-view-closeup-top-plate-edge.JPG",
    textAnimation: 'typewriter',
    titleAnimation: 'explosion',
    background: 'from-yellow-900/30 to-red-900/30',
    highlights: [
      { text: "energy dollars", color: 'red', animation: 'shake' },
      { text: "escaping", color: 'red', animation: 'bounce' },
      { text: "most critical", color: 'blue', animation: 'pulse' }
    ]
  },
  {
    id: 5,
    title: "FROST: THE SMOKING GUN",
    subtitle: "Evidence of Energy Loss",
    description: "Frost formation reveals exactly where your heated air is escaping into the cold attic space...",
    image: "/images/attics/5-attic-outside-top-plate-low-slope-frost-closeup.JPG",
    textAnimation: 'bounce',
    titleAnimation: 'slide',
    background: 'from-cyan-900/30 to-blue-900/30',
    highlights: [
      { text: "reveals exactly", color: 'blue', animation: 'glow' },
      { text: "escaping", color: 'red', animation: 'wave' }
    ]
  },
  {
    id: 6,
    title: "ICE DAMMING DAMAGE",
    subtitle: "Cold Climate Consequences",
    description: "Frost melting and refreezing creates ice dams, causing serious damage to your home's structure and interior...",
    image: "/images/attics/6-attic-outside-top-plate-low-slope-frost.JPG",
    textAnimation: 'explosion',
    titleAnimation: 'blur',
    background: 'from-indigo-900/30 to-purple-900/30'
  },
  {
    id: 7,
    title: "MOLD: THE CONSEQUENCE",
    subtitle: "Health Hazard Alert",
    description: "Poor insulation leads to condensation, which leads to mold. Your family's health is at risk...",
    image: "/images/attics/7-ceiling-corner-mold-low-slope-no-insulation2.JPG",
    textAnimation: 'focus',
    titleAnimation: 'typewriter',
    background: 'from-green-900/30 to-emerald-900/30',
    highlights: [
      { text: "mold", color: 'red', animation: 'pulse' },
      { text: "health is at risk", color: 'red', animation: 'shake' }
    ]
  },
  {
    id: 9,
    title: "THE SOLUTION",
    subtitle: "Spray Foam Victory",
    description: "Professional spray foam insulation creates an impermeable barrier, solving the problem permanently...",
    image: "/images/attics/9-attic-spray-foam-top-plates-low-slope.JPG",
    textAnimation: 'slide',
    titleAnimation: 'bounce',
    background: 'from-lime-900/30 to-green-900/30',
    highlights: [
      { text: "impermeable barrier", color: 'blue', animation: 'glow' },
      { text: "permanently", color: 'green', animation: 'bounce' }
    ]
  },
  {
    id: 10,
    title: "COMPLETE TRANSFORMATION",
    subtitle: "Energy Efficiency Achieved",
    description: "Proper spray foam and ventilation create the perfect attic environment - saving energy and preventing problems...",
    image: "/images/attics/10-attic-spray-foam-and-ventilation.JPG",
    textAnimation: 'split',
    titleAnimation: 'explosion',
    background: 'from-emerald-900/30 to-teal-900/30'
  },
  {
    id: 11,
    title: "TOP PLATE BEFORE",
    subtitle: "Energy Hemorrhage Zone",
    description: "Inside the attic, the top plate shows clear signs of air leakage and thermal bridging...",
    image: "/images/attics/11-Attic-inside-top-plate-Before.jpg",
    textAnimation: 'blur',
    titleAnimation: 'focus',
    background: 'from-orange-900/30 to-red-900/30'
  },
  {
    id: 12,
    title: "TOP PLATE AFTER",
    subtitle: "Sealed Perfection",
    description: "After professional spray foam application, the top plate is completely air sealed...",
    image: "/images/attics/12-Attic-inside-top-plate-after.jpg",
    textAnimation: 'typewriter',
    titleAnimation: 'slide',
    background: 'from-green-900/30 to-teal-900/30'
  },
  {
    id: 13,
    title: "COMPREHENSIVE SEALING",
    subtitle: "Total Air Barrier",
    description: "Comprehensive air-sealing targets all the little gaps, cracks, and tiny leakage points that add up to massive energy loss.",
    image: "/images/attics/13-Attic-inside-top-plate-after-2.jpg",
    textAnimation: 'bounce',
    titleAnimation: 'blur',
    background: 'from-blue-900/30 to-indigo-900/30'
  },
  {
    id: 14,
    title: "BALLOON FRAME NIGHTMARE",
    subtitle: "Open Top Plate Crisis",
    description: "Old balloon frame construction creates massive air leakage pathways - wide open down entire wall in older homes.",
    image: "/images/attics/14-open-top-plate-old-balloon-frame-before.JPG",
    textAnimation: 'explosion',
    titleAnimation: 'typewriter',
    background: 'from-red-900/30 to-orange-900/30'
  },
  {
    id: 15,
    title: "AIR LOSS EVIDENCE",
    subtitle: "Modern Construction Issues",
    description: "Even modern construction has massive air leakages - it's not just cracks and gaps in new construction.",
    image: "/images/attics/16-attic-air-loss-before-airsealing-sprayfoam.JPG",
    textAnimation: 'focus',
    titleAnimation: 'bounce',
    background: 'from-yellow-900/30 to-red-900/30'
  },
  {
    id: 16,
    title: "MASSIVE VOIDS IN NEW CONSTRUCTION",
    subtitle: "Hidden Energy Drain",
    description: "Even modern construction can have massive air loss. This void shows that it's not just old homes - new construction can have devastating gaps too.",
    image: "/images/attics/18-attic-air-sealing-large-void-before-foam.JPG",
    textAnimation: 'split',
    titleAnimation: 'explosion',
    background: 'from-purple-900/30 to-pink-900/30'
  },
  {
    id: 17,
    title: "BALLOON FRAME SOLUTION",
    subtitle: "Spray Foam Victory",
    description: "Professional spray foam completely seals even the most challenging balloon frame openings.",
    image: "/images/attics/15-open-top-plate-old-balloon-frame-after-spray-foam.JPG",
    textAnimation: 'slide',
    titleAnimation: 'focus',
    background: 'from-green-900/30 to-emerald-900/30'
  },
  {
    id: 19,
    title: "OLD BRITTLE INSULATION FAILURE",
    subtitle: "Non-Foam Insulations Don't Last",
    description: "Non-foam insulations that don't last forever, causing huge heat loss issues.",
    image: "/images/attics/20-attic-ductwork-before-spray-foam.JPG",
    textAnimation: 'blur',
    titleAnimation: 'slide',
    background: 'from-orange-900/30 to-red-900/30',
    highlights: [
      { text: "don't last forever", color: 'red', animation: 'wave' },
      { text: "huge heat loss", color: 'red', animation: 'pulse' }
    ]
  },
  {
    id: 20,
    title: "LOOSE LEAKY DUCTS",
    subtitle: "Energy Hemorrhage",
    description: "Loose and leaky ductwork connections waste conditioned air directly into the attic.",
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
    titleAnimation: 'focus',
    background: 'from-yellow-900/30 to-orange-900/30'
  },
  {
    id: 22,
    title: "DUCTWORK TRANSFORMATION",
    subtitle: "After Spray Foam",
    description: "Professional spray foam encapsulation protects and insulates all ductwork...",
    image: "/images/attics/23-attic-ductwork-after-spray-foam.JPG",
    textAnimation: 'bounce',
    titleAnimation: 'blur',
    background: 'from-green-900/30 to-teal-900/30'
  },
  {
    id: 23,
    title: "CRUSHED DUCTS",
    subtitle: "Airflow Restriction",
    description: "Crushed ductwork restricts airflow and reduces HVAC system efficiency...",
    image: "/images/attics/24-attic-ductwork-crushed.JPG",
    textAnimation: 'split',
    titleAnimation: 'typewriter',
    background: 'from-purple-900/30 to-indigo-900/30'
  },
  {
    id: 24,
    title: "PROFESSIONAL ENCAPSULATION",
    subtitle: "Ductwork Protection",
    description: "Spray foam encapsulation provides thermal protection and structural support for ductwork...",
    image: "/images/attics/25-attic-spray-foam-ductwork-after.JPG",
    textAnimation: 'focus',
    titleAnimation: 'slide',
    background: 'from-emerald-900/30 to-green-900/30'
  },
  {
    id: 25,
    title: "SKYLIGHT SEALING",
    subtitle: "Light Well Treatment",
    description: "Skylights receive specialized spray foam treatment to eliminate thermal bridging...",
    image: "/images/attics/27-attic-spray-foam-skylight-after.JPG",
    textAnimation: 'blur',
    titleAnimation: 'explosion',
    background: 'from-cyan-900/30 to-blue-900/30'
  },
  {
    id: 26,
    title: "COMPLETE AIR BARRIER",
    subtitle: "Thermal Envelope Perfection",
    description: "Professional spray foam creates a continuous air barrier throughout the entire attic space...",
    image: "/images/attics/28-attic-spray-foam-airseal-air-barrier.JPG",
    textAnimation: 'typewriter',
    titleAnimation: 'bounce',
    background: 'from-lime-900/30 to-emerald-900/30'
  },
  {
    id: 27,
    title: "ANIMAL DAMAGE",
    subtitle: "Insulation Disturbed",
    description: "Animals can disturb and contaminate traditional insulation, reducing its effectiveness...",
    image: "/images/attics/29-attic-insulation-distrubed-animals.JPG",
    textAnimation: 'split',
    titleAnimation: 'focus',
    background: 'from-brown-900/30 to-orange-900/30'
  },
  {
    id: 28,
    title: "COMPLETE REMOVAL",
    subtitle: "Animals Destroy Insulation",
    description: "Severe animal damage requires complete insulation removal and replacement...",
    image: "/images/attics/30-attic-insulation-removed-by-animals.JPG",
    textAnimation: 'explosion',
    titleAnimation: 'blur',
    background: 'from-gray-900/30 to-slate-900/30'
  },
  {
    id: 29,
    title: "CELLULOSE RESTORATION",
    subtitle: "Traditional Insulation",
    description: "When appropriate, cellulose insulation provides effective thermal performance. Fresh cellulose insulation also deters pests while providing superior thermal resistance for year-round comfort.",
    image: "/images/attics/31-attic-cellulose-insulation-finished.JPG",
    textAnimation: 'slide',
    titleAnimation: 'typewriter',
    background: 'from-amber-900/30 to-yellow-900/30'
  },
  {
    id: 30,
    title: "YOUR TRANSFORMATION",
    subtitle: "Ready to Begin?",
    description: "Contact us today for your free attic assessment and discover how much you could save...",
    image: "/images/attics/10-attic-spray-foam-and-ventilation.JPG",
    textAnimation: 'bounce',
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
  const [isSnapping, setIsSnapping] = useState(false);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Navigation functions
  const goToNextSlide = () => {
    if (currentScene < storyScenes.length - 1) {
      const nextScene = currentScene + 1;
      setCurrentScene(nextScene);
      setBackgroundImage(storyScenes[nextScene].image);
      
      // Update scroll position to match the scene
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = (nextScene / (storyScenes.length - 1)) * scrollHeight;
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const goToPrevSlide = () => {
    if (currentScene > 0) {
      const prevScene = currentScene - 1;
      setCurrentScene(prevScene);
      setBackgroundImage(storyScenes[prevScene].image);
      
      // Update scroll position to match the scene
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = (prevScene / (storyScenes.length - 1)) * scrollHeight;
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const checkIsMobile = window.innerWidth <= 768;
    setIsMobile(checkIsMobile);
    let lastScrollTime = Date.now();
    
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      lastScrollTime = Date.now();
      
      // Don't update scenes while snapping
      if (isSnapping) return;
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(currentScroll / scrollHeight, 1);
      
      setScrollProgress(progress);
      
      // Calculate which scene should be active with even distribution
      const sceneIndex = Math.round(progress * (storyScenes.length - 1));
      const clampedIndex = Math.min(Math.max(sceneIndex, 0), storyScenes.length - 1);
      
      if (clampedIndex !== currentScene) {
        setCurrentScene(clampedIndex);
        setBackgroundImage(storyScenes[clampedIndex].image);
      }
      
      // On mobile, always snap to scene after scroll stops
      if (checkIsMobile) {
        if (snapTimeoutRef.current) {
          clearTimeout(snapTimeoutRef.current);
        }
        
        snapTimeoutRef.current = setTimeout(() => {
          // Only snap if enough time has passed since last scroll
          if (Date.now() - lastScrollTime >= 100) {
            snapToScene(clampedIndex);
          }
        }, 100);
      }
    };
    
    const snapToScene = (sceneIndex: number) => {
      if (isSnapping) return;
      
      setIsSnapping(true);
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = (sceneIndex / (storyScenes.length - 1)) * scrollHeight;
      
      // Temporarily disable user scrolling during snap
      setIsSnapping(true);
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        setIsSnapping(false);
      }, 800); // Longer timeout to ensure snap completes
    };

    // Initialize everything
    const initialize = () => {
      // Set appropriate height for 31 scenes with consistent 3-click transitions
      document.body.style.height = '1500vh';
      
      // Hide scrollbar visually but allow scrolling functionality
      document.body.style.scrollbarWidth = 'none'; // Firefox
      document.body.style.msOverflowStyle = 'none'; // IE/Edge
      
      // Add CSS to hide webkit scrollbars but maintain scroll functionality
      const styleId = 'story-scrollbar-hide';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          body::-webkit-scrollbar,
          html::-webkit-scrollbar {
            display: none;
            width: 0px;
            background: transparent;
          }
          body {
            -ms-overflow-style: none;
            scrollbar-width: none;
            overflow-y: scroll;
          }
          html {
            overflow-y: scroll;
          }
        `;
        document.head.appendChild(style);
      }
      
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
    
    // Add strict touch event support for mobile to prevent fast scrolling
    let touchStartY = 0;
    let touchEndY = 0;
    let isScrolling = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (checkIsMobile && !isSnapping) {
        touchStartY = e.touches[0].clientY;
        isScrolling = false;
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (checkIsMobile && !isSnapping) {
        touchEndY = e.touches[0].clientY;
        isScrolling = true;
      }
    };
    
    const handleTouchEnd = () => {
      if (checkIsMobile && !isSnapping && isScrolling) {
        const scrollDistance = Math.abs(touchStartY - touchEndY);
        
        // If user scrolled more than 50px, force snap to current scene
        if (scrollDistance > 50) {
          setTimeout(() => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const progress = Math.min(currentScroll / scrollHeight, 1);
            const sceneIndex = Math.round(progress * (storyScenes.length - 1));
            const clampedIndex = Math.min(Math.max(sceneIndex, 0), storyScenes.length - 1);
            
            snapToScene(clampedIndex);
          }, 50);
        }
        isScrolling = false;
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Keyboard navigation
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNextSlide();
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('keydown', handleKeyPress);
      
      // Restore normal scrolling behavior
      document.body.style.height = 'auto';
      document.body.style.touchAction = 'auto';
      document.documentElement.style.touchAction = 'auto';
      document.body.style.scrollbarWidth = 'auto';
      document.body.style.msOverflowStyle = 'auto';
      
      // Remove the custom scrollbar hiding styles
      const customStyle = document.getElementById('story-scrollbar-hide');
      if (customStyle) {
        customStyle.remove();
      }
      
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
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
          backgroundSize: currentScene === 0 ? 'cover' : (isMobile ? 'contain' : 'cover'),
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
      
      {/* Cold Climate Stamps for specific slides */}
      {(currentScene === 5 || currentScene === 6) && (
        <ColdClimateStamp 
          className="top-8 right-8 md:top-12 md:right-12" 
        />
      )}
      
      {/* Navigation Buttons - Only show for scenes other than first */}
      {currentScene !== 0 && (
        <>
          <div className="fixed inset-y-0 left-0 z-30 flex items-center">
            <motion.button
              onClick={goToPrevSlide}
              className="ml-4 p-3 md:p-4 rounded-full transition-all duration-300 bg-green-600/80 hover:bg-green-500 text-white shadow-lg hover:shadow-xl"
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} className="md:w-8 md:h-8" />
            </motion.button>
          </div>
          
          <div className="fixed inset-y-0 right-0 z-30 flex items-center">
            <motion.button
              onClick={goToNextSlide}
              disabled={currentScene === storyScenes.length - 1}
              className={`mr-4 p-3 md:p-4 rounded-full transition-all duration-300 ${
                currentScene === storyScenes.length - 1 
                  ? 'bg-gray-600/30 text-gray-400 cursor-not-allowed' 
                  : 'bg-green-600/80 hover:bg-green-500 text-white shadow-lg hover:shadow-xl'
              }`}
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: currentScene === storyScenes.length - 1 ? 'none' : '0 0 20px rgba(34, 197, 94, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              whileHover={currentScene < storyScenes.length - 1 ? { scale: 1.1 } : {}}
              whileTap={currentScene < storyScenes.length - 1 ? { scale: 0.95 } : {}}
            >
              <ChevronRight size={24} className="md:w-8 md:h-8" />
            </motion.button>
          </div>
        </>
      )}
      
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
              <div className="mb-8">
                <SimpleCinematicHighlightText
                  text={currentStoryScene.description}
                  type={currentStoryScene.textAnimation}
                  highlights={currentStoryScene.highlights}
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
              
              {/* Navigation arrows for first scene only */}
              <div className="flex justify-between items-center mb-8 px-8 max-w-4xl mx-auto">
                <motion.button
                  onClick={goToPrevSlide}
                  disabled={currentScene === 0}
                  className="p-3 md:p-4 rounded-full transition-all duration-300 bg-gray-600/30 text-gray-400 cursor-not-allowed"
                  style={{
                    backdropFilter: 'blur(10px)'
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  <ChevronLeft size={24} className="md:w-8 md:h-8" />
                </motion.button>
                
                <motion.button
                  onClick={goToNextSlide}
                  className="p-3 md:p-4 rounded-full transition-all duration-300 bg-green-600/80 hover:bg-green-500 text-white shadow-lg hover:shadow-xl"
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)'
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight size={24} className="md:w-8 md:h-8" />
                </motion.button>
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
                  <SimpleCinematicHighlightText
                    text={currentStoryScene.description}
                    type={currentStoryScene.textAnimation}
                    highlights={currentStoryScene.highlights}
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
        className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-30"
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