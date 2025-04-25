import { useState, useEffect } from "react";

interface UseScrollActiveProps {
  sectionIds: string[];
  offset?: number;
}

export const useScrollActive = ({ sectionIds, offset = 100 }: UseScrollActiveProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        
        if (!element) continue;
        
        const top = element.offsetTop;
        const height = element.offsetHeight;
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offset]);
  
  return { activeSection };
};
