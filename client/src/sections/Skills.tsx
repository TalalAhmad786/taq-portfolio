import { motion } from "framer-motion";
import { frontendSkills, otherSkills } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { useEffect, useRef } from "react";

const Skills = () => {
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressFill = entry.target as HTMLDivElement;
            const percentage = progressFill.getAttribute("data-percentage");
            if (percentage) {
              progressFill.style.width = percentage;
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    progressRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      progressRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-secondary opacity-10 blur-3xl animate-pulse" 
             style={{ animationDuration: "4s", animationDelay: "0.2s" }}></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold inline-block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            My Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary rounded-full mx-auto mt-4"></div>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            I've worked with a variety of technologies and tools throughout my career. Here's an overview of my technical skills and expertise.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center">
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
                className="text-secondary mr-3"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              Frontend Development
            </h3>
            
            <div className="space-y-6">
              {frontendSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-secondary">{skill.percentage}</span>
                  </div>
                  <div className="h-1.5 bg-card rounded-full">
                    <motion.div
                      ref={(el) => (progressRefs.current[index] = el)}
                      data-percentage={skill.percentage}
                      className="h-full rounded-full bg-gradient-to-r from-secondary to-primary"
                      style={{ width: "0%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center">
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
                className="text-primary mr-3"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
              Tools & Other Skills
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {otherSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center glass p-6 rounded-xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={
                    index % 3 === 0 
                      ? "text-3xl text-primary mb-3" 
                      : index % 3 === 1 
                      ? "text-3xl text-secondary mb-3" 
                      : "text-3xl text-accent mb-3"
                  }>
                    {skill.icon}
                  </div>
                  <span className="text-white text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-white">
            Certifications & Education
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index}
                className={`glass p-6 rounded-xl ${
                  index % 3 === 0 
                    ? "purple-glow" 
                    : index % 3 === 1 
                    ? "teal-glow" 
                    : "green-glow"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className={
                    index % 3 === 0 
                      ? "text-2xl text-primary mr-3" 
                      : index % 3 === 1 
                      ? "text-2xl text-secondary mr-3" 
                      : "text-2xl text-accent mr-3"
                  }>
                    {cert.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white">{cert.title}</h4>
                </div>
                <p className="text-muted-foreground mb-2">{cert.issuer}</p>
                <p className="text-sm text-secondary">{cert.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
