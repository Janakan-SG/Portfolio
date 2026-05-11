import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import project1 from "../assets/project1.jpeg";
import project2 from "../assets/project2.png";

function ProjectCard({ project, idx }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-120, 120], [12, -12]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-120, 120], [-12, 12]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: idx * 0.15, type: "spring", stiffness: 80 }}
      className="relative w-full rounded-2xl bg-card border border-border shadow-xl overflow-hidden group cursor-pointer" >
      <div className="relative w-full h-48 overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.color}`} />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <p className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {project.date}
          </p>
          <div className="flex gap-3 text-muted-foreground">
            <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors">
                <FontAwesomeIcon icon={faGithub} className="text-3xl" />
              </a>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
          {project.description}
        </p>
        <div className="mb-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Key Features
          </h4>
          <ul className="space-y-1.5">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          {project.tech.map((tech, i) => (
            <span key={i}className="px-2.5 py-1 rounded-lg bg-secondary text-xs font-medium text-secondary-foreground border border-border/50 hover:border-primary/40 transition-colors">{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const projects = [
    {
      title: "Student Management System for ESOFT Metro Campus Trincomalee Branch",
      date: "December 2025 – Present",
      description: "A comprehensive full-stack system designed to manage student records, grades, and administrative tasks with a clean dashboard interface.",
      features: [
        "Complete CRUD operations for student data",
        "Secure user authentication and authorization",
        "RESTful API with JIRA-tracked sprint cycles",
        "Manual & functional QA testing",
      ],
      tech: ["React", "Node.js", "Express.js", "MongoDB", "JIRA"],
      image: project1,
      color: "from-cyan-500 to-primary",
    },
    {
      title: "Room Booking Website",
      date: "Personal Project",
      description: "A sleek room reservation platform featuring real-time availability, an intuitive calendar booking flow, and a responsive modern UI.",
      features: [
        "Real-time room availability calendar",
        "Online booking and reservation system",
        "Admin panel for room management",
        "Responsive design for all devices",
      ],
      tech: ["React", "Node.js", "Express.js", "MongoDB"],
      image: project2,
      color: "from-primary to-blue-500",
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-secondary/20">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Real-world applications built with modern full-stack technologies.
          </p>
        </motion.div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          style={{ perspective: "1200px" }}
        >
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}