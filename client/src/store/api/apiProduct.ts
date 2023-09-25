import axios from "axios";
import {
  PayloadGetProduct,
  PayloadOneProduct,
} from "../slices/productSlice/editProduct-slice";

const url = `${import.meta.env.VITE_APP_HOST}`;

export const fetchFindAllProduct = (page: PayloadGetProduct) =>
  axios.get(`${url}/products?page=${page.page}`, { withCredentials: true });

export const fetchFindOneProduct = (id: PayloadOneProduct) =>
  axios.get(`${url}/products/admin/${id.product_id}`, {
    withCredentials: true,
  });

export const fetchEditProduct = (id: any, payload: any) =>
  axios.patch(`${url}/products/admin/edit/${id}`, payload, {
    withCredentials: true,
  });
