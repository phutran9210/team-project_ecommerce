import { CartStateType } from "../slices/cartSlice/cart-slice";

export const dataCartSelector = (state: { cartData: CartStateType }) =>
  state.cartData.dataCart;
