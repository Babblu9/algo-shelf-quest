
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "./ui/input";
import { searchTopicsAndQuestions } from '../lib/api';
import { SearchResult } from '../lib/types';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({ topics: [], questions: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        try {
          const searchResults = await searchTopicsAndQuestions(searchQuery);
          setResults(searchResults);
          setShowResults(true);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults({ topics: [], questions: [] });
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search topics or questions..."
          className="w-full pl-10 pr-4 py-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (searchQuery.trim().length >= 2) {
              setShowResults(true);
            }
          }}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>

      {showResults && (searchQuery.trim().length >= 2) && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {results.topics.length === 0 && results.questions.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No results found</div>
              ) : (
                <>
                  {results.topics.length > 0 && (
                    <div className="p-2">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2 py-1">
                        Topics
                      </h3>
                      <ul>
                        {results.topics.map((topic) => (
                          <li key={topic.id || topic.slug}>
                            <Link
                              to={`/topic/${topic.slug}`}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => setShowResults(false)}
                            >
                              {topic.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {results.questions.length > 0 && (
                    <div className="p-2">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2 py-1">
                        Questions
                      </h3>
                      <ul>
                        {results.questions.map((question) => (
                          <li key={question.id}>
                            <Link
                              to={`/topic/${question.topicSlug}`}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => setShowResults(false)}
                            >
                              <div className="font-medium">{question.title}</div>
                              <div className="text-sm text-gray-500">
                                {question.topicName} • {question.difficulty || 'Medium'}
                              </div>
                            </Link>
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
      )}
    </div>
  );
};

export default SearchBar;
