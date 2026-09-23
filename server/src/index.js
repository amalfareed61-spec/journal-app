import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, initDb } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database Table on Server Start
initDb();

// Health Check & Root
app.get('/', (req, res) => {
  res.send('Welcome to the Journal App API!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Journal App API is running' });
});

// 1. GET /api/entries - Fetch all entries from PostgreSQL
app.get('/api/entries', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM entries ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching entries' });
  }
});

// 2. POST /api/entries - Insert a new entry into PostgreSQL
app.post('/api/entries', async (req, res) => {
  const { title, content, mood } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO entries (title, content, mood) VALUES ($1, $2, $3) RETURNING *',
      [title, content, mood || 'Neutral']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error saving entry' });
  }
});

// 3. DELETE /api/entries/:id - Delete an entry from PostgreSQL
app.delete('/api/entries/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM entries WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error deleting entry' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});