
# DSA Sheet Project Documentation

## Project Overview

This project is a Data Structures and Algorithms (DSA) sheet website that displays programming problems organized by topics. The application uses JSON data for storing questions information.

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
    ├── data/                 # JSON data for topics and questions
    └── ...
```

## Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Start the backend server:**
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

## Adding New Topics or Questions

To add new topics or questions:

1. Modify the `backend/data/dsasheet.json` file with your new content following the same structure.
2. The new data will be automatically available through the API endpoints.

## Troubleshooting

- Ensure the backend server is running on port 5000
- Check that the JSON file contains valid data in the correct format
- Verify that frontend is correctly configured to connect to the backend API
