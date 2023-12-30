import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const API_URL = `${BACKEND_URL}/api/saletrash`;

// Get all Trash List of sale stack
const getTrashList = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Get a sale Stack Single Trash
const getSingleTrashItem = async (id) => {
  const response = await axios.get(`${API_URL}/` + id);
  return response.data[0];
};

// get Empty  sale Trash
const getEmptyTrash = async () => {
  const response = await axios.put(`${API_URL}/empty`);
  return response.data;
};

// Delete a sale Tash item
const deleteTrashItem = async (id) => {
  const response = await axios.delete(`${API_URL}/` + id);
  return response.data;
};

const SaleStkTrashServices = {
  getTrashList,
  getSingleTrashItem,
  getEmptyTrash,
  deleteTrashItem,
};

export default SaleStkTrashServices;
