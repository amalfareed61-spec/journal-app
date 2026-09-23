import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory database
let entries = [
  {
    id: 1,
    title: 'My First Journal Entry',
    content: 'Today I started building my full-stack journal application!',
    mood: 'Excited',
    createdAt: new Date().toISOString()
  }
];

// Health Check & Root
app.get('/', (req, res) => {
  res.send('Welcome to the Journal App API!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Journal App API is running' });
});

// 1. GET /api/entries - Fetch all journal entries
app.get('/api/entries', (req, res) => {
  res.json(entries);
});

// 2. POST /api/entries - Create a new journal entry
app.post('/api/entries', (req, res) => {
  const { title, content, mood } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newEntry = {
    id: Date.now(),
    title,
    content,
    mood: mood || 'Neutral',
    createdAt: new Date().toISOString()
  };

  entries.push(newEntry);
  res.status(201).json(newEntry);
});

// 3. DELETE /api/entries/:id - Delete an entry by ID
app.delete('/api/entries/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = entries.length;

  entries = entries.filter((entry) => entry.id !== Number(id));

  if (entries.length === initialLength) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  res.json({ message: 'Entry deleted successfully' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});