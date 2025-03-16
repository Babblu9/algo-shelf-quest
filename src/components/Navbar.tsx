
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-medium text-lg transition-opacity hover:opacity-80"
          >
            <span className="text-xl">🧠</span>
            <span className="font-semibold">AlgoShelf</span>
          </Link>

          <div className="flex items-center space-x-4">
            {!isSearchOpen ? (
              <>
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full text-foreground/80 hover:text-foreground transition-colors focus-ring"
                  aria-label="Open search"
                >
                  <Search size={20} />
                </button>
                <nav className="hidden md:flex space-x-1">
                  <Link 
                    to="/" 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary ${location.pathname === '/' ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}
                  >
                    Home
                  </Link>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    GitHub
                  </a>
                </nav>
              </>
            ) : (
              <div className="w-full max-w-md animate-fade-in">
                <SearchBar onClose={() => setIsSearchOpen(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
