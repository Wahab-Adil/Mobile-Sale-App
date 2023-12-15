import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const API_URL = `${BACKEND_URL}/api/sale`;

// Get all Sales
const getAllSales = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Get a Product
const getSingleSale = async (id) => {
  const response = await axios.get(`${API_URL}/` + id);
  return response.data;
};

// Update Sale
const updateSale = async (id, formData) => {
  const response = await axios.put(`${API_URL}/update/${id}`, formData);
  return response.data;
};

// Delete a Sale
const deleteSale = async (id) => {
  const response = await axios.delete(`${API_URL}/` + id);
  return response.data;
};

const SaleService = {
  getAllSales,
  getSingleSale,
  updateSale,
  deleteSale,
};

export default SaleService;
