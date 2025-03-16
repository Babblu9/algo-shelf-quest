
import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { searchTopicsAndQuestions } from '@/lib/api';
import { Topic, Question, SearchResult } from '@/lib/types';
import { Link } from 'react-router-dom';

interface SearchProps {
  onClose?: () => void;
}

export function Search({ onClose }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({ topics: [], questions: [] });
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setResults({ topics: [], questions: [] });
      return;
    }
    
    setIsSearching(true);
    
    try {
      const searchResults = await searchTopicsAndQuestions(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search topics and questions..."
          className="pl-10 pr-4 py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      
      {isSearching && <div className="mt-4 text-center">Searching...</div>}
      
      {!isSearching && (results.topics.length > 0 || results.questions.length > 0) && (
        <div className="mt-4 bg-white rounded-md shadow-lg border border-gray-200 max-h-[70vh] overflow-y-auto">
          {results.topics.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Topics</h3>
              <ul className="space-y-2">
                {results.topics.map((topic) => (
                  <li key={topic.slug} className="hover:bg-gray-50 rounded p-2">
                    <Link 
                      to={`/topics/${topic.slug}`}
                      className="flex items-center" 
                      onClick={handleResultClick}
                    >
                      {topic.icon && <span className="mr-2">{topic.icon}</span>}
                      <span className="font-medium">{topic.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {results.questions.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Questions</h3>
              <ul className="space-y-2">
                {results.questions.map((question, index) => (
                  <li key={`${question.title}-${index}`} className="hover:bg-gray-50 rounded p-2">
                    <Link 
                      to={`/topics/${question.topicSlug}`}
                      className="block" 
                      onClick={handleResultClick}
                    >
                      <span className="font-medium">{question.title}</span>
                      {question.topicName && (
                        <span className="text-sm text-gray-500 block mt-1">
                          in {question.topicName}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {!isSearching && query && results.topics.length === 0 && results.questions.length === 0 && (
        <div className="mt-4 text-center text-gray-500">No results found</div>
      )}
    </div>
  );
}
