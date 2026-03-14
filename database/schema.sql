-- Jivdaya Agro Mart - Database Schema
-- Run this file in PostgreSQL to set up the database

-- Create ENUM for user roles
CREATE TYPE user_role AS ENUM ('ADMIN', 'USER');

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site settings (keyed values used for editable images and other content)
CREATE TABLE site_settings (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT
);

-- Default admin: Run seed.js after schema setup (see README)
-- Admin email: admin@jivdaya.com | Password: admin123
