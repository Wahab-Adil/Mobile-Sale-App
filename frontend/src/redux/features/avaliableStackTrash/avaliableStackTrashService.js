import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const API_URL = `${BACKEND_URL}/api/trash`;

// Get all Trash List of Avaliable stack
const getTrashList = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data.productTrash;
};

// Get a Avaliable Stack Single Trash
const getSingleTrashItem = async (id) => {
  const response = await axios.get(`${API_URL}/` + id);
  return response.data[0];
};

// get Empty  Avaliable Trash
const getEmptyTrash = async () => {
  const response = await axios.get(`${API_URL}/empty`);
  return response.data;
};

// Delete a Avaliable Tash item
const deleteTrashItem = async (id) => {
  const response = await axios.delete(`${API_URL}/` + id);
  return response.data;
};

// Delete a Avaliable Tash item
const deleteTrashItemWithBelongedSales = async (id) => {
  const response = await axios.delete(`${API_URL}/withsales/` + id);
  return response.data;
};

const AvaliableStkTrashServices = {
  getTrashList,
  getSingleTrashItem,
  getEmptyTrash,
  deleteTrashItem,
  deleteTrashItemWithBelongedSales,
};

export default AvaliableStkTrashServices;
