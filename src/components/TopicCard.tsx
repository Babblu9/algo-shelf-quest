
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Topic } from '../lib/types';

interface TopicCardProps {
  topic: Topic;
  index: number;
}

const TopicCard = ({ topic, index }: TopicCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/topic/${topic.slug}`}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="h-full rounded-xl glass glass-hover overflow-hidden p-6 transition-all duration-300">
        <div className="flex flex-col h-full">
          <div className="mb-4 text-3xl">{topic.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow">{topic.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium bg-secondary rounded-full px-2.5 py-1">
              {topic.questionCount} questions
            </span>
            
            <div className={`flex items-center gap-1 text-primary text-sm font-medium transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}>
              <span>View</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
