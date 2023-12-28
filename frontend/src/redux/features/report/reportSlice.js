import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "./reportService";
import { toast } from "react-toastify";

const initialState = {
  purchaseReport: [],
  avaliableStkReport: [],
  outStkReport: [],
  salesReport: [],
  minSoldPRoduct: [],
  maxSoldProduct: [],
  expense: [],
  loan: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Date wise Purchased Items
export const DateWisePurchaseReport = createAsyncThunk(
  "report/purchase",
  async (formData, thunkAPI) => {
    try {
      return await reportService.DateWisePurchaseReport(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Date wise Avaliable Stack Product Report
export const purchaseAvaliableStackReport = createAsyncThunk(
  "avalstack/purchase",
  async (formData, thunkAPI) => {
    try {
      return await reportService.purchaseAvaliableStackReport(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Date wise Out Stack Product Report
export const purchaseOutStackReport = createAsyncThunk(
  "outstack/purchase",
  async (formData, thunkAPI) => {
    try {
      return await reportService.purchaseOutStackReport(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Date wise sale Report
export const DateWiseSaleReport = createAsyncThunk(
  "report/sale",
  async (formData, thunkAPI) => {
    try {
      return await reportService.DateWiseSaleReport(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Date wise Max sold Products
export const maximumSoldProductsReport = createAsyncThunk(
  "max/sold/products",
  async (formData, thunkAPI) => {
    try {
      return await reportService.maximumSoldProductsReport(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Date wise Min Sold Product Report
export const minimumSoldProductsReport = createAsyncThunk(
  "min/sold/products",
  async (formData, thunkAPI) => {
    try {
      return await reportService.minimumSoldProductsReport(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Date wise Expense Report
export const expenseReport = createAsyncThunk(
  "report/expense",
  async (formData, thunkAPI) => {
    try {
      return await reportService.expenseReport(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Date wise Loan Report
export const loanReport = createAsyncThunk(
  "report/loan",
  async (formData, thunkAPI) => {
    try {
      return await reportService.loanReport(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get Date Wise purchases
      .addCase(DateWisePurchaseReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DateWisePurchaseReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.purchaseReport = action.payload;
      })
      .addCase(DateWisePurchaseReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get Date wise Avaliable stack Report
      .addCase(purchaseAvaliableStackReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(purchaseAvaliableStackReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.avaliableStkReport = action.payload;
      })
      .addCase(purchaseAvaliableStackReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get Date wise Out stack Report
      .addCase(purchaseOutStackReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(purchaseOutStackReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.outStkReport = action.payload;
      })
      .addCase(purchaseOutStackReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get Date wise Out stack Report
      .addCase(DateWiseSaleReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DateWiseSaleReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.salesReport = action.payload;
      })
      .addCase(DateWiseSaleReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get Date wise Out stack Report
      .addCase(maximumSoldProductsReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(maximumSoldProductsReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.maxSoldProduct = action.payload;
      })
      .addCase(maximumSoldProductsReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get Date wise min sale Report
      .addCase(minimumSoldProductsReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(minimumSoldProductsReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.minSoldPRoduct = action.payload;
      })
      .addCase(minimumSoldProductsReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get Date wise expense Report
      .addCase(expenseReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(expenseReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.expense = action.payload;
      })
      .addCase(expenseReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get Date wise loan Report
      .addCase(loanReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loanReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.loan = action.payload;
      })
      .addCase(loanReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const getReport = (state) => state.report;
export default reportSlice.reducer;
