import axios from "axios";
import React, { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import "../styles/Products.css";
import { getCategory, getData } from "../Api/AllApi";

const Products = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = (category) => {
    let filtered = originalProducts.filter(
      (product) => product.categoryName[0] === category
    );
    setProducts(filtered);
  };

  useEffect(() => {
    setIsLoading(true);
    getData().then((res) => {
      setOriginalProducts(res.data.data);
      setProducts(res.data.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getCategory().then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  if (isLoading) {
    return <h2 style={{ margin: "300px" }}>Loading...</h2>;
  }

  return (
    <>
      <div className="categories-container">
        <h4>Filter By Category</h4>
        <div>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => {
                filteredProducts(category.name);
                setSelectedCategory(category.name);
              }}
              className={`category-button ${
                category.name === selectedCategory && "active"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="product-list-container">
        {products.length > 0 ? (
          products.map((product) => (
            <CardProduct key={product._id} product={product} />
          ))
        ) : (
          <h3>No products listed for the selected category.</h3>
        )}
      </div>
    </>
  );
};

export default Products;
