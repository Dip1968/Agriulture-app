
const pool = require('../../config/db');
const cloudinary = require('../../config/cloudinary');

const ensureTable = async () => {
  // create table if missing
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key VARCHAR(255) PRIMARY KEY,
      value TEXT
    )
  `);
};

const getAllSettings = async (req, res) => {
  try {
    await ensureTable();
    const result = await pool.query('SELECT key, value FROM site_settings');
    const settings = {};
    result.rows.forEach(r => { settings[r.key] = r.value; });
    res.json(settings);
  } catch (err) {
    console.error('Get settings error:', err);
    res.status(500).json({ message: 'Failed to load settings.' });
  }
};

const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    if (typeof value !== 'string') {
      return res.status(400).json({ message: 'Value must be a string.' });
    }
    await ensureTable();
    await pool.query(
      'INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
      [key, value]
    );
    res.json({ key, value });
  } catch (err) {
    console.error('Update setting error:', err);
    res.status(500).json({ message: 'Failed to update setting.' });
  }
};

// file upload to cloudinary
const uploadImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No file provided.' });
    }
    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'jivdaya-agro-mart/settings' });
    // remove temp file
    const fs = require('fs');
    fs.unlinkSync(req.file.path);
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error('Settings image upload error:', err);
    res.status(500).json({ message: 'Upload failed.' });
  }
};

module.exports = { getAllSettings, updateSetting, uploadImage };
