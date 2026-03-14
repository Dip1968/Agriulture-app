// Seed script - creates default admin user
require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'jivdaya_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || ''
});

async function seed() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await pool.query(
      `INSERT INTO users (name, email, password, role) 
       VALUES ($1, $2, $3, 'ADMIN') 
       ON CONFLICT (email) DO UPDATE SET password = $3`,
      ['Admin', 'admin@jivdaya.com', hashedPassword]
    );
    console.log('Admin user created: admin@jivdaya.com / admin123');

    const userPass = await bcrypt.hash('user123', 10);
    await pool.query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (email) DO NOTHING`,
      ['Test User', 'user@jivdaya.com', userPass]
    );
    console.log('Sample user created: user@jivdaya.com / user123');

    // insert default site settings if not exist
    await pool.query(
      `INSERT INTO site_settings (key, value) VALUES
        ('home_hero', ''),
        ('about_banner', ''),
        ('tip_soil', ''),
        ('tip_seed', ''),
        ('tip_water', ''),
        ('tip_pest', ''),
        ('tip_rotation', ''),
        ('tip_harvest', ''),
        ('home_card_seed', ''),
        ('home_card_fert', ''),
        ('home_card_delivery', '')
       ON CONFLICT (key) DO NOTHING`
    );
    console.log('Default site settings initialized');

  } catch (error) {
    console.error('Seed error:', error.message);
  } finally {
    await pool.end();
  }
}

seed();
