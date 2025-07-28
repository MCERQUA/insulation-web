# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Home Performance Insulation website (`home-performance-insulation`) built with Astro 5.11.0, React 18, and Tailwind CSS. Features a 360° panoramic background with multiple viewer implementations, professional home performance/insulation industry theming, and comprehensive blog content focused on spray foam, air sealing, and energy efficiency.

## Development Commands

- `npm run dev` - Start development server (http://localhost:4321)
- `npm run build` - Build for production 
- `npm run preview` - Preview production build locally
- `npm start` - Alias for `npm run dev`

**No testing framework configured** - This is a production marketing website without test coverage.

## Architecture

### Tech Stack
- **Framework**: Astro (Static Site Generator) with React integration
- **Styling**: Tailwind CSS with custom home performance/insulation professional theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Netlify with configured headers and caching
- **Note**: Three.js dependencies are excluded in Vite config - panorama viewers use custom DOM manipulation

### Key Components

**360° Panorama Viewers** (`src/components/ui/`):
- `PanoramaViewer.tsx` - Main interactive viewer with mouse/touch controls
- `CSS360Viewer.tsx` - Pure CSS implementation
- `HorizontalPanorama.tsx` - Horizontal scrolling version
- `SimplePanoramaViewer.tsx` - Simplified implementation
- `MetalMenuBar.tsx` - Navigation component with tactical styling

**Page Sections** (`src/components/sections/`):
- `HeroSection.astro` - Landing hero with panorama background
- `CoverageSection.astro` - Why Choose Us/Benefits section
- `ServicesSection.astro` - Insulation service offerings (Spray Foam, Air Sealing, Home Performance)
- `ContactSection.astro` - Contact form for free estimates

**Layouts**:
- `BaseLayout.astro` - Main layout template with SEO meta tags
- `BlogPostLayout.astro` - Blog post layout with consistent styling

**Blog System** (`src/pages/blog/`):
- `index.astro` - Blog listing page
- Individual blog posts covering insulation, spray foam, air sealing, and home performance topics
- Utility functions in `src/utils/formatDate.ts` for date handling

### File Structure
```
src/
├── components/
│   ├── sections/     # Page sections (Astro components)
│   └── ui/           # Interactive UI components (React/TSX)
├── layouts/          # Page layouts (Base + Blog)
├── pages/            # Routes (index.astro, blog system, test pages)
│   └── blog/         # Blog posts and listing
├── styles/           # Global CSS
└── utils/            # Utility functions (date formatting)
```

## Custom Theme

Comprehensive home performance/insulation professional color palette defined in `tailwind.config.mjs`:
- Primary: `insulation-blue`, `thermal-green`, `efficiency-teal`
- Comfort colors: `comfort-gray`, `warm-orange`, `cool-blue`
- Professional: `professional-slate`, `deep-navy`, `clean-white`, `soft-gray`
- Specialty: `energy-yellow`, `foam-cream`
- Custom animations: `float`, `glow`, `slide-up`, `fade-in`

## Critical Dependencies

**Panorama Image**: Requires `public/images/RANGE-360.jpg` for 360° background functionality (should be replaced with insulation-appropriate panorama).

**Insulation Images**: Extensive collection of attic insulation photos available in `public/images/Attics/` folder for content use.

**Note**: README mentions Three.js but it's excluded in Vite config and not used - panorama viewers use custom DOM manipulation instead.

## Deployment

Configured for Netlify with `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Security headers and caching optimizations included
- No environment variables required

## Development Notes

- Multiple panorama viewer implementations suggest experimental development
- TypeScript support enabled
- Mobile-responsive design with touch interaction support
- Professional home performance/insulation industry styling and content
- Transformed from gun range insurance to home insulation focus
- Extensive real insulation project photos available for content