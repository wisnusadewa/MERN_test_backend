const Product = require('../../models/productModels');

// create product
const createProductService = async ({ name, price, description }) => {
  return await Product.create({
    name,
    price,
    description,
  });
};

// get all product
const getAllProductService = async () => {
  return await Product.find();
};

// get by id
const getProductById = async ({ id }) => {
  return await Product.findById(id);
};

// edit
const editProductService = async ({ id, name, price, description }) => {
  const product = await Product.findById(id);

  product.name = name;
  product.price = price;
  product.description = description;

  return await product.save();
};

// delete
const deleteProductService = async ({ id }) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = { createProductService, getAllProductService, getProductById, editProductService, deleteProductService };
