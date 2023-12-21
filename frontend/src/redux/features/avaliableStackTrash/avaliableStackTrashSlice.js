import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import avaliableStackTrashService from "./avaliableStackTrashService";
import { toast } from "react-toastify";

const initialState = {
  trashItem: null,
  trashList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// Get all Sales
export const AvaliableStackTrashList = createAsyncThunk(
  "product/trash/all",
  async (_, thunkAPI) => {
    try {
      return await avaliableStackTrashService.getTrashList();
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
export const getSingleTrashItemFun = createAsyncThunk(
  "product/get/trashItem",
  async (id, thunkAPI) => {
    try {
      return await avaliableStackTrashService.getSingleTrashItem(id);
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
export const EmptyTrashList = createAsyncThunk(
  "product/trash/empty",
  async (thunkAPI) => {
    try {
      return await avaliableStackTrashService.getEmptyTrash();
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
export const deleteTrashItem = createAsyncThunk(
  "trash/item/delete",
  async (id, thunkAPI) => {
    try {
      return await avaliableStackTrashService.deleteTrashItem(id);
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

const avlStackTrashSlice = createSlice({
  name: "productTrash",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get trash list
      .addCase(AvaliableStackTrashList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AvaliableStackTrashList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.trashList = action.payload;
      })
      .addCase(AvaliableStackTrashList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get  trash item
      .addCase(getSingleTrashItemFun.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleTrashItemFun.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.trashItem = action.payload;
        console.log("getted trash item", state.trashItem);
      })
      .addCase(getSingleTrashItemFun.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete trash Item
      .addCase(deleteTrashItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTrashItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("item deleted successfully");
      })
      .addCase(deleteTrashItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // empty trash list = []
      .addCase(EmptyTrashList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(EmptyTrashList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(" Trash succefully become Empty");
      })
      .addCase(EmptyTrashList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.proudctTrash.isLoading;
export const selectProudctTrashItem = (state) => state.proudctTrash.trashItem;
export default avlStackTrashSlice.reducer;
