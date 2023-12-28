import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import AvaliableStack from "./pages/avaliableStack/AvaliableStack";
import SaleStack from "./pages/saleStack/saleStack";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import AvaliableDetails from "./components/avaliableStack/productDetail/ProductDetail";
import SaleDetail from "./components/saleStack/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import SaleEdit from "./pages/editSale/editSale";
import SaleProduct from "./pages/sale/SaleProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
// trash
import SaleStackTrash from "./pages/saleStackTrash/saleStackTrash";
import AvaliableStackTrash from "./pages/avaliableStackTrash.js/avaliableStackTrash";
import AvlStackTrashDetail from "./components/avaliableStackTrash/productDetail/ProductDetail";
import SaleStackTrashDetail from "./components/saleStackTrash/productDetail/ProductDetail";

// expense
import Expense from "./pages/expense/expense.js";
import AddExpense from "./pages/addExpense/addExpense.js";
import ExpenseDetails from "./components/expense/productDetail/ProductDetail.js";
import ExpenseEdit from "./pages/expenseEdit/expenseEdit.js";

// loan
import Loan from "./pages/loan/loan.js";
import AddLoan from "./pages/addLoan/addLoan.js";
import LoanDetails from "./components/loan/productDetail/ProductDetail.js";
import LoanEdit from "./pages/loanEdit/loanEdit.js";

// report
// purchase
import AvaliableStackReport from "./pages/report/avaliableStack/AvaliableStack.js";
import DateWisePurchaseReport from "./pages/report/dateWisePurchase/PurchaseReport.js";
import OutOfStack from "./pages/report/outStack/OutStack.js";
// sale
import SaleProductReport from "./pages/report/sale/SaleProductReport.js";
import MaxSold from "./pages/report/maxsale/MaxSold.js";
import MinSold from "./pages/report/minsale/MinSales.js";

// expense
import ExpenseReport from "./pages/report/expense/expense.js";
// loan
import LoanReport from "./pages/report/loan/loan.js";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route
          path="/report/purchase"
          element={
            <Sidebar>
              <Layout>
                <DateWisePurchaseReport />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/aval/purchase"
          element={
            <Sidebar>
              <Layout>
                <AvaliableStackReport />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/out/purchase"
          element={
            <Sidebar>
              <Layout>
                <OutOfStack />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/report/sale"
          element={
            <Sidebar>
              <Layout>
                <SaleProductReport />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/max/sold"
          element={
            <Sidebar>
              <Layout>
                <MaxSold />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/min/sold"
          element={
            <Sidebar>
              <Layout>
                <MinSold />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/report/expense"
          element={
            <Sidebar>
              <Layout>
                <ExpenseReport />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/report/loan"
          element={
            <Sidebar>
              <Layout>
                <LoanReport />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/avaliable"
          element={
            <Sidebar>
              <Layout>
                <AvaliableStack />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/sale"
          element={
            <Sidebar>
              <Layout>
                <SaleStack />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/expense"
          element={
            <Sidebar>
              <Layout>
                <Expense />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/loan"
          element={
            <Sidebar>
              <Layout>
                <Loan />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-expense"
          element={
            <Sidebar>
              <Layout>
                <AddExpense />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-loan"
          element={
            <Sidebar>
              <Layout>
                <AddLoan />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <AvaliableDetails />
              </Layout>
            </Sidebar>
          }
        />{" "}
        <Route
          path="/expense-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ExpenseDetails />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/loan-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <LoanDetails />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/sale-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <SaleDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-sale/:id"
          element={
            <Sidebar>
              <Layout>
                <SaleEdit />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-expense/:id"
          element={
            <Sidebar>
              <Layout>
                <ExpenseEdit />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-loan/:id"
          element={
            <Sidebar>
              <Layout>
                <LoanEdit />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/sale-product/:id"
          element={
            <Sidebar>
              <Layout>
                <SaleProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
        {/* Trash */}
        <Route
          path="/avaliable-trash"
          element={
            <Sidebar>
              <Layout>
                <AvaliableStackTrash />
              </Layout>
            </Sidebar>
          }
        />{" "}
        <Route
          path="/detail-trash-item/:id"
          element={
            <Sidebar>
              <Layout>
                <AvlStackTrashDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/sale-trash"
          element={
            <Sidebar>
              <Layout>
                <SaleStackTrash />
              </Layout>
            </Sidebar>
          }
        />{" "}
        <Route
          path="/saletrash-item/:id"
          element={
            <Sidebar>
              <Layout>
                <SaleStackTrashDetail />
              </Layout>
            </Sidebar>
          }
        />
        {/* Trash */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
