
# DSA Sheet Backend

This is the backend API for the DSA Sheet Website, using MongoDB for data storage.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root of the backend folder with the following variables:
```
PORT=5000
MONGODB_URI=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/dsasheet?retryWrites=true&w=majority
```

3. Seed the database with initial data from `data/dsasheet.json`:
```bash
npm run seed
```

4. Start the server:
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

## Initial Data Import

The backend includes a seed script that will import data from the `data/dsasheet.json` file into MongoDB. This script:

1. Reads the JSON file
2. Processes the data to add missing fields (slugs, platforms, etc.)
3. Clears existing data in the database
4. Inserts the processed data

To run the seed script:
```bash
npm run seed
```
