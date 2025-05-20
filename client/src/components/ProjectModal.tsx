import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
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

interface ProjectModalProps {
  selectedProject: number | null;
  onClose: () => void;
}

const ProjectModal = ({ selectedProject, onClose }: ProjectModalProps) => {
  // Fetch case studies with proper API request
  const { data: caseStudies } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/case-studies");
      return res.json();
    }
  });
  
  const project = selectedProject !== null && caseStudies ? caseStudies[selectedProject] : null;
  
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
              src={project.coverImage} 
              alt={project.title} 
              className="w-full h-auto rounded-lg mb-4"
            />
            
            <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
            <p className="text-muted-foreground mb-6">{project.description}</p>
            
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3 text-secondary">Project Overview</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-muted-foreground mb-2">
                    <span className="text-white font-medium">Client:</span> {project.clientName}
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <span className="text-white font-medium">Industry:</span> {project.clientIndustry}
                  </p>
                  {project.duration && (
                    <p className="text-muted-foreground">
                      <span className="text-white font-medium">Duration:</span> {project.duration}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-white font-medium mb-2">Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-secondary bg-opacity-20 rounded-full text-xs text-secondary"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-secondary">Challenge</h4>
                <p className="text-muted-foreground">{project.challenge}</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-secondary">Solution</h4>
                <p className="text-muted-foreground">{project.solution}</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-secondary">Results</h4>
                <p className="text-muted-foreground">{project.result}</p>
              </div>
            </div>

            {project.testimonial && (
              <div className="glass p-6 rounded-xl mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-primary mb-4 opacity-50"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-lg text-white italic mb-4">{project.testimonial}</blockquote>
                <div>
                  <p className="text-primary font-medium">{project.testimonialAuthor}</p>
                  {project.testimonialRole && (
                    <p className="text-muted-foreground text-sm">{project.testimonialRole}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
