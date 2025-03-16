
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block animate-fade-down">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              <span className="mr-1">✨</span> Curated Collection of DSA Problems
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 animate-fade-down" style={{ animationDelay: '100ms' }}>
            Master Algorithms with <span className="text-primary">AlgoShelf</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance animate-fade-down" style={{ animationDelay: '200ms' }}>
            A carefully curated collection of the most important data structures and algorithms problems to ace your technical interviews.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-down" style={{ animationDelay: '300ms' }}>
            <a 
              href="#topics"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-medium transition-transform hover:translate-y-[-2px] active:translate-y-[0px] focus-ring"
            >
              Explore Topics
              <ArrowRight size={16} />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-foreground font-medium transition-all hover:bg-secondary/80 focus-ring"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
