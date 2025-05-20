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
  activeSection: string;
}

const MobileMenu = ({ isOpen, onClose, links, activeSection }: MobileMenuProps) => {
  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: { 
      x: "100%", 
      opacity: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  };

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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-72 bg-background/95 backdrop-blur-sm border-l border-border z-50 md:hidden py-20 px-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition duration-300"
              aria-label="Close menu"
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
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
              </motion.div>
            </button>
            
            <nav className="flex flex-col space-y-1">
              {links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  variants={itemVariants}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition duration-300
                    ${activeSection === link.href.slice(1)
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  onClick={onClose}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            
            <motion.div
              variants={itemVariants}
              className="absolute bottom-8 left-0 w-full px-6"
            >
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <span className="text-sm font-medium text-muted-foreground">
                  Switch Theme
                </span>
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
