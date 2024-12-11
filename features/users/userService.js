const User = require('../../models/userModels');
const jwt = require('jsonwebtoken');
// const secretKey = require('../../config/jwtConfig');
const bcrypt = require('bcryptjs');

// REGISTER
const registerUserService = async ({ name, email, jenisKelamin, password }) => {
  const user = await User.findOne({ email });

  // jika ada email maka user terdaftar
  if (user) {
    throw new Error('User sudah melakukan registrasi');
  }

  // HASHED PASS
  const hashedPassword = await bcrypt.hash(password, 12);

  return await User.create({
    name,
    email,
    jenisKelamin,
    password: hashedPassword,
  });
};

const getUserByIdService = async ({ id }) => {
  return await User.findById(id);
};

module.exports = { registerUserService, getUserByIdService };
