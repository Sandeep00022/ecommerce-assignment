import React from "react";
import "../styles/CardProduct.css";
import ProductRating from "../components/ProductRating";
import axios from "axios";

const CardProduct = ({ product }) => {
  const addToCart = () => {
    axios(`${process.env.REACT_APP_BASE_URL}/cart/post`, {
      method: "POST",
      data: product,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.data == "added to the cart"
        ? alert("added to the cart")
        : alert("item quantitiy increased by 1");
    });
  };

  
  return (
    <div className="single-card-container">
      <div className="single-card">
        <img src={product.image} alt={product.title} className="card-image" />

        <div className="card-details">
          <div className="category">{product.category}</div>
          <div className="title">{product.title}</div>
          <div className="description">{product.description}</div>
          <div className="price">
            <span className="new-price">${product.price}</span>
            {product.oldPrice && (
              <span className="old-price">${product.oldPrice}</span>
            )}
          </div>
          <div className="rating">
            Rating:
            <ProductRating rating={product.rating} /> stars
          </div>
          <div className="in-stock">In Stock: {product.inStock}</div>

          {/* Add to Cart Button */}
          <button onClick={addToCart} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
