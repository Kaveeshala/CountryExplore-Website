// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getUser);
router.put('/', authMiddleware, updateUser);
router.delete('/', authMiddleware, deleteUser);

module.exports = router;
