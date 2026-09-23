import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

export const initDb = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS entries (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      mood VARCHAR(50) DEFAULT 'Neutral',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(queryText);
    console.log('Entries table verified/created successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};