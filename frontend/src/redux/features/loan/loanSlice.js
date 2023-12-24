import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loanService from "./loanService";
import { toast } from "react-toastify";

const initialState = {
  loan: null,
  allLoans: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Loan
export const createLoan = createAsyncThunk(
  "loan/create",
  async (formData, thunkAPI) => {
    try {
      return await loanService.createLoan(formData);
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

// Get all Loans
export const getAllLoans = createAsyncThunk(
  "loan/getAll",
  async (_, thunkAPI) => {
    try {
      return await loanService.getAllLoan();
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

// Delete an loan
export const deleteLoan = createAsyncThunk(
  "loan/delete",
  async (id, thunkAPI) => {
    try {
      return await loanService.deleteLoan(id);
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

// Get an Loan
export const getLoan = createAsyncThunk("loan/get", async (id, thunkAPI) => {
  try {
    return await loanService.SingleLoan(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// Update an Loan
export const updateLoan = createAsyncThunk(
  "loan/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await loanService.updateLoan(id, formData);
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

const loanSlice = createSlice({
  name: "loan",
  initialState,
  extraReducers: (builder) => {
    builder

      // create loan
      .addCase(createLoan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLoan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Loan created successfully");
      })
      .addCase(createLoan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get loans
      .addCase(getAllLoans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLoans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.allLoans = action.payload;
      })
      .addCase(getAllLoans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete loan
      .addCase(deleteLoan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("loan deleted successfully");
      })
      .addCase(deleteLoan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get  Loan
      .addCase(getLoan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.loan = action.payload;
      })
      .addCase(getLoan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // update loan
      .addCase(updateLoan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Loan updated successfully");
      })
      .addCase(updateLoan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.loan.isLoading;
export const selectExpense = (state) => state.loan.loan;

export default loanSlice.reducer;
