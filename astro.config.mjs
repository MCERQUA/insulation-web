import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://homeperformanceinsulation.com',
  integrations: [react(), tailwind()],
  vite: {
    optimizeDeps: {
      exclude: ['@react-three/fiber', '@react-three/drei', 'three']
    }
  }
});
