
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TopicGrid from '../components/TopicGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TopicGrid />
      </main>
      
      <footer className="py-8 border-t border-border mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AlgoShelf. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
