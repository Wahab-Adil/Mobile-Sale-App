import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import saleStackTrashService from "./saleStackTrashService";
import { toast } from "react-toastify";

const initialState = {
  saletrashItem: null,
  saletrashList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all Sales
export const SaleStackTrashList = createAsyncThunk(
  "sale/trash/all",
  async (_, thunkAPI) => {
    try {
      return await saleStackTrashService.getTrashList();
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
// Get Single Sale
export const getSaleSingleTrashItem = createAsyncThunk(
  "sale/get/trashItem",
  async (id, thunkAPI) => {
    try {
      return await saleStackTrashService.getSingleTrashItem(id);
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

// Update Single Sale
export const EmptySaleTrashList = createAsyncThunk(
  "/sale/trash/empty",
  async (thunkAPI) => {
    try {
      return await saleStackTrashService.getEmptyTrash();
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

// Delete a Sale
export const deleteSaleTrashItem = createAsyncThunk(
  "sale/trash/item/delete",
  async (id, thunkAPI) => {
    try {
      return await saleStackTrashService.deleteTrashItem(id);
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

const SaleStackTrashSlice = createSlice({
  name: "saleTrash",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get trash list
      .addCase(SaleStackTrashList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SaleStackTrashList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.saletrashList = action.payload;
      })
      .addCase(SaleStackTrashList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get  trash item
      .addCase(getSaleSingleTrashItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSaleSingleTrashItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.saletrashItem = action.payload;
        console.log("called", state.saletrashItem);
      })
      .addCase(getSaleSingleTrashItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // empty trash list = []
      .addCase(EmptySaleTrashList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(EmptySaleTrashList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("successfull");
      })
      .addCase(EmptySaleTrashList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete trash Item
      .addCase(deleteSaleTrashItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSaleTrashItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("trash item deleted successfully");
      })
      .addCase(deleteSaleTrashItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.saleTrash.isLoading;
export const selectSaleTrashItem = (state) => state.saletrashItem;
export default SaleStackTrashSlice.reducer;
