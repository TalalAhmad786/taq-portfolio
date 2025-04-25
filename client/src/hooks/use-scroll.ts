import { useState, useEffect } from "react";

interface UseScrollReturn {
  scrollY: number;
  scrollX: number;
  scrollDirection: "up" | "down" | null;
}

export const useScroll = (): UseScrollReturn => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;
    
    setScrollY(currentScrollY);
    setScrollX(currentScrollX);
    
    if (currentScrollY > lastScrollY) {
      setScrollDirection("down");
    } else if (currentScrollY < lastScrollY) {
      setScrollDirection("up");
    }
    
    setLastScrollY(currentScrollY);
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  
  return { scrollY, scrollX, scrollDirection };
};
