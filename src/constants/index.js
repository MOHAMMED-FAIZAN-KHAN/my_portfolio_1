import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

// Navbar links; the id must match the section id used by SectionWrapper.
// To add a new navbar link, add a new object here and create a matching section id.
export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

// Service cards shown in the About section.
// Edit these titles/icons to show your main skills or services.
const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Learner",
    icon: creator,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "vibe coder",
    icon: creator,
  },
];

// Technology icons shown as 3D balls in the Tech section.
// Add or remove technologies here to change the Skills section.
// "score" is 0-100: represents your proficiency level shown on the speedometer.
// Change these values to match your actual skill levels!
const technologies = [
  {
    name: "HTML 5",
    icon: html,
    score: 70,  // Change this to your proficiency level (0-100)
  },
  {
    name: "CSS 3",
    icon: css,
    score: 50,  // Change this to your proficiency level (0-100)
  },
  {
    name: "JavaScript",
    icon: javascript,
    score: 10,  // Change this to your proficiency level (0-100)
  },
  {
    name: "TypeScript",
    icon: typescript,
    score: 0,  // Change this to your proficiency level (0-100)
  },
  {
    name: "React JS",
    icon: reactjs,
    score: 30,  // Change this to your proficiency level (0-100)
  },
  {
    name: "Redux Toolkit",
    icon: redux,
    score: 0,  // Change this to your proficiency level (0-100)
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
    score: 20,  // Change this to your proficiency level (0-100)
  },
  {
    name: "Node JS",
    icon: nodejs,
    score: 15,  // Change this to your proficiency level (0-100)
  },
  {
    name: "MongoDB",
    icon: mongodb,
    score: 40,  // Change this to your proficiency level (0-100)
  },
  {
    name: "Three JS",
    icon: threejs,
    score: 30,  // Change this to your proficiency level (0-100)
  },
  {
    name: "git",
    icon: git,
    score: 80,  // Change this to your proficiency level (0-100)
  },
  {
    name: "figma",
    icon: figma,
    score: 75,  // Change this to your proficiency level (0-100)
  },
  {
    name: "docker",
    icon: docker,
    score: 10,  // Change this to your proficiency level (0-100)
  },
];

// Work timeline data shown in the Experience section.
// Replace this template data with your real jobs, internships, or learning milestones.
const experiences = [
  {
    title: "RYAN INTERNATIONAL SCHOOL [ICSE]",
    company_name: "RIS",
    icon: starbucks,
    iconBg: "#383E56",
    date: " 1'ST TO 10'TH (2023)",
    points: [
      "BASIC EDUCATION: Completed 10 years of schooling with a strong academic record, demonstrating a solid foundation in core subjects and a commitment to learning.",
      "EXTRA-CURRICULAR ACTIVITIES: Actively participated in various extracurricular activities, including sports, arts, and community service, showcasing a well-rounded personality and leadership skills.",
      " PERCENTAGE OF 10TH: 92%"
    ],
  },
  {
    title: "KALA VIDYA MANDIR INSTITUTE OF TECHNOLOGY [DIPLOMA]",
    company_name: "KVMIT",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "JUNE 2023 - APRIL 2026",
    points: [
      "BASIC TO INTERMEDIATE KNOWLEDGE: Acquired a solid understanding of fundamental concepts in computer science and engineering, including programming languages, data structures, algorithms, and software development principles.",
      "PROJECT EXPERIENCE: Participated in various projects that enhanced practical skills and provided hands-on experience with real-world applications.",
      "DONE A TRAINING/INTERSHIP AT IOFT ",
  ,
    ],
  },
  {
    title: "INSTITUTE OF FUTURE TECHNOLOGIES",
    company_name: "IOFT",
    icon: shopify,
    iconBg: "#383E56",
    date: "AUG 2025 - NOV 2025",
    points: [
      "Developing and maintaining web applications using HTML, CSS, and JavaScript and other related technologies.",
      "CREATED MANY PROJECTS - MACHINE LEARNING/DEEP LEARNING.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

// Testimonial cards shown in the Feedbacks section.
// Remove this section or replace these with real feedback when you have it.
const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

// Project cards shown in the Works section.
// Replace these projects with your real portfolio projects and GitHub links.
const projects = [
  {
    name: "AI RATION MITRA ",
    description:
      "flutter app platform that allows users to search, view, and manage ration distribution from various providers, providing a convenient and efficient solution for distribution needs.",
    tags: [
      {
        name: "flutter",
        color: "blue-text-gradient",
      },
      {
        name: "firebase",
        color: "green-text-gradient",
      },
      {
        name: "java",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: 'https://github.com/MOHAMMED-FAIZAN-KHAN/ai_ration_mitra-main--1-.git',
  },
  {
    name: "face recognition and attendance system",
    description:
      "a python application for face recognition and attendance tracking, utilizing computer vision and machine learning techniques to identify and record attendance based on facial features.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "opencv",
        color: "green-text-gradient",
      },
      {
        name: "ctkinter",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "online restaurant and food delivery system",
    description:
      "A web application for ordering food from local restaurants and managing deliveries.",
    tags: [
      {
        name: "html",
        color: "blue-text-gradient",
      },
      {
        name: "css",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

// Export all portfolio data so components can display it.
export { services, technologies, experiences, testimonials, projects };
