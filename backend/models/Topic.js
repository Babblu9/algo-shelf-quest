
const mongoose = require('mongoose');
const QuestionSchema = require('./Question');

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true
  },
  icon: {
    type: String
  },
  questions: [QuestionSchema]
});

// Virtual for questionCount
TopicSchema.virtual('questionCount').get(function() {
  return this.questions.length;
});

// Set virtuals to be included in JSON output
TopicSchema.set('toJSON', { virtuals: true });
TopicSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Topic', TopicSchema);
