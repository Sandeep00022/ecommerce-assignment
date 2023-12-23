import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AddProduct.css";
import { addCategory, addProduct, getCategory, getData } from "../Api/AllApi";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
    title: "",
    description: "",
    price: 0,
    oldPrice: 0,
    rating: 0,
    inStock: 0,
    image: "",
  });

  const [categorys, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [additionalCategory, setAdditionalCategory] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));

    if (name === "categoryName" && value === "addMore") {
      setShowModal(true);
    }
  };

  useEffect(() => {
    getCategory().then((res) => setCategory(res.data.data));
  }, [categorys]);

  // add category
  const handleAdditionalCategoryChange = (e) => {
    setAdditionalCategory(e.target.value);
  };

  return (
    <div className="form-field">
      <h2>Add Product</h2>

      <label htmlFor="category">Category:</label>
      <select id="category" name="categoryName" value={formData.categoryName} onChange={handleChange}>
        <option value="select">select options</option>
        {categorys.length > 0 &&
          categorys.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        <option value="addMore">Add More+</option>
      </select>

      <br />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button
              style={{ background: "red" }}
              onClick={() => setShowModal(false)}
            >
              close
            </button>
            <label htmlFor="additionalCategory">Additional Category:</label>
            <input
              type="text"
              id="additionalCategory"
              name="additionalCategory"
              value={additionalCategory}
              onChange={handleAdditionalCategoryChange}
            />
            <button
              type="button"
              onClick={() =>
                addCategory(additionalCategory)
                  .then((res) => alert(res.data))
                  .then(() => getCategory())
              }
            >
              Add Category
            </button>
          </div>
        </div>
      )}

      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        onChange={handleChange}
        value={formData.title}
        required
      />

      <br />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        onChange={handleChange}
        value={formData.description}
        required
      />

      <br />

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        onChange={handleChange}
        min="0"
        step="0.01"
        value={formData.price}
        required
      />

      <br />

      <label htmlFor="oldPrice">Old Price:</label>
      <input
        type="number"
        id="oldPrice"
        name="oldPrice"
        onChange={handleChange}
        min="0"
        step="0.01"
        value={formData.oldPrice}
      />

      <br />

      <label htmlFor="rating">Rating:</label>
      <input
        type="number"
        id="rating"
        name="rating"
        onChange={handleChange}
        min="0"
        max="5"
        step="0.1"
        value={formData.rating}
      />

      <br />

      <label htmlFor="inStock">In Stock:</label>
      <input
        type="number"
        id="inStock"
        name="inStock"
        onChange={handleChange}
        value={formData.inStock}
        min="0"
      />

      <br />

      <label htmlFor="image">Image:</label>
      <input
        type="url"
        id="image"
        name="image"
        placeholder="please add image Url"
        onChange={handleChange}
        value={formData.image}
        required
      />

      <br />

      <button
        type="button"
        onClick={() => addProduct(formData,setFormData).then(() => getData())}
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
