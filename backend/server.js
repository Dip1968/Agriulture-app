// Server entry point
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

// Log configuration status
console.log('\n📋 Configuration Status:');
console.log('✓ Database configured:', process.env.DB_HOST ? 'Yes' : 'No');
console.log('✓ Cloudinary configured:', process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' ? 'Yes' : 'No');
console.log('');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
