const express = require('express');
const usersController = require('../../features/users/index');
const middleware = require('../../config/authMiddleware');

const router = express.Router();

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/user/:id', middleware.authenticateToken, usersController.getUserById);

module.exports = router;
