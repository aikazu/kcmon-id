import { useState, useEffect, useRef } from 'react';
import data from "./data/data.json";
import { 
  ArrowUpRight, 
  Sun, 
  Moon, 
  Github, 
  Linkedin, 
  Twitter,
  FileText,
  Layers,
  ExternalLink,
  Sparkles
} from 'lucide-react';

const { profile, sections } = data;

const getIcon = (label) => {
  const l = label.toLowerCase();
  if (l.includes('github')) return Github;
  if (l.includes('linkedin')) return Linkedin;
  if (l.includes('twitter') || l.includes('x')) return Twitter;
  if (l.includes('cv') || l.includes('resume') || l.includes('portfolio')) return FileText;
  return Layers;
};

const LinkCard = ({ item, index }) => {
  const Icon = getIcon(item.label);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a
      href={item.url}
      target={item.external ? "_blank" : "_self"}
      rel={item.external ? "noopener noreferrer" : ""}
      className="link-card group flex items-center gap-4 p-4 animate-fade-up"
      style={{ animationDelay: `${500 + index * 120}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="icon-container relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--muted)] text-[var(--muted-foreground)]">
        <Icon className="w-5 h-5 relative z-10" strokeWidth={1.5} />
      </div>
      
      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] font-medium tracking-widest text-[var(--primary)] uppercase">
            {item.tag}
          </span>
          {item.external && (
            <ExternalLink className="w-3 h-3 text-[var(--muted-foreground)] opacity-50" />
          )}
        </div>
        <h3 className="card-label text-sm font-semibold text-[var(--foreground)] truncate transition-colors duration-300">
          {item.label}
        </h3>
      </div>

      <div className="arrow-icon relative z-10">
        <ArrowUpRight className="w-5 h-5 text-[var(--primary)]" />
      </div>
    </a>
  );
};

const Section = ({ section, sectionIndex }) => {
  const baseIndex = sectionIndex * 5;
  
  return (
    <section className="mb-10">
      <div 
        className="flex items-center gap-3 mb-4 animate-fade-up"
        style={{ animationDelay: `${400 + sectionIndex * 100}ms` }}
      >
        <div className="relative">
          <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />
          <div className="absolute inset-0 h-2 w-2 rounded-full bg-[var(--primary)] animate-ping opacity-75" />
        </div>
        <h2 className="font-serif text-sm font-normal italic tracking-wide text-[var(--muted-foreground)]">
          {section.title}
        </h2>
        <div className="section-line flex-1 h-px bg-[var(--border)]" />
      </div>
      
      <div className="space-y-3">
        {section.items.map((item, idx) => (
          <LinkCard key={item.label} item={item} index={baseIndex + idx} />
        ))}
      </div>
    </section>
  );
};

const MouseGlow = () => {
  const glowRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      ref={glowRef}
      className="fixed w-[300px] h-[300px] pointer-events-none z-0 opacity-20 transition-opacity duration-300"
      style={{
        background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(60px)',
      }}
    />
  );
};

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('kcmon-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('kcmon-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) return null;

  return (
    <main 
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="noise-overlay" />
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <MouseGlow />
      
      <div className="max-w-md mx-auto px-5 py-16 sm:py-24 relative z-10">
        
        <button
          type="button"
          onClick={toggleTheme}
          className="toggle-btn fixed top-5 right-5 p-3 rounded-xl z-50 animate-scale-in"
          style={{ animationDelay: '200ms' }}
          aria-label="Toggle theme"
        >
          <span className="relative z-10 block">
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[var(--muted-foreground)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--muted-foreground)]" />
            )}
          </span>
        </button>

        <header className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] mb-6 animate-scale-in"
            style={{ animationDelay: '0ms' }}
          >
            <Sparkles className="w-3 h-3 text-[var(--primary)]" />
            <span className="font-mono text-[10px] tracking-wider text-[var(--muted-foreground)] uppercase">
              {profile.status}
            </span>
            <span className="status-dot w-1.5 h-1.5 rounded-full bg-green-500" />
          </div>
          
          <h1 
            className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-4 animate-fade-up"
            style={{ animationDelay: '100ms' }}
          >
            {profile.name}
          </h1>
          
          <p 
            className="text-sm leading-relaxed max-w-sm mx-auto animate-fade-up"
            style={{ color: 'var(--muted-foreground)', animationDelay: '200ms' }}
          >
            {profile.tagline}
          </p>
          
          <div 
            className="mt-6 flex items-center justify-center gap-2 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--border)]" />
            <span className="font-mono text-[10px] tracking-widest text-[var(--muted-foreground)] uppercase">
              {profile.location}
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--border)]" />
          </div>
        </header>

        <div>
          {sections.map((section, idx) => (
            <Section key={section.title} section={section} sectionIndex={idx} />
          ))}
        </div>

        <footer 
          className="mt-20 pt-8 border-t text-center animate-fade-up"
          style={{ borderColor: 'var(--border)', animationDelay: '1200ms' }}
        >
          <p 
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: 'var(--muted-foreground)' }}
          >
            © {new Date().getFullYear()} {profile.name}
          </p>
        </footer>

      </div>
    </main>
  );
}
