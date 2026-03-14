// Product entity - routes
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('./productController');
const { verifyToken } = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', verifyToken, checkRole('ADMIN'), upload.single('image'), productController.createProduct);
router.put('/:id', verifyToken, checkRole('ADMIN'), upload.single('image'), productController.updateProduct);
router.delete('/:id', verifyToken, checkRole('ADMIN'), productController.deleteProduct);

module.exports = router;
