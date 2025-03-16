
import { useEffect, useState } from 'react';
import { fetchAllTopics } from '../lib/api';
import { Topic } from '../lib/types';
import TopicCard from './TopicCard';
import { Loader2 } from 'lucide-react';

const TopicGrid = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setIsLoading(true);
        const fetchedTopics = await fetchAllTopics();
        setTopics(fetchedTopics);
        setError(null);
      } catch (err) {
        console.error('Failed to load topics:', err);
        setError('Failed to load topics. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTopics();
  }, []);

  return (
    <section id="topics" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">DSA Topics</h2>
          <p className="text-muted-foreground">
            Browse through our curated list of topics, each with a collection of carefully selected problems.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading topics...</span>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-destructive">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topics.map((topic, index) => (
              <div key={topic.id} className="animate-fade-up">
                <TopicCard topic={topic} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopicGrid;
