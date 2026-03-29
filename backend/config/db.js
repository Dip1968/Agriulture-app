// Database connection configuration using native pg
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'jivdaya_db',
  user: process.env.DB_USER || 'postgres',
  // Ensure password is always a string to avoid SCRAM errors
  password: String(process.env.DB_PASSWORD ?? ''),
  ssl: { rejectUnauthorized: false }
});

// Test connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

module.exports = pool;
