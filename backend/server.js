
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load data from JSON file
let dsaData = {};
try {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'dsasheet.json'), 'utf8');
  dsaData = JSON.parse(data);
  
  // Process the data - add slugs, ids, etc.
  if (dsaData.topics) {
    dsaData.topics = dsaData.topics.map(topic => {
      // Create slug from name if not present
      if (!topic.slug) {
        topic.slug = topic.name.toLowerCase().replace(/\s+/g, '-');
      }
      
      // Add id if not present
      if (!topic.id) {
        topic.id = uuidv4();
      }
      
      // Process questions
      if (topic.questions) {
        topic.questionCount = topic.questions.length;
        topic.questions = topic.questions.map(question => {
          // Add id if not present
          if (!question.id) {
            question.id = uuidv4();
          }
          
          // Map link to url if url is not present
          if (question.link && !question.url) {
            question.url = question.link;
          }
          
          // Add default platform if not present
          if (!question.platform) {
            // Extract platform from URL
            const url = question.url || question.link || '';
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
          
          // Add default difficulty if not present
          if (!question.difficulty) {
            question.difficulty = 'Medium';
          }
          
          return question;
        });
      }
      
      return topic;
    });
  }
  
  console.log(`Loaded ${dsaData.topics?.length || 0} topics from dsasheet.json`);
} catch (error) {
  console.error('Error loading data:', error);
  dsaData = { topics: [] };
}

// API Routes
app.get('/api/topics', (req, res) => {
  res.json({
    success: true,
    data: dsaData.topics
  });
});

app.get('/api/topics/:slug', (req, res) => {
  const { slug } = req.params;
  const topic = dsaData.topics.find(t => t.slug === slug);
  
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
});

app.get('/api/questions', (req, res) => {
  const allQuestions = dsaData.topics.flatMap(topic => 
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
});

app.get('/api/search', (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.json({
      success: true,
      data: { topics: [], questions: [] }
    });
  }
  
  const searchTerm = query.toLowerCase();
  
  // Search topics
  const topics = dsaData.topics.filter(topic => 
    topic.name.toLowerCase().includes(searchTerm) || 
    (topic.description && topic.description.toLowerCase().includes(searchTerm))
  );
  
  // Search questions
  const questions = dsaData.topics.flatMap(topic => 
    topic.questions.filter(q => 
      q.title.toLowerCase().includes(searchTerm)
    ).map(q => ({
      ...q,
      topicName: topic.name,
      topicSlug: topic.slug
    }))
  );
  
  res.json({
    success: true,
    data: { topics, questions }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
