import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import ExpenseFilterReducer from "../redux/features/expense/filterSlice";
import saleReducer from "../redux/features/sale/saleSlice";
import saleTrashReducer from "../redux/features/saleStackTrash/saleStackTrashSlice";
import avaliabeStackTrashReducer from "../redux/features/avaliableStackTrash/avaliableStackTrashSlice";

// expense & loan
import expenseReducer from "../redux/features/expense/expenseSlice";
import loanReducer from "../redux/features/loan/loanSlice";
// report
import reportReducer from "../redux/features/report/reportSlice";
import reportAvlReport from "../redux/features/report/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    avalfilter: reportAvlReport,
    expensefilter: ExpenseFilterReducer,
    product: productReducer,
    avaliableStkTrash: avaliabeStackTrashReducer,
    sale: saleReducer,
    saleTrash: saleTrashReducer,
    // expense & loan
    expense: expenseReducer,
    loan: loanReducer,
    // report
    report: reportReducer,
  },
});
