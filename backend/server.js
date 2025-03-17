
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load data from JSON file
const loadData = () => {
  try {
    const rawData = fs.readFileSync(path.join(__dirname, 'data', 'dsasheet.json'), 'utf8');
    const data = JSON.parse(rawData);
    
    // Process the data to ensure all required fields
    return {
      topics: data.topics.map(topic => {
        // Create slug from name if not present
        if (!topic.slug) {
          topic.slug = topic.name.toLowerCase().replace(/\s+/g, '-');
        }

        // Add description and icon if not present
        if (!topic.description) {
          const descriptions = {
            'Array': 'Linear data structures that store elements of the same type in contiguous memory locations.',
            'LinkedList': 'Linear data structures where elements are stored in nodes connected by pointers.',
            'Recursion': 'A programming technique where a function calls itself to solve a problem.',
            'Backtracking': 'An algorithmic technique for solving problems recursively by building candidates to solutions incrementally.',
            'Tree': 'Hierarchical data structures with a root node and subtrees of children nodes.',
            'Graph': 'Non-linear data structures consisting of vertices and edges.',
            'DP': 'Method for solving complex problems by breaking them down into simpler subproblems.',
            'String': 'Sequences of characters used to represent text.',
            'Heap': 'Tree-based data structures that satisfy the heap property.',
            'Greedy': 'Algorithms that make locally optimal choices at each stage.'
          };
          
          topic.description = descriptions[topic.name] || `Problems related to ${topic.name} data structures and algorithms.`;
        }
        
        if (!topic.icon) {
          const icons = {
            'Array': '📊',
            'LinkedList': '🔗',
            'Recursion': '🔄',
            'Backtracking': '🔙',
            'Tree': '🌳',
            'Graph': '📈',
            'DP': '🧩',
            'String': '🔤',
            'Heap': '📚',
            'Greedy': '👋'
          };
          
          topic.icon = icons[topic.name] || '📝';
        }
        
        // Process questions
        if (topic.questions && Array.isArray(topic.questions)) {
          topic.questions = topic.questions.map(question => {
            // Extract platform from URL if not present
            if (!question.platform) {
              const url = question.link || '';
              if (url.includes('leetcode.com')) {
                question.platform = 'LeetCode';
              } else if (url.includes('codeforces.com')) {
                question.platform = 'CodeForces';
              } else if (url.includes('hackerrank.com')) {
                question.platform = 'HackerRank';
              } else if (url.includes('geeksforgeeks.org')) {
                question.platform = 'GeeksforGeeks';
              } else {
                question.platform = 'Other';
              }
            }
            
            // Map link to url if url is not present
            if (question.link && !question.url) {
              question.url = question.link;
            }
            
            // Add default difficulty if not present
            if (!question.difficulty) {
              question.difficulty = 'Medium';
            }
            
            return question;
          });
        }
        
        // Add questionCount
        topic.questionCount = topic.questions ? topic.questions.length : 0;
        
        return topic;
      })
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return { topics: [] };
  }
};

// Get data
const data = loadData();

// API Routes
app.get('/api/topics', (req, res) => {
  try {
    res.json({
      success: true,
      data: data.topics
    });
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: null
    });
  }
});

app.get('/api/topics/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const topic = data.topics.find(t => t.slug === slug);
    
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found',
        data: null
      });
    }
    
    res.json({
      success: true,
      data: topic
    });
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: null
    });
  }
});

app.get('/api/questions', (req, res) => {
  try {
    const allQuestions = data.topics.flatMap(topic => 
      topic.questions.map(q => ({
        ...q,
        topicName: topic.name,
        topicSlug: topic.slug
      }))
    );
    
    res.json({
      success: true,
      data: allQuestions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: null
    });
  }
});

app.get('/api/search', (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.json({
        success: true,
        data: { topics: [], questions: [] }
      });
    }
    
    const searchTerm = query.toLowerCase();
    
    // Search topics
    const topics = data.topics.filter(topic => 
      topic.name.toLowerCase().includes(searchTerm) || 
      (topic.description && topic.description.toLowerCase().includes(searchTerm))
    );
    
    // Search questions
    const questions = data.topics.flatMap(topic => 
      topic.questions
        .filter(q => q.title.toLowerCase().includes(searchTerm))
        .map(q => ({
          ...q,
          topicName: topic.name,
          topicSlug: topic.slug
        }))
    );
    
    res.json({
      success: true,
      data: { topics, questions }
    });
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: null
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
