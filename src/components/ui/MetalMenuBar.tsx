"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Home, Thermometer, Zap, FileText, Phone } from "lucide-react";
import GlassSurface from "./GlassSurface";
import LightRays from "./LightRays";
import "./GlassSurface.css";

interface NavItem {
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

interface MetalMenuBarProps {
  items?: NavItem[];
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Services', url: '#services', icon: Thermometer },
  { name: 'Benefits', url: '#benefits', icon: Zap },
  { name: 'Blog', url: '/blog', icon: FileText },
  { name: 'Contact', url: '#contact', icon: Phone }
];

export function MetalMenuBar({ items = defaultNavItems, className }: MetalMenuBarProps) {
  const [activeTab, setActiveTab] = React.useState(items[0].name);

  // Determine active tab based on current URL
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    
    // Find matching nav item based on current path
    let activeItem = items[0].name; // Default to first item
    
    if (currentPath === '/') {
      activeItem = 'Home';
    } else if (currentPath.startsWith('/blog')) {
      activeItem = 'Blog';
    } else {
      // Check if current path matches any nav item URL
      const matchingItem = items.find(item => {
        if (item.url.startsWith('#')) {
          // For hash links, check if we're on home page
          return currentPath === '/' && window.location.hash === item.url;
        }
        return currentPath === item.url || currentPath.startsWith(item.url + '/');
      });
      
      if (matchingItem) {
        activeItem = matchingItem.name;
      }
    }
    
    setActiveTab(activeItem);
  }, [items]);

  const handleNavClick = (itemName: string) => {
    setActiveTab(itemName);
  };

  const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

  return (
    <div className={cn("fixed top-6 left-1/2 -translate-x-1/2 z-50", className)}>
      {/* Spotlight beam effect behind menu */}
      <div className="absolute inset-0 w-full h-32 -top-16 pointer-events-none z-0">
        <LightRays 
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={0.8}
          followMouse={false}
          noiseAmount={0.05}
          distortion={0.02}
          fadeDistance={0.6}
          saturation={0.9}
          pulsating={false}
        />
      </div>
      
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 18,
          stiffness: 250,
          staggerChildren: 0.07,
          delayChildren: 0.2,
        }}
        className="relative z-10"
      >
        <GlassSurface
          width="auto"
          height={48}
          borderRadius={24}
          brightness={80}
          opacity={0.85}
          blur={15}
          backgroundOpacity={0.1}
          saturation={1.2}
          className="px-4"
        >
          {/* Navigation Items */}
          <motion.div
            className="flex items-center gap-1 sm:gap-2 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
          {items.map((item) => {
            const isActive = activeTab === item.name;

            return (
              <motion.a
                key={item.name}
                href={item.url}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                onClick={(e) => {
                  handleNavClick(item.name);
                }}
                className={cn(
                  "relative cursor-pointer text-sm font-medium px-3 py-2 rounded-full transition-all duration-300",
                  "text-white/90 hover:text-white",
                  "hover:bg-white/10 hover:backdrop-blur-sm",
                  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.1)]",
                  isActive && "bg-white/15 text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                )}
              >
                {/* Always show text */}
                <span className="relative z-10">{item.name}</span>
                
                {/* Active indicator with target red theme */}
                {isActive && (
                  <motion.div
                    layoutId="metalIndicator"
                    className="absolute inset-0 w-full rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.15) 0%, 
                        rgba(230, 243, 255, 0.1) 50%, 
                        rgba(255, 255, 255, 0.15) 100%)`,
                      boxShadow: `
                        inset 0 1px 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.1),
                        0 0 15px rgba(255, 255, 255, 0.2)
                      `
                    }}
                  >
                    {/* Top LED-style highlight */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-80">
                      <div className="absolute w-12 h-6 bg-white/10 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-sm -top-1" />
                      <div className="absolute w-4 h-4 bg-white/30 rounded-full blur-sm top-0 left-2" />
                      {/* Light blue LED glow */}
                      <div className="absolute w-10 h-8 bg-blue-100/20 rounded-full blur-lg -top-3 -left-1" />
                    </div>
                  </motion.div>
                )}
              </motion.a>
            );
            })}
          </motion.div>
        </GlassSurface>

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(255, 255, 255, 0)",
              "0 0 0 2px rgba(255, 255, 255, 0.1)",
              "0 0 0 0 rgba(255, 255, 255, 0)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.nav>
    </div>
  );
}

export default MetalMenuBar;
