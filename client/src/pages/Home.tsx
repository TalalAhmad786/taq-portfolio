import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import Particles from "@/components/Particles";
import { useState } from "react";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  return (
    <main>
      <Particles />
      
      <Hero />
      <About />
      <Projects onOpenProject={setSelectedProject} />
      <Skills />
      <Contact />
      <Footer />
      
      <ProjectModal 
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
