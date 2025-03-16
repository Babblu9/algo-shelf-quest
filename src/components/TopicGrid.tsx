
import { topics } from '../lib/data';
import TopicCard from './TopicCard';

const TopicGrid = () => {
  return (
    <section id="topics" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">DSA Topics</h2>
          <p className="text-muted-foreground">
            Browse through our curated list of topics, each with a collection of carefully selected problems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <div key={topic.id} className="animate-fade-up">
              <TopicCard topic={topic} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicGrid;
