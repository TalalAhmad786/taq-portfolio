import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  coverImage: string;
  clientName: string;
  clientIndustry: string;
  duration?: string;
  services: string[];
  challenge: string;
  solution: string;
  result: string;
  images?: string[];
  technologies: string[];
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  featured: boolean;
  publishDate: string;
}

interface ProjectsProps {
  onOpenProject: (index: number) => void;
}

const Projects = ({ onOpenProject }: ProjectsProps) => {
  // Fetch case studies with proper API request
  const { data: caseStudies, isLoading, error } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/case-studies");
      return res.json();
    }
  });

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-primary opacity-10 blur-3xl animate-pulse" 
             style={{ animationDuration: "4s", animationDelay: "0.8s" }}></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4"></div>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one has been carefully crafted to solve specific problems and demonstrate different skills.
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-destructive">
            <p>Error loading projects. Please try again later.</p>
          </div>
        ) : caseStudies && caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div 
                key={study.id}
                className={`rounded-xl overflow-hidden glass group ${
                  index % 3 === 0 
                    ? "purple-glow" 
                    : index % 3 === 1 
                    ? "teal-glow" 
                    : "green-glow"
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  rotateX: 5,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={study.coverImage} 
                    alt={study.title} 
                    className="w-full h-48 object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-70 transition duration-300 flex items-end justify-center pb-4">
                    <div className="flex space-x-3">
                      <motion.button 
                        className="p-2 rounded-full bg-primary text-white hover:bg-primary/80 transition duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onOpenProject(index)}
                        aria-label="Preview project"
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
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{study.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{study.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className={
                          techIndex % 3 === 0 
                            ? "px-2 py-1 bg-primary bg-opacity-20 rounded-full text-xs text-white" 
                            : techIndex % 3 === 1 
                            ? "px-2 py-1 bg-secondary bg-opacity-20 rounded-full text-xs text-white" 
                            : "px-2 py-1 bg-accent bg-opacity-20 rounded-full text-xs text-accent"
                        }
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-primary rounded-full font-medium text-white hover:opacity-90 transition duration-300 purple-glow"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-2"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            More Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
