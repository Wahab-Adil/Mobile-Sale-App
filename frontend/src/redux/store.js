import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import saleReducer from "../redux/features/sale/saleSlice";
import saleTrashReducer from "../redux/features/saleStackTrash/saleStackTrashSlice";
import avaliabeStackTrashReducer from "../redux/features/avaliableStackTrash/avaliableStackTrashSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    product: productReducer,
    avaliableStkTrash: avaliabeStackTrashReducer,
    sale: saleReducer,
    saleTrash: saleTrashReducer,
  },
});
