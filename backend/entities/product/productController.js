// Product entity - CRUD controller
const pool = require('../../config/db');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');
const fsPromises = fs.promises;

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, description, price, image_url, created_at FROM products ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, title, description, price, image_url, created_at FROM products WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found.' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Failed to fetch product.' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    let { price } = req.body;
    if (!title || price === undefined || price === null || price === '') {
      return res.status(400).json({ message: 'Title and price are required.' });
    }
    // sanitize and coerce price (accept numbers or strings with commas/currency)
    const sanitize = (p) => {
      if (typeof p === 'number') return p;
      if (typeof p === 'string') {
        const cleaned = p.replace(/,/g, '').replace(/[^0-9.\-]/g, '');
        return parseFloat(cleaned);
      }
      return NaN;
    };
    price = sanitize(price);
    if (isNaN(price)) {
      return res.status(400).json({ message: 'Price must be a valid number.' });
    }

    // Validate Cloudinary credentials only when uploading a file
    if (req.file && req.file.path) {
      if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        try { await fsPromises.unlink(req.file.path); } catch (e) {}
        return res.status(500).json({ 
          message: 'Cloudinary API key is missing or invalid. Please check your .env file.',
          error: 'CLOUDINARY_CREDENTIALS_MISSING'
        });
      }
    }

    let imageUrl = null;
    if (req.file && req.file.path) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'jivdaya-agro-mart' });
        imageUrl = uploadResult.secure_url;
        try { await fsPromises.unlink(req.file.path); } catch (e) {}
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        try { await fsPromises.unlink(req.file.path); } catch (e) {}
        return res.status(500).json({ 
          message: 'Failed to upload image. Check Cloudinary credentials in .env file.',
          error: uploadError.message
        });
      }
    }

    const result = await pool.query(
      'INSERT INTO products (title, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description || '', price, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Failed to create product.' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    let { price } = req.body;

    if (!title || price === undefined || price === null || price === '') {
      return res.status(400).json({ message: 'Title and price are required.' });
    }

    // sanitize price value from form-data (may come as string)
    const sanitize = (p) => {
      if (typeof p === 'number') return p;
      if (typeof p === 'string') {
        const cleaned = p.replace(/,/g, '').replace(/[^0-9.\-]/g, '');
        return parseFloat(cleaned);
      }
      return NaN;
    };
    price = sanitize(price);
    if (isNaN(price)) return res.status(400).json({ message: 'Price must be a valid number.' });

    let imageUrl = req.body.image_url;
    if (req.file && req.file.path) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'jivdaya-agro-mart' });
        imageUrl = uploadResult.secure_url;
        try { await fsPromises.unlink(req.file.path); } catch (e) {}
      } catch (uploadError) {
        console.error('Cloudinary upload error on update:', uploadError);
        try { await fsPromises.unlink(req.file.path); } catch (e) {}
        return res.status(500).json({ message: 'Image upload failed during update.' });
      }
    }
    const result = await pool.query(
      'UPDATE products SET title = $1, description = $2, price = $3, image_url = COALESCE($4, image_url) WHERE id = $5 RETURNING *',
      [title, description || '', price, imageUrl, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found.' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Failed to update product.' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Failed to delete product.' });
  }
};

module.exports = {
  getAllProducts, getProductById, createProduct, updateProduct, deleteProduct
};
