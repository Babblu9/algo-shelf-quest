
# DSA Sheet Project Documentation

## Project Overview

This project is a Data Structures and Algorithms (DSA) sheet website that displays programming problems organized by topics. The application consists of a frontend built with React and a backend API powered by MongoDB.

## Project Structure

```
/
├── src/                      # Frontend React application
│   ├── components/           # React components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and types
│   ├── pages/                # Page components
│   └── ...
└── backend/                  # Express backend application
    ├── config/               # Database configuration
    ├── data/                 # Initial seed data (JSON)
    ├── models/               # MongoDB schemas
    └── ...
```

## Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up MongoDB connection:**
   - Create a `.env` file in the `backend` directory
   - Add your MongoDB connection string:
     ```
     PORT=5000
     MONGODB_URI=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/dsasheet?retryWrites=true&w=majority
     ```

3. **Seed the database:**
   ```bash
   npm run seed
   ```
   This will import the data from `backend/data/dsasheet.json` into your MongoDB database.

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:5000 by default.

## Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:8080 by default.

## API Endpoints

- `GET /api/topics` - Get all topics
- `GET /api/topics/:slug` - Get a specific topic by slug
- `GET /api/questions` - Get all questions from all topics
- `GET /api/search?query=text` - Search for topics and questions

## Data Models

### Topic
```javascript
{
  name: String,           // required
  slug: String,           // required, unique
  description: String,
  icon: String,
  questions: [Question],
  questionCount: Number   // virtual (calculated)
}
```

### Question
```javascript
{
  title: String,          // required
  url: String,
  link: String,           // legacy field, mapped to url
  platform: String,       // e.g., "LeetCode", "CodeForces", defaults to "Other"
  difficulty: String      // "Easy", "Medium", "Hard", defaults to "Medium"
}
```

## Making Changes

### To add new topics or questions:

1. You can modify the `backend/data/dsasheet.json` file and then run the seed script again:
   ```bash
   npm run seed
   ```

2. Alternatively, you can create API endpoints for creating, updating, and deleting topics and questions.

### To modify the frontend:

The frontend uses React with TypeScript and is styled with Tailwind CSS. Key components:

- `TopicGrid.tsx` - Displays a grid of all topics
- `TopicPage.tsx` - Shows details of a specific topic and its questions
- `QuestionList.tsx` - Lists questions for a topic
- `QuestionCard.tsx` - Displays a single question

## Troubleshooting

- Make sure MongoDB is running and accessible
- Check the `.env` file in the backend directory has the correct MongoDB URI
- Ensure both frontend and backend servers are running

