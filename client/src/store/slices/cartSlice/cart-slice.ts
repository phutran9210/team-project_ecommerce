import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface } from "../../../constants/interface/ProductInterface";
import { log } from "console";

export type CartStateType = {
  loading: boolean;
  dataCart: {
    data: Partial<ProductInterface>[];
    message: string;
    status: number;
    cart_id: number;
  };
  error: Record<string, any>;
};

export type PayloadUpdateCart = {
  cart_id: number;
  product_id: string;
  quantity: number;
  engraving_content: string | undefined;
};

export type PayLoadChangeQuantity = {
  engraving_content?: string;
  product_id?: string;
  change?: number;
  action?: string;
  cart_detail_id?: string;
};

const initialState: CartStateType = {
  loading: false,
  dataCart: {
    data: [],
    message: "",
    status: 0,
    cart_id: 0,
  },
  error: {},
};

const cartState = createSlice({
  name: "cart_state",
  initialState,
  reducers: {
    //request lấy dữ liệu từ server về
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCartRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    getCartSuccess: (state, action) => {
      (state.loading = false), (state.dataCart = action.payload);
    },
    getCartFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },

    //thêm mới sản phẩm vào state dataCart
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addCartRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<Partial<ProductInterface>>
    ) => {
      state.loading = true;
    },
    addCartSuccess: (
      state,
      action: PayloadAction<Partial<ProductInterface>>
    ) => {
      (state.loading = false), state.dataCart.data.push(action.payload);
    },

    //lắng nghe sự kiện window để lấy cart
    localStorageChanged: (
      state,
      action: PayloadAction<Partial<ProductInterface>[]>
    ) => {
      state.dataCart.data = action.payload;
    },

    // cập nhật giỏ hàng phía server
    addToServerCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //tăng sản phẩm
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    increaseQuantityRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<PayLoadChangeQuantity>
    ) => {
      state.loading = true;
    },
    increaseQuantitySuccess: (state, action) => {
      console.log(action.payload);

      state.loading = false;
      const productIndex = state.dataCart.data.findIndex(
        (product) =>
          product.product_id === action.payload.product_id &&
          product.engraving_content === action.payload.engraving_content
      );
      if (productIndex !== -1 && state.dataCart.data[productIndex]) {
        const newQuantity =
          state.dataCart.data[productIndex].quantity! + action.payload.change;

        state.dataCart.data = state.dataCart.data.map((product, index) => {
          if (index === productIndex) {
            return {
              ...product,
              quantity: newQuantity,
            };
          }
          return product;
        });
      }
    },
    //xóa sản phẩm trong giỏ hàng
    removeItem: (state, action) => {
      state.loading = false;
      state.dataCart.data = [
        ...state.dataCart.data.slice(0, action.payload),
        ...state.dataCart.data.slice(action.payload + 1),
      ];
      // message.success("Remove success");
    },

    //request xóa sản phẩm
    removeItemRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<Partial<PayLoadChangeQuantity>>
    ) => {
      state.loading = true;
    },

    //request cập nhật cart
    changeItemRequest: (state, action) => {
      state.loading = true;
    },
    changeItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Remove cart when place order:
    removeCartRequest: (state) => {
      state.loading = true;
      state.dataCart.data = [];
    },
    removeCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeCartSuccess: (state) => {
      state.loading = false;
      state.dataCart.data = [];
    },
  },
});

export const {
  getCartRequest,
  getCartSuccess,
  getCartFailure,
  addCartRequest,
  addCartSuccess,
  localStorageChanged,
  increaseQuantityRequest,
  increaseQuantitySuccess,
  addToServerCartFailure,
  removeItem,
  removeItemRequest,
  changeItemRequest,
  changeItemFailure,
  removeCartRequest,
  removeCartFailure,
  removeCartSuccess,
} = cartState.actions;
export default cartState.reducer;
