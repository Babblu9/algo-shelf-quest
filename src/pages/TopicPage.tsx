
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import QuestionList from '../components/QuestionList';
import { getTopicBySlug } from '../lib/data';

const TopicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const topic = slug ? getTopicBySlug(slug) : undefined;
  
  useEffect(() => {
    if (!topic) {
      navigate('/not-found');
    }
  }, [topic, navigate]);
  
  if (!topic) {
    return null;
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
