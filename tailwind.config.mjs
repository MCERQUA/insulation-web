/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        // Home Performance & Insulation Professional Colors
        'insulation-blue': '#2563EB',    // Primary brand blue
        'thermal-green': '#059669',      // Energy efficiency green
        'comfort-gray': '#6B7280',       // Neutral comfort
        'efficiency-teal': '#0D9488',    // Performance accent
        'warm-orange': '#EA580C',        // Warmth/comfort
        'cool-blue': '#0EA5E9',          // Cooling/air sealing
        'energy-yellow': '#FBBF24',      // Energy savings
        'professional-slate': '#475569', // Professional dark
        'clean-white': '#F8FAFC',        // Clean, modern
        'soft-gray': '#E2E8F0',          // Subtle backgrounds
        'deep-navy': '#1E293B',          // Deep professional
        'foam-cream': '#FEF7ED',         // Spray foam color
        
        // Legacy compatibility colors
        'charcoal': '#1F2937',
        'midnight': '#0F172A',
        'forest-green': '#10B981',
        'slate-blue': '#475569',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(37, 99, 235, 0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
