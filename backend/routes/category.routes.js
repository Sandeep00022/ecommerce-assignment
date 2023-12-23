const express = require("express");
const Category = require("../schema/category.schema");
const categoryRoute = express.Router();

categoryRoute.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      error: false,
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "internal server error",
    });
  }
});

categoryRoute.post("/post", async (req, res) => {
  const { name } = req.body;

  const ispresent = await Category.findOne({ name: name });

  if (ispresent) {
    res.send("category already present");
    return;
  }

  try {
    const iscategory = await Category.create({ name: name });
    if (iscategory) {
      res.send("category successfully created");
    } else {
      throw new Error("Error creating category");
    }
  } catch (error) {
    res.send("inernal server error");
  }
});

module.exports = categoryRoute;
