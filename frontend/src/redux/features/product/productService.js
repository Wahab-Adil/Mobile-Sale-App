import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const API_URL = `${BACKEND_URL}/api/products/`;

// Create New Product
const createProduct = async (formData) => {
  console.log("Form Data", formData);
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Connection: "keep-alive",
      Accept: "*/*",
    },
  });
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

// sale Products
const saleProducts = async (id, formData) => {
  const response = await axios.patch(`${API_URL}/sale/${id}`, formData);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  saleProducts,
};

export default productService;
