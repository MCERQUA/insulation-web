"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import GlassSurface from "./GlassSurface";
import ContactModal from "./ContactModal";

export function FloatingPhoneButton() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Phone Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 300,
          delay: 1
        }}
      >
        <motion.button
          onClick={handleClick}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <GlassSurface
            width={64}
            height={64}
            borderRadius={32}
            brightness={85}
            opacity={0.9}
            blur={20}
            backgroundOpacity={0.15}
            saturation={1.3}
            className="flex items-center justify-center cursor-pointer"
          >
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Phone 
                size={28} 
                className="text-green-400 drop-shadow-lg"
                strokeWidth={2}
              />
              
              {/* Pulse ring animation */}
              <motion.div
                className="absolute inset-0 border-2 border-green-400/30 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              
              {/* Second pulse ring */}
              <motion.div
                className="absolute inset-0 border-2 border-green-300/20 rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.3
                }}
              />
            </motion.div>
          </GlassSurface>

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-green-400/20 blur-xl pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            Get Free Estimate
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ContactModal onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </>
  );
}

export default FloatingPhoneButton;