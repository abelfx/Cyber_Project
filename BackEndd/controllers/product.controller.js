const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, catagory, price, quantityInStock, supplierId } =
      req.body;

    const product = new Product({
      name,
      description,
      catagory,
      price,
      quantityInStock,
      supplierId,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, catagory, price, quantityInStock, supplierId } =
      req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, catagory, price, quantityInStock, supplierId },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

exports.deleteProductforget= async (req, res) => {
  try {
    const productId = req.params.id;

    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      console.log(" CSRF not founc triggered for product:", productId);
      return res.status(404).send('Product not found');
    
    }

    console.log("🔥 CSRF deletion triggered for product:", productId);
    res.send('Product deleted (via CSRF)');
  } catch (err) {
    console.error("CSRF deletion error:", err);
    res.status(500).send('Error deleting product');
  }
};

exports.filterProducts = async (req, res) => {
  try {
    const { category, stockLevel, supplierId } = req.query;
    const query = {};

    if (category) {
      query.catagory = { $regex: category, $options: "i" };
    }

    if (stockLevel) {
      const [min, max] = stockLevel.split("-");
      query.quantityInStock = { $gte: parseInt(min), $lte: parseInt(max) };
    }

    if (supplierId) {
      query.supplierId = parseInt(supplierId);
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error filtering products", error: error.message });
  }
};
