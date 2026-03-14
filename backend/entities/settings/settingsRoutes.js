
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');
const settingsController = require('./settingsController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// public retrieval
router.get('/', settingsController.getAllSettings);

// admin updates
router.put('/:key', verifyToken, checkRole('ADMIN'), settingsController.updateSetting);
router.post('/upload', verifyToken, checkRole('ADMIN'), upload.single('image'), settingsController.uploadImage);

module.exports = router;
