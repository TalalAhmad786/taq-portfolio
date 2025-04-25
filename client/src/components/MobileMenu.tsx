import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

interface Link {
  href: string;
  label: string;
  hoverColor: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Link[];
}

const MobileMenu = ({ isOpen, onClose, links }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 md:hidden"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-64 glass py-20 px-6 z-50 md:hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-card hover:bg-card/80 transition duration-300"
              aria-label="Close menu"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            <div className="flex flex-col space-y-6">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`text-white transition duration-300 ${link.hoverColor}`}
                  onClick={onClose}
                >
                  {link.label}
                </a>
              ))}
              
              <div className="pt-4 flex items-center space-x-2">
                <ThemeToggle />
                <span className="text-white">Toggle Theme</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
