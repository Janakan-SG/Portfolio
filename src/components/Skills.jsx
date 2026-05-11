import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {SiJavascript, SiReact, SiNodedotjs, SiExpress, SiHtml5, SiCss, SiTailwindcss, SiPython, SiMongodb, SiMysql, SiGit, SiGithub, SiJira, SiPostman } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Code2, Database, Wrench, Brain } from "lucide-react";

const categories = [
  {
    label: "Languages & Frameworks",
    icon: Code2,
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "React",      icon: SiReact,      color: "#61DAFB" },
      { name: "Node.js",    icon: SiNodedotjs,  color: "#339933" },
      { name: "Express.js", icon: SiExpress,    color: "#888888" },
      { name: "Java",       icon: FaJava,       color: "#007396" },
      { name: "HTML5",      icon: SiHtml5,      color: "#E34F26" },
      { name: "CSS3",       icon: SiCss,        color: "#1572B6" },
      { name: "Tailwind",   icon: SiTailwindcss,color: "#06B6D4" },
      { name: "Python",     icon: SiPython,     color: "#3776AB" },
      { name: "C#",         icon: null,         color: "#239120" },
    ],
  },
  {
    label: "Databases",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL",   icon: SiMysql,   color: "#4479A1" },
    ],
  },
  {
    label: "Tools & Platforms",
    icon: Wrench,
    skills: [
      { name: "Git",     icon: SiGit,     color: "#F05032" },
      { name: "GitHub",  icon: SiGithub,  color: "#ffffff" },
      { name: "JIRA",    icon: SiJira,    color: "#0052CC" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "VS Code", icon: null,      color: "#007ACC" },
    ],
  },
  {
    label: "Concepts & Other",
    icon: Brain,
    skills: [
      { name: "REST APIs",          icon: null, color: "#00D4DC" },
      { name: "MVC Architecture",   icon: null, color: "#00D4DC" },
      { name: "Agile / Scrum",      icon: null, color: "#00D4DC" },
      { name: "QA Testing",         icon: null, color: "#00D4DC" },
      { name: "Project Management", icon: null, color: "#00D4DC" },
      { name: "Robotics & CAD",     icon: null, color: "#00D4DC" },
    ],
  },
];

function SkillCard({ skill, idx }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
      className="h-24"
      style={{ perspective: 600 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)} >
      <motion.div className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }} >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card border border-border rounded-xl shadow-sm"
          style={{ backfaceVisibility: "hidden" }} >
          {skill.icon ? (
            <skill.icon style={{ color: skill.color }} className="text-3xl" />
          ) : (
            <span className="text-2xl font-black" style={{ color: skill.color }}>
              {skill.name.slice(0, 2)}
            </span>
          )}
          <span className="text-xs font-medium text-muted-foreground text-center px-1">
            {skill.name}
          </span>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl border border-primary/40 bg-primary/10"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <span className="text-sm font-bold text-primary text-center px-2">
            {skill.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <section id="skills" className="relative py-24 overflow-x-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16" >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">My Tech Stack</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={` flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${active === i? "bg-primary text-primary-foreground border-primary shadow-lg" 
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground" }`} >
                <Icon size={16} />
                {cat.label}
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {current.skills.map((skill, idx) => (
              <SkillCard key={skill.name} skill={skill} idx={idx} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}