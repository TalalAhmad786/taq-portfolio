export interface TimelineItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

export const timeline: TimelineItem[] = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    period: "2022 - Present",
    description: "Led a team of 5 developers to build responsive, accessible web applications. Improved performance by 40% through code optimization and modern techniques."
  },
  {
    title: "Frontend Developer",
    company: "WebSolutions",
    period: "2019 - 2022",
    description: "Developed and maintained client websites and web applications. Collaborated with designers to implement responsive, pixel-perfect interfaces."
  },
  {
    title: "Web Design Intern",
    company: "DesignLab",
    period: "2018 - 2019",
    description: "Assisted senior designers in creating website mockups and implementing them with HTML, CSS, and JavaScript. Gained experience in responsive design principles."
  }
];
