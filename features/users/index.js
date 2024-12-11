const User = require('../../models/userModels');
const userService = require('./userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, jenisKelamin, password } = req.body;

  try {
    const user = await userService.registerUserService({ name, email, jenisKelamin, password });

    res.json({
      status: 'success',
      message: 'user berhasil registrasi',
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'user gagal registrasi', error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // jika user tidak terdaftar maka send error
    if (!user) {
      throw new Error('user tidak ditemukan');
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('password salah!');
    }

    // TOKEN
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.secretKey, {
      expiresIn: '1d',
    });

    res.status(201).json({
      status: 'berhasil',
      message: 'user berhasil login',
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'user gagal login', error: error.message });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.getUserByIdService({ id });
    res.json({
      status: 'success',
      message: 'user berhasil registrasi',
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'tidak dapat memuat user', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserById };
