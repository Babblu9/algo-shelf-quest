
import { Question } from '../lib/types';
import QuestionCard from './QuestionCard';

interface QuestionListProps {
  questions: Question[];
}

const QuestionList = ({ questions }: QuestionListProps) => {
  // If questions don't have difficulty, we'll show them all together
  const hasDifficulties = questions.some(q => q.difficulty);
  
  if (!hasDifficulties) {
    return (
      <div className="space-y-3">
        {questions.map((question, index) => (
          <div 
            key={`${question.title}-${index}`}
            className="animate-fade-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <QuestionCard question={question} />
          </div>
        ))}
      </div>
    );
  }

  // Group questions by difficulty if difficulties exist
  const groupedQuestions = questions.reduce((acc, question) => {
    const difficulty = question.difficulty || 'Medium';
    if (!acc[difficulty]) {
      acc[difficulty] = [];
    }
    acc[difficulty].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  // Order by difficulty: Easy, Medium, Hard
  const orderedDifficulties = ['Easy', 'Medium', 'Hard'];
  
  return (
    <div className="space-y-8">
      {orderedDifficulties.map(difficulty => {
        const questionsForDifficulty = groupedQuestions[difficulty] || [];
        if (questionsForDifficulty.length === 0) return null;
        
        return (
          <div key={difficulty} className="animate-fade-up">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <span 
                className={`w-2 h-2 rounded-full mr-2 ${
                  difficulty === 'Easy' 
                    ? 'bg-difficulty-easy' 
                    : difficulty === 'Medium' 
                      ? 'bg-difficulty-medium' 
                      : 'bg-difficulty-hard'
                }`}
              />
              {difficulty} Problems
              <span className="text-sm text-muted-foreground font-normal ml-2">
                ({questionsForDifficulty.length})
              </span>
            </h3>
            
            <div className="space-y-3">
              {questionsForDifficulty.map((question, index) => (
                <div 
                  key={`${question.title}-${index}`}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <QuestionCard question={question} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionList;
