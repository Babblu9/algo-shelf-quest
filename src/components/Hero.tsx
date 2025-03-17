
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

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
          
          <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Button 
              size="lg" 
              className="rounded-full"
              onClick={() => {
                document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started <ArrowRight className="ml-1" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
