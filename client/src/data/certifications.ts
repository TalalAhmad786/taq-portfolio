import React from "react";
import { FaCertificate, FaGraduationCap, FaAward } from "react-icons/fa";

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  icon: React.ReactNode;
}

export const certifications: Certification[] = [
  {
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2022",
    icon: React.createElement(FaCertificate)
  },
  {
    title: "BSc Computer Science",
    issuer: "University of Technology",
    date: "2014 - 2018",
    icon: React.createElement(FaGraduationCap)
  },
  {
    title: "Full-Stack Developer",
    issuer: "CodeCamp Bootcamp",
    date: "2018",
    icon: React.createElement(FaAward)
  }
];
