import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CursorConfig {
  dotSize: number;
  ringSize: number;
  dotColor: string;
  ringColor: string;
  speed: number;
  magneticForce: number;
}

const defaultConfig: CursorConfig = {
  dotSize: 8,
  ringSize: 40,
  dotColor: 'hsl(var(--primary))',
  ringColor: 'hsl(var(--primary))',
  speed: 1,
  magneticForce: 0.5,
};

export default function CustomCursor({ config = defaultConfig }: { config?: Partial<CursorConfig> }) {
  const cursorConfig = { ...defaultConfig, ...config };
  const [isVisible, setIsVisible] = useState(false);
  const [isPointing, setIsPointing] = useState(false);
  const [magneticElement, setMagneticElement] = useState<HTMLElement | null>(null);
  
  // Cursor position with spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configuration for smooth movement
  const springConfig = { damping: 25, stiffness: 700 * cursorConfig.speed };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  
  // Slower spring for the ring
  const ringSpringConfig = { damping: 15, stiffness: 200 * cursorConfig.speed };
  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    // Check if device has hover capability
    if (window.matchMedia('(hover: hover)').matches) {
      setIsVisible(true);
      
      const moveCursor = (e: MouseEvent) => {
        if (magneticElement) {
          const rect = magneticElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Calculate magnetic pull
          const deltaX = centerX - e.clientX;
          const deltaY = centerY - e.clientY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const maxDistance = 100; // Maximum distance for magnetic effect
          
          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * cursorConfig.magneticForce;
            cursorX.set(e.clientX + deltaX * force);
            cursorY.set(e.clientY + deltaY * force);
            return;
          }
        }
        
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };

      const handlePointerElements = () => {
        const interactiveElements = document.querySelectorAll(
          'a, button, [role="button"], input, select, textarea'
        );
        
        const handlePointerEnter = (e: Event) => {
          setIsPointing(true);
          setMagneticElement(e.currentTarget as HTMLElement);
        };
        
        const handlePointerLeave = () => {
          setIsPointing(false);
          setMagneticElement(null);
        };

        interactiveElements.forEach(element => {
          element.addEventListener('mouseenter', handlePointerEnter);
          element.addEventListener('mouseleave', handlePointerLeave);
        });

        return () => {
          interactiveElements.forEach(element => {
            element.removeEventListener('mouseenter', handlePointerEnter);
            element.removeEventListener('mouseleave', handlePointerLeave);
          });
        };
      };

      window.addEventListener('mousemove', moveCursor);
      const cleanup = handlePointerElements();
      
      // Hide cursor when leaving the window
      const handleMouseLeave = () => setIsVisible(false);
      const handleMouseEnter = () => setIsVisible(true);
      
      document.documentElement.addEventListener('mouseleave', handleMouseLeave);
      document.documentElement.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        cleanup();
        document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, [cursorX, cursorY, magneticElement, cursorConfig.magneticForce]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}      <motion.div
        className="fixed pointer-events-none z-[99999] rounded-full mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          width: cursorConfig.dotSize,
          height: cursorConfig.dotSize,
          backgroundColor: cursorConfig.dotColor,
          opacity: isPointing ? 0.5 : 0.8,
          scale: isPointing ? 1.2 : 1,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isPointing ? 0.5 : 0.8, scale: isPointing ? 1.2 : 1 }}
        transition={{
          scale: { type: "spring", damping: 20, stiffness: 300 },
          opacity: { duration: 0.2 },
        }}
      />

      {/* Cursor ring */}      <motion.div
        className="fixed pointer-events-none z-[99998] rounded-full mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: cursorConfig.ringSize,
          height: cursorConfig.ringSize,
          border: `2px solid ${cursorConfig.ringColor}`,
          translateX: -cursorConfig.ringSize / 2,
          translateY: -cursorConfig.ringSize / 2,
          opacity: isPointing ? 0.4 : 0.15,
          scale: isPointing ? 1.4 : 1,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isPointing ? 0.4 : 0.15, scale: isPointing ? 1.4 : 1 }}
        transition={{
          scale: { type: "spring", damping: 15, stiffness: 150 },
          opacity: { duration: 0.3 },
        }}
      />
    </>
  );
}
