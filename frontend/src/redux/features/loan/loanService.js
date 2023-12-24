import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const API_URL = `${BACKEND_URL}/api/loan/`;

// Create New Expense
const createLoan = async (formData) => {
  const response = await axios.post(`${API_URL}/create`, formData);
  return response.data;
};

// Get a Expense
const SingleLoan = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Get all Expenses
const getAllLoan = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Expense
const deleteLoan = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

// Update Expense
const updateLoan = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const LoanService = {
  createLoan,
  getAllLoan,
  SingleLoan,
  updateLoan,
  deleteLoan,
};

export default LoanService;
