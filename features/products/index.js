const productService = require('./productService');

// CREATE PRODUCT
const createProduct = async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const product = await productService.createProductService({ name, price, description });

    res.json({
      status: 'success',
      message: 'product berhasil dibuat',
      data: {
        product,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'gagal membuat produk', error: error.message });
  }
};

// GET ALL PRODUCT
const getAllProduct = async (req, res) => {
  try {
    const product = await productService.getAllProductService();
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'gagal mendapatkan produk', error: error.message });
  }
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const productId = await productService.getProductById({ id });
    res.status(200).json({
      status: 'success',
      productById: productId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'gagal mendapatkan produk id', error: error.message });
  }
};

// EDIT PRODUCT
const editProduct = async (req, res) => {
  const id = req.params.id;
  const { name, price, description } = req.body;
  try {
    const editProduct = await productService.editProductService({ id, name, price, description });
    res.status(200).json({
      status: 'success',
      update_product: editProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'gagal mengedit produk', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productService.deleteProductService({ id });
    res.status(200).json({
      status: 'success',
      delete_product: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'gagal mengedit produk', error: error.message });
  }
};

module.exports = { createProduct, getAllProduct, getProductById, editProduct, deleteProduct };
