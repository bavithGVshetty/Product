const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET single product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// POST create product
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
});

// PUT update product
router.put("/:id", async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(updatedProduct);
});

// DELETE product
router.delete("/:id", async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted successfully" });
});

module.exports = router;