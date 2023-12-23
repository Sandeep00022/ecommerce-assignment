const express = require("express");
const Product = require("../schema/product.schema");
const Category = require("../schema/category.schema");
const productRouter = express.Router();
const { ObjectId } = require("mongoose");
const { get } = require("lodash");

productRouter.get("/", async (req, res) => {
  try {
    const { categoryName } = req.query;
    

    const products = await Product.find();
    res.status(200).json({
      error: false,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "internal server error",
    });
  }
});

productRouter.post("/post", async (req, res) => {
  try {
    const {
      categoryName,
      title,
      description,
      price,
      oldPrice,
      rating,
      inStock,
      image,
    } = req.body;

    const product = new Product({
      title,
      description,
      price,
      oldPrice,
      rating,
      inStock,
      image,
    });
    await product.save();
    

    const productData = await Product.findOneAndUpdate(
      { _id: product._id },
      { $push: { categoryName: categoryName } },
      { new: true }
    );
    const productInfo = await Product.find({ _id: product._id });
    if (product) {
      
      res.status(200).json({
        error: false,
        data: productData,
      });
    } else {
      throw Error("Product not found");
    }
  } catch (error) {}
});



module.exports = productRouter;
