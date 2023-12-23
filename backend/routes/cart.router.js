const express = require("express");
const Cart = require("../schema/cart.schema");

const cartrouter = express.Router();

cartrouter.post("/post", async (req, res) => {
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

  let isPresent = await Cart.find({ title: title });

  if (isPresent.length > 0) {
    await Cart.updateOne({ title: title }, { $inc: { count: 1 } });
    res.send("item updated successfully");
    return;
  } else {
    try {
      const cart = await Cart.create({
        categoryName,
        title,
        description,
        price,
        oldPrice,
        rating,
        inStock,
        image,
      });

      res.send("added to the cart");
    } catch (error) {}
  }
});

cartrouter.get("/", async (req, res) => {
  try {
    const cartData = await Cart.find();
    res.send(cartData);
  } catch (error) {
    res.send(error);
  }
});

cartrouter.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { count } = req.body; // Assuming you are sending the new count in the request body

    // Validate if count is a positive integer
    if (!Number.isInteger(count)) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid count value" });
    }

    // Find the cart item by id
    const cartItem = await Cart.findById(id);

    if (!cartItem) {
      return res
        .status(404)
        .json({ error: true, message: "Cart item not found" });
    }

    // Update the count based on the request body
    cartItem.count = cartItem.count + count;

    // Save the updated cart item
    const updatedCartItem = await cartItem.save();

    res.status(200).json({ error: false, data: updatedCartItem });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

// delete cart

cartrouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
 

  try {
    await Cart.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Data has been deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = cartrouter;
