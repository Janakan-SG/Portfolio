import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import photo2 from "../assets/photo2.jpeg";

function StatCard({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="bg-card border border-border rounded-2xl p-5 text-center hover:border-primary/40 transition-colors"
    >
      <h4 className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-b from-foreground to-primary">
        {value}
      </h4>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
}

export function About() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [12, -12]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-12, 12]), { stiffness: 80, damping: 20 });

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
    <section id="about" className="relative py-24 overflow-hidden bg-secondary/20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16" >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
            style={{ perspective: 800 }} >
            <motion.div
              ref={ref}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[380px] mx-auto cursor-pointer overflow-visible">
              <div
                className="absolute inset-0 rounded-3xl bg-primary/40 blur-2xl"
                style={{ transform: "translateZ(-50px) scale(1.05)",}} />
              <motion.div
                className="absolute -inset-3 rounded-3xl border-2 border-[#04cefb]"
                style={{transform: "translateZ(-20px)",}}
                animate={{rotate: [0, 360],}}
                transition={{duration: 30,repeat: Infinity,ease: "linear",}} />
              <div className="relative z-10 rounded-3xl overflow-hidden border border-primary/30 shadow-2xl aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                <img src={photo2} alt="Sritharan Janakan" className="w-full h-full object-cover object-center" />
              </div>
              <motion.div
                className="absolute -bottom-5 left-1/2 z-50 transform -translate-x-1/2 bg-background/80 backdrop-blur-md border border-primary/20 rounded-full px-5 py-2 shadow-xl whitespace-nowrap"
                style={{ transform: "translateZ(50px)",}}
                animate={{y: [0, -5, 0], }}
                transition={{duration: 3.5,repeat: Infinity,ease: "easeInOut",}}>
                <span className="text-sm font-semibold text-foreground">
                  Software Engineer
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 space-y-6" >
            <h3 className="text-2xl md:text-3xl font-semibold">
              I turn ideas into <span className="text-primary">production-ready</span> software.
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>Full-stack engineer specialising in React, Node.js, and MongoDB — I ship fast, build clean, and never cut corners on quality.</p>
              <p>From pixel-perfect UIs to rock-solid REST APIs, I own the full delivery cycle. Backed by certifications in Java, Machine Learning, and Full-Stack JavaScript, I bring both depth and versatility to every project.</p>
              <p>I can communicate in <strong className="text-foreground">English</strong> and <strong className="text-foreground">Tamil</strong>, and thrive in fast-moving, agile teams where shipping matters.</p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <StatCard value="2+" label="Years in Tech" delay={0.5} />
              <StatCard value="5+" label="Apps Shipped" delay={0.6} />
              <StatCard value="3+" label="Certifications" delay={0.7} />
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}