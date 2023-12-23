// CartPage.js
import React, { useEffect, useState } from "react";
import "../styles/CartPage.css"; // Import the external CSS file
import { getCart, handleDelete, handleQuantityChange } from "../Api/AllApi";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //getcart

  let totalPrice;
  let totalCount;
  if (cart.length > 0) {
    totalPrice = cart.reduce(
      (acc, curr) => (acc += curr.count * curr.price),
      0
    );

    totalCount = cart.reduce((acc, curr) => (acc += curr.count), 0);
  }

  useEffect(() => {
    setIsLoading(true);
    getCart().then((res) => {
      setCart(res.data);
      setIsLoading(false);
    });
  }, []);

 

  if (isLoading) {
    return <h2 style={{ margin: "300px" }}>Loading...</h2>;
  }

  return (
    <div className="container">
      <div className="content">
        {cart &&
          cart.map((product) => (
            <div className="product">
              <img src={product.image} alt={product.title} className="image" />
              <div className="details">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <div className="quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(product._id, -1).then((res) =>
                        setCart(res)
                      )
                    }
                  >
                    -
                  </button>
                  <input type="text" value={product.count} readOnly />
                  <button
                    onClick={() =>
                      handleQuantityChange(product._id, 1).then((res) =>
                        setCart(res)
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    style={{ background: "red" }}
                    onClick={() =>
                      handleDelete(product._id).then((res) => setCart(res))
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        <div className="summary">
          <div className="summary-content">
            <h3>Cart Summary</h3>
            <p>
              <strong>Total Count:</strong> {totalCount}
            </p>
            <p>
              <strong>Total Price:</strong> ${totalPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
