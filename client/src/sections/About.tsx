import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-accent opacity-10 blur-3xl animate-pulse" 
             style={{ animationDuration: "4s", animationDelay: "0.5s" }}></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold inline-block bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary rounded-full mx-auto mt-4"></div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            className="md:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass rounded-2xl overflow-hidden p-1 teal-glow">
              <img 
                src="https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&q=80&w=600&h=700" 
                alt="Developer workspace" 
                className="rounded-2xl object-cover w-full h-[450px]"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              Frontend Developer with <span className="text-primary">5+ years</span> of experience
            </h3>
            
            <p className="text-muted-foreground mb-6">
              I'm passionate about crafting beautiful, functional web experiences. My journey in web development began in 2018, and I've been obsessed with creating innovative solutions and pushing the boundaries of what's possible on the web ever since.
            </p>
            
            <p className="text-muted-foreground mb-6">
              I specialize in React, TypeScript, and modern frontend technologies, with a focus on performance optimization and accessibility. When I'm not coding, you can find me exploring new design trends, contributing to open source, or enjoying the outdoors.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-secondary"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Frontend Development</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-secondary"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>UI/UX Design</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-secondary"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Responsive Design</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-secondary"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Performance Optimization</span>
              </div>
            </div>
            
            <motion.a 
              href="#" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-secondary rounded-full font-medium text-white hover:opacity-90 transition duration-300 green-glow"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Resume
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-10 text-center text-white">
            My Professional Journey
          </h3>
          
          <div className="timeline-container relative py-10">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary"></div>
            
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:justify-between mb-16 relative`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10"></div>
                
                <div className="md:w-5/12 mb-6 md:mb-0 md:text-right md:pr-8">
                  <div className="glass p-6 rounded-xl inline-block">
                    <h4 className="text-xl font-bold text-primary mb-2">{item.title}</h4>
                    <p className="text-muted-foreground mb-2">{item.company}</p>
                    <p className="text-sm text-secondary">{item.period}</p>
                  </div>
                </div>
                <div className="md:w-5/12 md:pl-8">
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
