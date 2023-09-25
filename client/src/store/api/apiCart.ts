import axios from "axios";
import {
  PayloadUpdateCart,
  PayLoadChangeQuantity,
} from "../slices/cartSlice/cart-slice";

const url = `${import.meta.env.VITE_APP_HOST}`;

export const fetchCart = (userId: string) =>
  axios.get(`${url}/carts/${userId}`, { withCredentials: true });

export const fetchUpdateCart = (
  cartId: string,
  payload: Partial<PayloadUpdateCart>
) =>
  axios.patch(`${url}/carts/update/${cartId}`, payload, {
    withCredentials: true,
  });

export const fetchUpdateItem = (
  cartId: any,
  ItemId: any,
  payload: Partial<PayLoadChangeQuantity>
) =>
  axios.patch(`${url}/carts/update/${cartId}/${ItemId}`, payload, {
    withCredentials: true,
  });
