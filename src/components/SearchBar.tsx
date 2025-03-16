
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchTopicsAndQuestions } from '../lib/data';

interface SearchResult {
  topics: {
    id: string;
    name: string;
    slug: string;
    description: string;
  }[];
  questions: {
    id: string;
    title: string;
    platform: string;
    topicSlug: string;
    topicName: string;
    difficulty: string;
  }[];
}

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({ topics: [], questions: [] });
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (query.trim()) {
      const result = searchTopicsAndQuestions(query);
      setResults(result);
    } else {
      setResults({ topics: [], questions: [] });
    }
  }, [query]);

  const handleTopicClick = (slug: string) => {
    navigate(`/topic/${slug}`);
    onClose();
  };

  const handleQuestionClick = (topicSlug: string) => {
    navigate(`/topic/${topicSlug}`);
    onClose();
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search topics and questions..."
          className="w-full bg-secondary/50 py-2 pl-10 pr-12 rounded-full border-0 focus:ring-0 focus:outline-none text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isFocused && (query || results.topics.length > 0 || results.questions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white rounded-lg shadow-elevated border border-border z-50 max-h-80 overflow-y-auto animate-scale-up">
          {results.topics.length === 0 && results.questions.length === 0 ? (
            <p className="p-3 text-sm text-muted-foreground text-center">No results found</p>
          ) : (
            <>
              {results.topics.length > 0 && (
                <div className="mb-3">
                  <h3 className="px-3 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Topics
                  </h3>
                  <ul>
                    {results.topics.map((topic) => (
                      <li key={topic.id}>
                        <button
                          onClick={() => handleTopicClick(topic.slug)}
                          className="w-full px-3 py-2 text-left rounded-md text-sm hover:bg-secondary/70 transition-colors"
                        >
                          <span className="font-medium">{topic.name}</span>
                          <p className="text-xs text-muted-foreground truncate">{topic.description}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.questions.length > 0 && (
                <div>
                  <h3 className="px-3 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Questions
                  </h3>
                  <ul>
                    {results.questions.map((question) => (
                      <li key={question.id}>
                        <button
                          onClick={() => handleQuestionClick(question.topicSlug)}
                          className="w-full px-3 py-2 text-left rounded-md text-sm hover:bg-secondary/70 transition-colors"
                        >
                          <span className="font-medium">{question.title}</span>
                          <p className="text-xs text-muted-foreground">
                            <span>{question.topicName}</span>
                            <span className="mx-1">•</span>
                            <span
                              className={
                                question.difficulty === 'Easy'
                                  ? 'text-difficulty-easy'
                                  : question.difficulty === 'Medium'
                                  ? 'text-difficulty-medium'
                                  : 'text-difficulty-hard'
                              }
                            >
                              {question.difficulty}
                            </span>
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
