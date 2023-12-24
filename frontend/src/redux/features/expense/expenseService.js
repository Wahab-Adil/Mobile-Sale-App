import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const API_URL = `${BACKEND_URL}/api/expense/`;

// Create New Expense
const createExpense = async (formData) => {
  const response = await axios.post(`${API_URL}/create`, formData);
  return response.data;
};

// Get a Expense
const SingleExpense = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Get all Expenses
const getAllExpenses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Expense
const deleteExpense = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

// Update Expense
const updateExpense = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const ExpenseService = {
  createExpense,
  getAllExpenses,
  SingleExpense,
  deleteExpense,
  updateExpense,
};

export default ExpenseService;
