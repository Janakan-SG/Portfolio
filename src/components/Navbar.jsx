import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["hero", "about", "skills", "projects", "education", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, 
  []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { name: "Home",      id: "hero"      },
    { name: "About",     id: "about"     },
    { name: "Skills",    id: "skills"    },
    { name: "Projects",  id: "projects"  },
    { name: "Education", id: "education" },
    { name: "Contact",   id: "contact"   },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}transition={{ duration: 0.7, type: "spring", bounce: 0.25 }}
        className={`w-full max-w-7xl rounded-full transition-all duration-500 flex items-center justify-between px-5 py-3 ${ scrolled ? "bg-background/75 backdrop-blur-xl border border-primary/20 shadow-lg" : "bg-transparent border border-transparent" }`}>
        <motion.div className="cursor-pointer select-none" onClick={() => scrollTo("hero")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <span className={`text-[20px] font-extrabold tracking-tighter ${scrolled ? "text-foreground" : "text-foreground"}`}>Sritharan</span>
          <span className="text-primary text-[20px] font-extrabold"> Janakan.</span>
        </motion.div>
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <button key={link.name} onClick={() => scrollTo(link.id)}
                className={`relative px-3 py-1.5 rounded-lg text-[16px] font-medium transition-all duration-300 ${
                  isActive ? "text-primary" : scrolled ? "text-muted-foreground hover:text-foreground" : "text-muted-foreground hover:text-foreground" }`}>
                {isActive && (
                  <motion.span layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/25" transition={{ type: "spring", bounce: 0.3, duration: 0.5 }} />
                )}
                <span className="relative z-10">{link.name}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button  className={`md:hidden p-1.5 rounded-lg transition-colors text-muted-foreground hover:text-foreground`} onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.96 }} transition={{ duration: 0.2 }}
            className="absolute top-[72px] left-4 right-4 rounded-2xl bg-background/90 backdrop-blur-xl border border-primary/20 shadow-xl p-4 flex flex-col gap-1 md:hidden">
            {navLinks.map((link) => (
              <button
                key={link.name} onClick={() => scrollTo(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${ active === link.id ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
