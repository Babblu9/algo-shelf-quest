
# DSA Sheet Backend

This is the backend API for the DSA Sheet Website, using JSON data stored in the data directory.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will run on http://localhost:5000 by default.

## API Endpoints

- `GET /api/topics` - Get all topics
- `GET /api/topics/:slug` - Get a specific topic by slug
- `GET /api/questions` - Get all questions from all topics
- `GET /api/search?query=text` - Search for topics and questions

## Data Structure

The data is stored in `data/dsasheet.json` file with the following structure:

```json
{
  "topics": [
    {
      "name": "Topic Name",
      "slug": "topic-slug",
      "description": "Topic description",
      "icon": "🔍",
      "questions": [
        {
          "title": "Question Title",
          "url": "https://example.com/question",
          "difficulty": "Easy|Medium|Hard",
          "platform": "LeetCode|CodeForces|Other"
        }
      ]
    }
  ]
}
```

## Modifying Data

To add or modify topics and questions, simply edit the `data/dsasheet.json` file. The server will automatically load the updated data on restart.
