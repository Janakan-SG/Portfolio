import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <footer className="w-full py-6 border-t border-border/40 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Sritharan Janakan. All rights reserved.</p>
      </footer>
    </div>
  );
}