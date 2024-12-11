const express = require('express');
const usersController = require('../../features/users/index');

const router = express.Router();

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/user/:id', usersController.getUserById);

module.exports = router;
