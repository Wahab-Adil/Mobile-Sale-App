import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expenseService from "./expenseService";
import { toast } from "react-toastify";

const initialState = {
  expense: null,
  expenses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Expense
export const createExpense = createAsyncThunk(
  "expense/create",
  async (formData, thunkAPI) => {
    try {
      return await expenseService.createExpense(formData);
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

// Get all Expenses
export const AllExpenses = createAsyncThunk(
  "expense/getAll",
  async (_, thunkAPI) => {
    try {
      return await expenseService.getAllExpenses();
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

// Delete an Expense
export const deleteExpense = createAsyncThunk(
  "expense/delete",
  async (id, thunkAPI) => {
    try {
      return await expenseService.deleteExpense(id);
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

// Get an Expense
export const getExpense = createAsyncThunk(
  "expense/get",
  async (id, thunkAPI) => {
    try {
      return await expenseService.SingleExpense(id);
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
// Update an Expense
export const updateExpense = createAsyncThunk(
  "expense/update",
  async ({ id, formData }, thunkAPI) => {
    console.log("id", id, formData);
    try {
      return await expenseService.updateExpense(id, formData);
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

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  extraReducers: (builder) => {
    builder

      // create Expense
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products.push(action.payload);
        toast.success("Expense created successfully");
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get Expenses
      .addCase(AllExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.expenses = action.payload.AllExpenses;
        console.log("pro", action.payload);
      })
      .addCase(AllExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete Expense
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Expense deleted successfully");
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get  Expense
      .addCase(getExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.expense = action.payload.Expense;
      })
      .addCase(getExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.success;
        toast.error(action.payload);
      })

      // update expense
      .addCase(updateExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Expense updated successfully");
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.expense.isLoading;
export const selectExpense = (state) => state.expense.expense;

export default expenseSlice.reducer;
