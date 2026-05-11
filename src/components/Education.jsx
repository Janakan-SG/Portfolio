import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";

export function Education() {
  const degrees = [
    {
      title: "HND in Computing",
      institution: "ESOFT Metro Campus",
      credential: "Pearson BTEC Higher National Diploma in Computing",
      date: "September 2024 – Present",
      status: "In Progress",
      icon: GraduationCap,
    },
    {
      title: "Level 3 Diploma in Information Technology",
      institution: "ESOFT Metro Campus",
      credential: "Level 3 IT Diploma",
      date: "May 2024 – January 2025",
      status: "Completed",
      icon: GraduationCap,
    },
  ];

  const certifications = [
    {
      title: "Java Programming and Software Engineering Fundamentals Specialization",
      issuer: "Duke University",
      link: "https://coursera.org/share/4a165d0cf463da799ce0b0d4dd3308b2",
    },
    {
      title: "Machine Learning Specialization",
      issuer: "DeepLearning.AI, Stanford University",
      link: "https://coursera.org/share/5d681131366527777adfd8d30469307c",
    },
    {
      title: "Developing Front-End Apps with React",
      issuer: "IBM",
      link: "https://coursera.org/share/055badb743e6adecf9bb8c58fe42671c",
    },
    {
      title: "Developing Back-End Apps with Node.js and Express",
      issuer: "IBM",
      link: "https://coursera.org/share/87ade428182b5f4ec2ede99862ef70e4",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16" >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Education & Certifications
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
              <GraduationCap size={22} />
              Academic Education
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative space-y-6 pl-6 border-l-2 border-primary/20" >
              {degrees.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative">
                  <div className="absolute -left-[31px] top-5 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-md z-10">
                    <item.icon size={14} className="text-primary" />
                  </div>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-card border border-border rounded-2xl p-6 ml-2 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {item.date}
                      </span>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          item.status === "In Progress"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-green-500/10 text-green-500"}`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground mt-3">
                      {item.title}
                    </h4>
                    <p className="text-sm font-medium text-primary/80 mt-1">
                      {item.institution}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.credential}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
              <Award size={22} />
              Certifications
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4" >
              {certifications.map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block" >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -4, x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4 hover:border-primary/40 transition-colors" >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={22} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </motion.div>
                </a>
              ))}
              <motion.div
                variants={itemVariants}
                className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Committed to continuous learning and staying current with
                  emerging technologies in software engineering, machine
                  learning, and cloud development.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}