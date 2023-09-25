import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const createProduct = createSlice({
  name: "create_slice",
  initialState: {
    loading: false,
    dataForm: {},
    dataFormDetail: {},
    parent_categories: null,
    resetAllForm: false,
  },
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendCategories: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },

    sendCategoriesSuccess: (state, action) => {
      state.loading = true;
      state.parent_categories = action.payload;
    },
    //Reset toàn bộ form
    sendResetAllForm: (state) => {
      state.loading = true;
    },
    sendResetAllFormSuccess: (state) => {
      state.loading = false;
      state.resetAllForm = true;
    },
    //Set default resetAllForm
    setDefaultResetAllForm: (state) => {
      state.loading = true;
    },
    setDefaultResetAllFormSuccess: (state) => {
      state.loading = false;
      state.resetAllForm = false;
    },
  },
});

export const {
  sendCategories,
  sendCategoriesSuccess,
  sendResetAllForm,
  sendResetAllFormSuccess,
  setDefaultResetAllForm,
  setDefaultResetAllFormSuccess,
} = createProduct.actions;

export default createProduct.reducer;
