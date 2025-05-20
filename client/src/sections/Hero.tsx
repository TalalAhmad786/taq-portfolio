import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const typingTextRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Fade out the scroll button based on scroll
  const scrollButtonOpacity = useTransform(
    scrollYProgress,
    [0, 0.05],
    [1, 0]
  );
  
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // Typing effect animation
  useEffect(() => {
    if (!typingTextRef.current) return;
    
    const text = "A";
    const typingSpeed = 100; // ms per character
    
    let charIndex = 0;
    const typingElement = typingTextRef.current;
    typingElement.textContent = "";
    
    const typeText = () => {
      if (charIndex < text.length && typingElement) {
        typingElement.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
      }
    };
    
    // Start typing after a delay
    setTimeout(typeText, 1000);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary opacity-10 blur-3xl animate-pulse" 
             style={{ animationDuration: "4s" }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary opacity-10 blur-3xl animate-pulse" 
             style={{ animationDuration: "4s", animationDelay: "1s" }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-12 z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg md:text-xl text-secondary mb-4">Hello, I'm</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Talal Ahmad
            </h1>
            
            <div className="mb-8">
              <p 
                ref={typingTextRef}
                className="text-xl md:text-2xl text-primary overflow-hidden whitespace-nowrap border-r-4 border-white animate-[blink_0.75s_step-end_infinite]"
              >
                A Full Stack Developer
              </p>
            </div>
            
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              I build exceptional digital experiences that are fast, accessible, and visually appealing. Let's work together to bring your ideas to life.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.a 
                href="#contact" 
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white hover:opacity-90 transition duration-300 purple-glow"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
              <motion.a 
                href="#projects" 
                className="px-6 py-3 border border-secondary rounded-full font-medium text-white hover:bg-secondary/10 transition duration-300"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
            </div>
            
            <div className="flex justify-center md:justify-start space-x-6 mt-8">
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-secondary transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </motion.a>
              <motion.a 
                href="https://codepen.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075-.003-.018-.015-.034-.02-.05l-.035-.067-.03-.05-.044-.06-.046-.045-.06-.045-.046-.03-.06-.044-.044-.04-.015-.02L12.58.19c-.347-.232-.796-.232-1.142 0L.453 7.502l-.015.015-.044.035-.06.05-.038.04-.05.056-.037.045-.05.06c-.02.017-.03.03-.03.046l-.05.06-.02.06c-.02.01-.02.04-.03.07l-.01.05C0 8.12 0 8.15 0 8.18v7.497c0 .044.003.09.01.135l.01.046c.005.03.01.06.02.086l.015.05c.01.027.016.053.027.075l.022.05c0 .01.015.04.03.06l.03.04c.015.01.03.04.045.06l.03.04.04.04c.01.013.01.03.03.03l.06.042.04.03.01.014 10.97 7.33c.164.12.375.163.57.163s.39-.06.57-.18l10.99-7.28.014-.01.046-.037.06-.043.048-.036.052-.058.033-.045.04-.06.03-.05.03-.07.016-.052.03-.077.015-.045.03-.08v-7.5c0-.05 0-.095-.016-.14l-.014-.045.044.003zm-11.99 6.28l-3.65-2.44 3.65-2.442 3.65 2.44-3.65 2.44zm-1.034-6.674l-4.473 2.99L2.89 8.362l8.086-5.39V7.79zm-6.33 4.233l-2.582 1.73V10.3l2.582 1.726zm1.857 1.25l4.473 2.99v4.82L2.89 15.69l3.618-2.417v-.004zm6.537 2.99l4.474-2.98 3.613 2.42-8.087 5.39v-4.82zm6.33-4.23l2.583-1.72v3.456l-2.583-1.73zm-1.855-1.24L13.042 7.8V2.97l8.085 5.39-3.612 2.415v.003z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80"
              animate={{ y: [0, -15, 0] }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                repeatType: "reverse", 
                ease: "easeInOut" 
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl"></div>
              <img 
                src="https://iili.io/3VIUMue.jpg" 
                alt="Talal Ahmad" 
                className="w-full h-full object-cover rounded-full border-4 border-primary/50"
              />
              
              <motion.div 
                className="absolute -top-4 -right-4 bg-card p-3 rounded-full purple-glow"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary text-2xl"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-card p-3 rounded-full teal-glow"
                animate={{ rotate: [0, -10, 0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-secondary text-2xl"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Down Button */}
      <motion.div 
        style={{ opacity: scrollButtonOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div 
          className="flex flex-col items-center gap-2"
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.p 
            className="text-sm font-medium bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 2.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Explore More
          </motion.p>
          
          <motion.button
            onClick={scrollToAbout}
            className="group relative flex flex-col items-center justify-start overflow-hidden w-8 h-14 rounded-full border-2 border-primary/50 hover:border-secondary/50 bg-background/50 backdrop-blur-sm transition-colors duration-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated dot */}
            <motion.div
              className="w-1.5 h-1.5 my-2 rounded-full bg-gradient-to-r from-primary to-secondary"
              animate={{
                y: [0, 24, 0],
                scale: [1, 0.8, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Mouse wheel effect */}
            <motion.div
              className="absolute top-[6px] left-1/2 w-4 h-4 -translate-x-1/2 border-t-2 border-primary/50 rounded-full"
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Glow effects */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(139, 92, 246, 0)",
                  "0 0 20px 3px rgba(139, 92, 246, 0.3)",
                  "0 0 0 0 rgba(139, 92, 246, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        </motion.div>
        
        {/* Scroll path indication */}
        <motion.div 
          className="absolute -z-10 w-px h-24 bottom-0 bg-gradient-to-b from-primary/20 via-secondary/20 to-transparent"
          animate={{
            scaleY: [0.3, 1, 0.3],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
