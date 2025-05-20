import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import MobileMenu from "@/components/MobileMenu";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  
  // Track scrolling position
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });
  
  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      
      sections.forEach((section) => {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop - 100;
        const sectionHeight = htmlSection.offsetHeight;
        const id = htmlSection.getAttribute("id");
        
        if (window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight && id) {
          setActiveSection(id);
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const links = [
    { href: "#home", label: "Home", hoverColor: "hover:text-primary" },
    { href: "#about", label: "About", hoverColor: "hover:text-secondary" },
    { href: "#projects", label: "Projects", hoverColor: "hover:text-accent" },
    { href: "#skills", label: "Skills", hoverColor: "hover:text-primary" },
    { href: "#contact", label: "Contact", hoverColor: "hover:text-secondary" }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-2" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-xl font-bold font-heading flex items-center gap-1 relative group">
                <span className="text-primary transition-transform duration-300 group-hover:rotate-[10deg]">&lt;</span>
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Talal
                </span>
                <span className="font-light text-secondary">Ahmad</span>
                <span className="text-primary transition-transform duration-300 group-hover:rotate-[-10deg]">/&gt;</span>
                
                {/* Underline effect */}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent group-hover:w-full transition-all duration-300"
                />
              </Link>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-md text-sm font-medium transition duration-300
                    ${activeSection === link.href.slice(1) 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.label}
                  {/* Active indicator */}
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-0 bg-muted rounded-md -z-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle (Desktop) */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              
              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMobileMenuToggle}
                className="md:hidden p-2 rounded-lg bg-muted hover:bg-muted/80 transition duration-300"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                  <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                  <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </div>
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>
      
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={links}
        activeSection={activeSection}
      />
    </>
  );
};

export default Header;
