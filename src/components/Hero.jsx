import {useState, useEffect, useRef} from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import photo1 from "../assets/photo1.jpeg";
import AnimatedBackground from "./AnimatedBackground";

function Photo3D() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-150, 150], [15, -15]),
    { stiffness: 100, damping: 20 }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-150, 150], [-15, 15]),
    { stiffness: 100, damping: 20 }
  );

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] mx-auto"
      style={{perspective: 1000,rotateX, rotateY,transformStyle: "preserve-3d",}}>
      <div className="absolute inset-0 rounded-3xl bg-primary/40 blur-3xl scale-110" />
      <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border border-primary/30 shadow-2xl">
        <div className="absolute inset-0  from-primary/20 to-transparent z-10" />
        <img src={photo1}alt="Sritharan Janakan"className="w-full h-full object-cover object-center" />
      </div>
      <motion.div
        className="absolute -bottom-5 -left-5 bg-card/90 backdrop-blur-md border border-primary/20 rounded-2xl px-4 py-3 shadow-xl z-20"
        style={{ transform: "translateZ(60px)",}} 
        animate={{y: [0, -6, 0], }}
        transition={{duration: 3, repeat: Infinity,ease: "easeInOut",}}>
        <p className="text-xs text-muted-foreground font-medium">
          Available for
        </p>
        <p className="text-sm font-bold text-primary">
          Opportunities
        </p>
      </motion.div>
      <motion.div
        className="absolute -top-5 -right-5 bg-card/90 backdrop-blur-md border border-primary/20 rounded-2xl px-4 py-3 shadow-xl z-20"
        style={{transform: "translateZ(50px)",}}
        animate={{y: [0, 6, 0],}}
        transition={{ duration: 4,repeat: Infinity, ease: "easeInOut", }} >
        <p className="text-xs text-muted-foreground font-medium">
          Tech Stack
        </p>
        <p className="text-sm font-bold text-foreground">
          React + Node.js
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = [
    "Software Engineer",
    "Full-Stack Developer",
    "React & Node.js Enthusiast",
    "I Build. I ship. I Deliver",  
  ];

  useEffect(()=> {
    const t = setInterval(() => {
      setTitleIndex((i)=> (i + 1) % titles.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

   return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24">
    <AnimatedBackground />
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-[calc(100vh-96px)]">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-6 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground leading-none">
              Hi, I'm{" "}
              <span className="text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50">
                JANAKAN
              </span>
            </h1>
            <div className="h-8 overflow-hidden -mt-1">
              <motion.h2 
                key={titleIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-xl md:text-2xl font-medium text-muted-foreground">
                {titles[titleIndex]}
              </motion.h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-[540px] mx-auto lg:mx-0 leading-relaxed">
              Full-stack developer skilled in React, Node.js, and MongoDB — building accessible, performant web experiences with a strong eye for QA and Agile delivery.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button onClick={() => scrollTo("contact")} className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/80 transition-colors">
                Contact Me
              </button>
              <button onClick={() => scrollTo("projects")} className="px-8 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors" >
                View Work
              </button>
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 pt-2">
               <a
                href="https://github.com/Janakan-SG"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors">
                <FontAwesomeIcon icon={faGithub} className="text-3xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/sritharan-janakan-52a52b389/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors">
                <FontAwesomeIcon icon={faLinkedin} className="text-3xl" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sritharanjanakan2003@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors">
                <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
              </a>
            </div> 
            </div>
          </motion.div>
          <div className="flex justify-center order-1 lg:order-2" style={{ perspective: 1000 }}>
            <Photo3D />
          </div>
        </div>
    </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors z-10" onClick={() => scrollTo("about")} >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{duration:2, repeat:Infinity}}>
          <ChevronDown size={32} />
        </motion.div>
        
      </motion.div>
      

    </section>
  );

}
