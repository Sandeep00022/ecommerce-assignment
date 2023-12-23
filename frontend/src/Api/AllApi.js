import axios from "axios";

const BASE_URL_1 = "http://localhost:8000/product";
const BASE_URL_2 = "http://localhost:8000/category";
const BASE_URL_3 = "http://localhost:8000/cart";

// add products

const addProduct = (formData, setFormData) => {
  
  return axios
    .post(`${BASE_URL_1}/post`, formData)
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
  return axios(`${BASE_URL_1}/`);
};

// get category

const getCategory = () => {
  return axios(`${BASE_URL_2}/`);
};

//post category

const addCategory = (additionalCategory) => {
  return axios(`${BASE_URL_2}/post`, {
    method: "POST",
    data: { name: additionalCategory },
    headers: { "Content-Type": "application/json" },
  });
};

// patchCart

const handleQuantityChange = (id, value) => {
  return axios(`${BASE_URL_3}/update/${id}`, {
    method: "PATCH",
    data: { count: value },
  }).then(() => getCart().then((res) => res.data));
};

const getCart = () => {
  return axios(`${BASE_URL_3}/`);
};

// delete cart

const handleDelete = (id) => {
  return axios(`http://localhost:8000/cart/delete/${id}`, {
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
