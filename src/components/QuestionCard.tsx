
import { useState } from 'react';
import { ExternalLink, CheckSquare, Square } from 'lucide-react';
import { Question } from '../lib/types';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCompleted(!isCompleted);
  };

  // Use link if url is not available
  const questionLink = question.url || question.link || '';

  return (
    <div 
      className={`p-4 rounded-lg glass glass-hover border-l-4 transition-all ${
        isCompleted ? 'border-l-green-500/50 bg-opacity-90' : getDifficultyBorder(question.difficulty)
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={handleCheck}
              className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-sm"
              aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
            >
              {isCompleted ? (
                <CheckSquare size={18} className="text-green-500" />
              ) : (
                <Square size={18} />
              )}
            </button>
            <h3 className={`font-medium ${isCompleted ? 'text-muted-foreground line-through' : ''}`}>
              {question.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 ml-7">
            <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
              {question.platform || 'LeetCode'}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getDifficultyClass(question.difficulty || 'Medium')}`}>
              {question.difficulty || 'Medium'}
            </span>
          </div>
        </div>
        
        <a
          href={questionLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1 text-sm font-medium text-primary transition-all ${
            isHovering ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          Solve
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

// Helper functions
const getDifficultyClass = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-difficulty-easy/10 text-difficulty-easy';
    case 'Medium':
      return 'bg-difficulty-medium/10 text-difficulty-medium';
    case 'Hard':
      return 'bg-difficulty-hard/10 text-difficulty-hard';
    default:
      return 'bg-secondary text-foreground';
  }
};

const getDifficultyBorder = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'border-l-difficulty-easy/50';
    case 'Medium':
      return 'border-l-difficulty-medium/50';
    case 'Hard':
      return 'border-l-difficulty-hard/50';
    default:
      return 'border-l-border';
  }
};

export default QuestionCard;
