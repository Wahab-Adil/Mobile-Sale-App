import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const API_URL = `${BACKEND_URL}/api/report`;

// Date wise Purchase Report
const DateWisePurchaseReport = async (FormData) => {
  const response = await axios.post(`${API_URL}/purchase`, FormData);
  return response.data;
};
// Date wise avaliable Stack Report
const purchaseAvaliableStackReport = async (formData) => {
  console.log("hhh", formData);
  const response = await axios.post(`${API_URL}/avlstack/purchase`, formData);
  return response.data;
};
// Date wise Out Stack Report
const purchaseOutStackReport = async (FormData) => {
  const response = await axios.post(`${API_URL}/outstack/purchase`, FormData);
  return response.data;
};
// Date wise Sale Stack Report
const DateWiseSaleReport = async (FormData) => {
  const response = await axios.post(`${API_URL}/sale`, FormData);
  return response.data;
};

// Date wise max sale Report
const maximumSoldProductsReport = async (FormData) => {
  const response = await axios.post(`${API_URL}/max/sale`, FormData);
  return response.data;
};

// Date wise max sale Report
const minimumSoldProductsReport = async (FormData) => {
  const response = await axios.post(`${API_URL}/min/sale`, FormData);
  return response.data;
};

// Date wise  expense Report
const expenseReport = async (FormData) => {
  const response = await axios.post(`${API_URL}/expense`, FormData);
  return response.data;
};

// Date wise  loan Report
const loanReport = async (FormData) => {
  const response = await axios.post(`${API_URL}/loan`, FormData);
  return response.data;
};

const ReportServie = {
  DateWisePurchaseReport,
  purchaseAvaliableStackReport,
  purchaseOutStackReport,
  DateWiseSaleReport,
  maximumSoldProductsReport,
  minimumSoldProductsReport,
  expenseReport,
  loanReport,
};

export default ReportServie;
