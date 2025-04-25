export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  overview: string;
  features: string[];
  liveUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    title: "E-commerce Application",
    description: "A fully responsive e-commerce platform built with React, Redux, and Stripe integration.",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800&h=450",
    technologies: ["React", "Redux", "Tailwind CSS", "Stripe", "Firebase"],
    overview: "This e-commerce platform provides a complete shopping experience with product browsing, cart management, secure checkout, and user account features. The application is built with performance and accessibility in mind.",
    features: [
      "Responsive product catalog with filtering and search",
      "User authentication with social login options",
      "Secure checkout process with Stripe integration",
      "Order history and tracking",
      "Admin dashboard for product and order management",
      "Performance optimization with lazy loading and code splitting"
    ],
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/username/ecommerce-app"
  },
  {
    title: "Task Management App",
    description: "A drag-and-drop task manager with team collaboration features and real-time updates.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800&h=450",
    technologies: ["React", "Firebase", "DnD", "Framer Motion"],
    overview: "This task management application helps teams organize and track their work with an intuitive drag-and-drop interface. It features real-time updates, task assignments, due dates, and progress tracking.",
    features: [
      "Drag-and-drop kanban board interface",
      "Real-time collaboration and updates",
      "Task filtering and sorting options",
      "User roles and permissions",
      "Email notifications for task assignments and updates",
      "Dark and light theme options"
    ],
    liveUrl: "https://example.com/taskmanager",
    githubUrl: "https://github.com/username/task-manager"
  },
  {
    title: "Fitness Tracker",
    description: "A mobile-first fitness app with workout planning, progress tracking, and data visualization.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800&h=450",
    technologies: ["React Native", "GraphQL", "D3.js", "Auth0"],
    overview: "This fitness tracking application helps users monitor their workout routines, set goals, and visualize their progress over time. It includes customizable workout plans and nutrition tracking.",
    features: [
      "Personalized workout routines and plans",
      "Progress tracking with visual charts and graphs",
      "Calorie and nutrition monitoring",
      "Integration with fitness devices and wearables",
      "Social sharing and community challenges",
      "Workout reminders and streaks"
    ],
    liveUrl: "https://example.com/fitnesstracker",
    githubUrl: "https://github.com/username/fitness-tracker"
  }
];
