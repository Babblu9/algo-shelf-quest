
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const Topic = require('./models/Topic');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/topics', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json({
      success: true,
      data: topics
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

app.get('/api/topics/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const topic = await Topic.findOne({ slug });
    
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

app.get('/api/questions', async (req, res) => {
  try {
    const topics = await Topic.find();
    const allQuestions = topics.flatMap(topic => 
      topic.questions.map(q => ({
        ...q.toObject(),
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

app.get('/api/search', async (req, res) => {
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
    const topics = await Topic.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    
    // Search questions
    const topicsWithMatchingQuestions = await Topic.find({
      'questions.title': { $regex: searchTerm, $options: 'i' }
    });
    
    const questions = topicsWithMatchingQuestions.flatMap(topic => 
      topic.questions
        .filter(q => q.title.toLowerCase().includes(searchTerm))
        .map(q => ({
          ...q.toObject(),
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
