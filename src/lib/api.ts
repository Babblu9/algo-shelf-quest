
import { Topic, ApiResponse, Question } from './types';

const API_URL = 'http://localhost:5000/api';

export const fetchAllTopics = async (): Promise<Topic[]> => {
  try {
    const response = await fetch(`${API_URL}/topics`);
    const data: ApiResponse<Topic[]> = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch topics');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
};

export const fetchTopicBySlug = async (slug: string): Promise<Topic | null> => {
  try {
    const response = await fetch(`${API_URL}/topics/${slug}`);
    const data: ApiResponse<Topic> = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || `Failed to fetch topic: ${slug}`);
    }
    
    return data.data;
  } catch (error) {
    console.error(`Error fetching topic ${slug}:`, error);
    return null;
  }
};

export const searchTopicsAndQuestions = async (query: string): Promise<{topics: Topic[], questions: Question[]}> => {
  try {
    const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
    const data: ApiResponse<{topics: Topic[], questions: Question[]}> = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to search');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error searching:', error);
    return { topics: [], questions: [] };
  }
};
