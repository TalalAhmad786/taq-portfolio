import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import MobileMenu from "@/components/MobileMenu";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  
  // Track scrolling position
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });
  
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
        className={`fixed top-0 left-0 w-full glass z-50 transition-all duration-300 ${
          isScrolled ? "py-2 backdrop-blur-md" : "py-4"
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold font-heading text-white flex items-center">
                <span className="text-primary">&lt;</span>
                John<span className="text-secondary">Smith</span>
                <span className="text-primary">/&gt;</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`text-white transition duration-300 ${link.hoverColor}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            {/* Theme Toggle (Desktop) */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="md:hidden p-2 rounded-lg bg-card hover:bg-card/80 transition duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </nav>
        </div>
      </motion.header>
      
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={links}
      />
    </>
  );
};

export default Header;
