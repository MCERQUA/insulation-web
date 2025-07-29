import { motion } from 'framer-motion';

interface ColdClimateStampProps {
  className?: string;
}

const ColdClimateStamp: React.FC<ColdClimateStampProps> = ({ 
  className = '' 
}) => {
  return (
    <motion.div 
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: -12 }}
      transition={{ 
        delay: 1, 
        duration: 0.8, 
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      style={{
        zIndex: 40
      }}
    >
      <div className="relative">
        {/* Main stamp circle */}
        <div 
          className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-red-600 bg-red-500/20 backdrop-blur-sm flex items-center justify-center"
          style={{
            boxShadow: `
              0 0 0 2px rgba(220, 38, 38, 0.8),
              0 0 20px rgba(220, 38, 38, 0.6),
              0 4px 15px rgba(0, 0, 0, 0.4)
            `,
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
          }}
        >
          <div className="text-center">
            <div className="text-red-100 font-black text-sm md:text-base leading-tight tracking-wide">
              COLD
            </div>
            <div className="text-red-100 font-black text-sm md:text-base leading-tight tracking-wide">
              CLIMATES
            </div>
          </div>
        </div>
        
        {/* Inner decorative ring */}
        <div 
          className="absolute inset-2 rounded-full border-2 border-red-400/60"
          style={{
            boxShadow: 'inset 0 0 10px rgba(220, 38, 38, 0.3)'
          }}
        />
        
        {/* Outer glow effect */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.2) 0%, transparent 70%)',
            filter: 'blur(4px)',
            zIndex: -1
          }}
        />
      </div>
    </motion.div>
  );
};

export default ColdClimateStamp;