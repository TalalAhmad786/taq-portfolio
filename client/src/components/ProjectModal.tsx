import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

interface ProjectModalProps {
  selectedProject: number | null;
  onClose: () => void;
}

const ProjectModal = ({ selectedProject, onClose }: ProjectModalProps) => {
  const project = selectedProject !== null ? projects[selectedProject] : null;
  
  if (!project) return null;
  
  return (
    <Dialog open={selectedProject !== null} onOpenChange={() => onClose()}>
      <DialogContent className="glass rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-0 purple-glow">
        <div className="p-6 relative">
          <DialogClose className="absolute top-6 right-6 p-2 rounded-full bg-card hover:bg-card/80 transition duration-300">
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </DialogClose>
          
          <div className="mb-6">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-auto rounded-lg mb-4"
            />
            
            <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
            <p className="text-muted-foreground mb-6">{project.description}</p>
            
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3 text-secondary">Project Overview</h4>
              <p className="text-muted-foreground mb-4">
                {project.overview}
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3 text-secondary">Technologies Used</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className={
                      index % 3 === 0 
                        ? "px-3 py-1 bg-primary bg-opacity-20 rounded-full text-sm text-primary" 
                        : index % 3 === 1 
                        ? "px-3 py-1 bg-secondary bg-opacity-20 rounded-full text-sm text-secondary" 
                        : "px-3 py-1 bg-accent bg-opacity-20 rounded-full text-sm text-accent"
                    }
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3 text-secondary">Key Features</h4>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white hover:opacity-90 transition duration-300"
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
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Live Demo
              </motion.a>
              <motion.a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-primary rounded-full font-medium text-white hover:bg-primary/10 transition duration-300"
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
                View Code
              </motion.a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
