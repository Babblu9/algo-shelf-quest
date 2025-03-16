
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const Topic = require('./models/Topic');

// Connect to MongoDB
connectDB();

const seedDatabase = async () => {
  try {
    // Read data from JSON file
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'dsasheet.json'), 'utf8')
    );

    if (!data.topics || !Array.isArray(data.topics)) {
      console.error('Invalid data format in dsasheet.json');
      process.exit(1);
    }

    // Process topics
    const topics = data.topics.map(topic => {
      // Create slug from name if not present
      if (!topic.slug) {
        topic.slug = topic.name.toLowerCase().replace(/\s+/g, '-');
      }

      // Process questions
      if (topic.questions && Array.isArray(topic.questions)) {
        topic.questions = topic.questions.map(question => {
          // Map link to url if url is not present
          if (question.link && !question.url) {
            question.url = question.link;
          }

          // Extract platform from URL if not present
          if (!question.platform) {
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

    // Clear existing data
    await Topic.deleteMany({});

    // Insert new data
    await Topic.insertMany(topics);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
