import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Voucher = {
  code_discount: string;
  discount_amount: number;
  start_date: string | null;
  end_date: string | null;
  discount_scope: string;
  discount_description: string | null;
  use_limit: number | null;
  discount_code_id: number;
  discountCodeMappings: any;
};

const createVoucher = createSlice({
  name: "voucher_slice",
  initialState: {
    loading: false,
    data: [] as Voucher[],
    error: {},
  },
  reducers: {
    getVoucherRequest: (state) => {
      state.loading = true;
    },
    getVoucherSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getVoucherFailure: (state, action) => {
      state.error = false;
      state.error = action.payload;
    },

    //add to render
    renderVoucherRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
    },
    renderVoucherSuccess: (state, action) => {
      state.loading = false;
      state.data.unshift(action.payload);
    },

    // remove
    removeVoucherRequest: (
      state,
      action: PayloadAction<{ discount_code_id: number }>
    ) => {
      state.loading = true;
    },
    removeVoucherSuccess: (state, action) => {
      state.loading = false;
      const id = action.payload.discount_code_id;
      const filterData = state.data.filter(
        (voucher) => voucher.discount_code_id !== id
      );
      state.data = filterData;
    },
    removeVoucherFailure: (state, action) => {
      state.error = false;
      state.error = action.payload;
    },
  },
});

export const {
  getVoucherRequest,
  getVoucherSuccess,
  getVoucherFailure,
  renderVoucherRequest,
  renderVoucherSuccess,
  removeVoucherRequest,
  removeVoucherSuccess,
  removeVoucherFailure,
} = createVoucher.actions;
export default createVoucher.reducer;
