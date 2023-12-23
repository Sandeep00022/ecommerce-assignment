import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// add products

const addProduct = (formData, setFormData) => {
  
  return axios
    .post(`${BASE_URL}/product/post`, formData)
    .then((response) => {
      alert("product added successfully");
      setFormData({
        categoryName: "",
        title: "",
        description: "",
        price: 0,
        oldPrice: 0,
        rating: 0,
        inStock: 0,
        image: "",
      });
    })
    .catch((error) => {
      console.error("Error adding product:", error);
    });
};

// get products

const getData = () => {
  return axios(`${BASE_URL}/product`);
};

// get category

const getCategory = () => {
  return axios(`${BASE_URL}/category`);
};

//post category

const addCategory = (additionalCategory) => {
  return axios(`${BASE_URL}/category/post`, {
    method: "POST",
    data: { name: additionalCategory },
    headers: { "Content-Type": "application/json" },
  });
};

// patchCart

const handleQuantityChange = (id, value) => {
  return axios(`${BASE_URL}/cart/update/${id}`, {
    method: "PATCH",
    data: { count: value },
  }).then(() => getCart().then((res) => res.data));
};

const getCart = () => {
  return axios(`${BASE_URL}/cart`);
};

// delete cart

const handleDelete = (id) => {
  return axios(`${BASE_URL}/cart/delete/${id}`, {
    method: "DELETE",
  }).then(() => getCart().then((res) => res.data));
};

export {
  addCategory,
  getCategory,
  getData,
  addProduct,
  getCart,
  handleQuantityChange,
  handleDelete,
};
