import React from "react";
import { 
  FaFigma, 
  FaGitAlt, 
  FaNodeJs, 
  FaMobileAlt, 
  FaServer, 
  FaDatabase 
} from 'react-icons/fa';

export interface FrontendSkill {
  name: string;
  percentage: string;
}

export const frontendSkills: FrontendSkill[] = [
  {
    name: "React.js",
    percentage: "95%"
  },
  {
    name: "TypeScript",
    percentage: "90%"
  },
  {
    name: "CSS/SASS",
    percentage: "85%"
  },
  {
    name: "Tailwind CSS",
    percentage: "92%"
  },
  {
    name: "Next.js",
    percentage: "88%"
  }
];

export interface OtherSkill {
  name: string;
  icon: React.ReactNode;
}

export const otherSkills: OtherSkill[] = [
  {
    name: "Figma",
    icon: React.createElement(FaFigma)
  },
  {
    name: "Git",
    icon: React.createElement(FaGitAlt)
  },
  {
    name: "MongoDB",
    icon: React.createElement(FaDatabase)
  },
  {
    name: "Node.js",
    icon: React.createElement(FaNodeJs)
  },
  {
    name: "React Native",
    icon: React.createElement(FaMobileAlt)
  },
  {
    name: "AWS",
    icon: React.createElement(FaServer)
  }
];
