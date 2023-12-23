const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRouter = require("./routes/product.routes");
const categoryRoute = require("./routes/category.routes");
const cartrouter = require("./routes/cart.router");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv")
dotenv.config()
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Welcome")
})
app.use("/category", categoryRoute);
app.use("/product", productRouter);
app.use("/cart", cartrouter);
const port = process.env.PORT;

app.listen(port, () => {
  try {
    mongoose.connect(
      "mongodb+srv://Sandy007:Sandy007@cluster0.pn39abe.mongodb.net/ecommerce"
    );
    console.log(`port is running at ${port}`);
  } catch (error) {}
});
