import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import saleService from "./saleService";
import { toast } from "react-toastify";

const initialState = {
  sale: null,
  sales: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all Sales
export const AllSales = createAsyncThunk(
  "sales/getAll",
  async (_, thunkAPI) => {
    try {
      return await saleService.getAllSales();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Get Single Sale
export const getSale = createAsyncThunk("sale/get", async (id, thunkAPI) => {
  try {
    return await saleService.getSingleSale(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Single Sale
export const updateSale = createAsyncThunk(
  "sale/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      console.log("formData", formData);
      return await saleService.updateSale(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a Sale
export const deleteSale = createAsyncThunk(
  "sale/delete",
  async (id, thunkAPI) => {
    try {
      return await saleService.deleteSale(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get sales
      .addCase(AllSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.sales = action.payload.saleProductsList;
      })
      .addCase(AllSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get  Sale
      .addCase(getSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.sale = action.payload;
      })
      .addCase(getSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // update Sale
      .addCase(updateSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("sale updated successfully");
      })
      .addCase(updateSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete Sale
      .addCase(deleteSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("sale deleted successfully");
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.sale.isLoading;
export const selectSale = (state) => state.sale.sale;
export default saleSlice.reducer;
