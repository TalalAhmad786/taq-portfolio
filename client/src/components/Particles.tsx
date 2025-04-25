import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }
    };
    
    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
      
      // Generate random particles
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1;
        const colors = ["hsla(266, 100%, 67%, 0.4)", "hsla(180, 100%, 38%, 0.4)", "hsla(156, 95%, 42%, 0.4)"];
        
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.5 + 0.1
        });
      }
    };
    
    const drawParticles = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Move the particle
        particle.y -= particle.speed;
        
        // If the particle is off-screen, reset it
        if (particle.y < -particle.size) {
          particle.y = canvas.height + particle.size;
          particle.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameId.current = requestAnimationFrame(drawParticles);
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawParticles();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};

export default Particles;
