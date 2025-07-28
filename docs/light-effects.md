# Light Effects Implementation

This document explains how the WebGL light effects are implemented in the insulation website.

## Overview

The site uses a WebGL-based LightRays component that creates realistic spotlight effects emanating from the top-center of the screen, creating a dramatic theatrical lighting effect over the hero section background.

## Dependencies

```bash
npm install ogl
```

The `ogl` library is a minimal WebGL library that provides the necessary WebGL primitives (Renderer, Program, Triangle, Mesh) for creating the light ray effects.

## Components

### LightRays Component (`src/components/ui/LightRays.tsx`)

This is the main WebGL component that renders the light effects using shader programs.

**Key Features:**
- WebGL-based rendering using fragment shaders
- Real-time animation with noise and distortion
- Configurable light properties (color, speed, spread, etc.)
- Intersection observer for performance optimization
- Proper cleanup to prevent memory leaks

**Props:**
- `raysOrigin`: Origin point for the light rays (default: "top-center")
- `raysColor`: Hex color of the light rays (default: "#ffffff")
- `raysSpeed`: Animation speed multiplier (default: 1)
- `lightSpread`: How wide the light cone spreads (higher = wider)
- `rayLength`: How far the rays extend (higher = longer)
- `followMouse`: Whether rays follow mouse movement
- `mouseInfluence`: Strength of mouse influence (0-1)
- `noiseAmount`: Amount of noise/grain in the effect
- `distortion`: Amount of ray distortion/waviness
- `fadeDistance`: How quickly rays fade with distance
- `saturation`: Color saturation level

### CSS Styling (`src/components/ui/LightRays.css`)

```css
.light-rays-container {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: none;
  z-index: 3;
  overflow: hidden;
}
```

## Implementation

### Hero Section Implementation

In `src/components/sections/HeroSection.astro`:

```astro
<!-- Main spotlight cone from top-center illuminating entire screen -->
<div style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; pointer-events: none; z-index: 1;">
  <LightRays 
    raysOrigin="top-center"
    raysColor="#fff8e1"
    raysSpeed={1.2}
    lightSpread={2.5}
    rayLength={3.0}
    followMouse={false}
    mouseInfluence={0.0}
    noiseAmount={0.05}
    distortion={0.02}
    fadeDistance={2.0}
    saturation={1.2}
    className="main-spotlight"
    client:load
  />
</div>
```

**Key Settings Explained:**
- `lightSpread={2.5}`: Creates a wide cone shape like a theatrical spotlight
- `rayLength={3.0}`: Extends the light rays down the full screen height
- `raysColor="#fff8e1"`: Warm white/cream color that complements the insulation theme
- `fadeDistance={2.0}`: Gradual fade from bright center to darker edges
- `followMouse={false}`: Static spotlight that doesn't move with cursor
- `noiseAmount={0.05}`: Subtle grain for realistic light texture

### Container Styling

The container uses absolute positioning to overlay the entire hero section:

```css
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
pointer-events: none;
z-index: 1;
```

This ensures the light effect:
- Covers the entire hero section
- Doesn't interfere with user interactions
- Appears behind the content but above the background image

## WebGL Shader Details

The component uses custom fragment shaders to create the light ray effect:

1. **Ray Strength Calculation**: Uses distance and angle from origin to determine light intensity
2. **Noise Generation**: Adds realistic grain and texture to the light
3. **Distortion Effects**: Creates subtle waviness in the light rays
4. **Color Gradients**: Applies brightness falloff from center to edges
5. **Animation**: Time-based animation for subtle movement and pulsing

## Performance Considerations

- **Intersection Observer**: Only renders when the component is visible
- **Device Pixel Ratio**: Limits DPR to 2 for performance on high-DPI screens
- **Proper Cleanup**: Releases WebGL contexts and cancels animation frames
- **Error Handling**: Graceful fallback if WebGL fails

## Usage Tips

1. **Container Requirements**: Must be wrapped in a positioned container with defined dimensions
2. **Z-Index Management**: Set appropriate z-index to layer correctly with other elements
3. **Performance**: Use `client:load` directive in Astro for proper hydration
4. **Mobile Compatibility**: The effect works on mobile devices with WebGL support

## Troubleshooting

- **No Effect Visible**: Check that the container has proper dimensions and positioning
- **Performance Issues**: Reduce `rayLength`, `lightSpread`, or `noiseAmount`
- **WebGL Errors**: Component includes fallback handling for WebGL failures
- **Memory Leaks**: Component properly cleans up resources when unmounted

## Example Configurations

### Subtle Background Effect
```jsx
<LightRays
  raysOrigin="top-center"
  raysColor="#ffffff"
  raysSpeed={0.8}
  lightSpread={1.5}
  rayLength={2.0}
  noiseAmount={0.02}
  distortion={0.01}
/>
```

### Dramatic Spotlight
```jsx
<LightRays
  raysOrigin="top-center"
  raysColor="#fff8e1"
  raysSpeed={1.2}
  lightSpread={2.5}
  rayLength={3.0}
  noiseAmount={0.05}
  distortion={0.02}
/>
```

### Interactive Effect
```jsx
<LightRays
  raysOrigin="top-center"
  raysColor="#00ffff"
  followMouse={true}
  mouseInfluence={0.1}
  lightSpread={0.8}
  rayLength={1.2}
/>
```