
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import QuestionList from '../components/QuestionList';
import { fetchTopicBySlug } from '../lib/api';
import { Topic } from '../lib/types';

const TopicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadTopic = async () => {
      if (!slug) {
        navigate('/not-found');
        return;
      }
      
      try {
        setIsLoading(true);
        const fetchedTopic = await fetchTopicBySlug(slug);
        
        if (!fetchedTopic) {
          navigate('/not-found');
          return;
        }
        
        setTopic(fetchedTopic);
        setError(null);
      } catch (err) {
        console.error(`Failed to load topic ${slug}:`, err);
        setError('Failed to load topic. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTopic();
  }, [slug, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-28 pb-20 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading topic...</span>
        </div>
      </div>
    );
  }
  
  if (error || !topic) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-28 pb-20 text-center">
          <p className="text-destructive">{error || 'Topic not found'}</p>
          <Link 
            to="/" 
            className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to all topics
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors focus-ring rounded-md"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to all topics
          </Link>
          
          <div className="mb-12 animate-fade-down">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                <span className="mr-1">{topic.icon}</span> {topic.name}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{topic.name} Problems</h1>
            
            <p className="text-muted-foreground">{topic.description}</p>
          </div>
          
          <QuestionList questions={topic.questions} />
        </div>
      </main>
      
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AlgoShelf. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TopicPage;
