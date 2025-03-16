
# DSA Sheet Backend

This is the backend API for the DSA Sheet Website.

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

## Data Format

The API expects data in `data/dsasheet.json` with the following format:

```json
{
  "topics": [
    {
      "name": "Array",
      "questions": [
        {
          "title": "Find first and last position of an element",
          "link": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
        },
        ...
      ]
    },
    ...
  ]
}
```

The server will automatically add missing fields like slugs, IDs, platforms, and difficulty levels if they're not provided.
