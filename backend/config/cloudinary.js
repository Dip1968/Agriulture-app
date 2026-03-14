// Cloudinary configuration for image storage
const cloudinary = require('cloudinary').v2;

// Validate Cloudinary credentials
if (!process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET ||
    process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name' ||
    process.env.CLOUDINARY_API_KEY === 'your_api_key' ||
    process.env.CLOUDINARY_API_SECRET === 'your_api_secret') {
  console.error('❌ CLOUDINARY CREDENTIALS MISSING!');
  console.error('Please update your .env file with actual Cloudinary credentials:');
  console.error('CLOUDINARY_CLOUD_NAME=your_actual_cloud_name');
  console.error('CLOUDINARY_API_KEY=your_actual_api_key');
  console.error('CLOUDINARY_API_SECRET=your_actual_api_secret');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
