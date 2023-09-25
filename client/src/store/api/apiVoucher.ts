import axios from "axios";

const url = `${import.meta.env.VITE_APP_HOST}`;

export const fetchFindAllProduct = () =>
  axios.get(`${url}/discount`, { withCredentials: true });

export const fetchRemoveVoucher = (payload: { discount_code_id: number }) =>
  axios.delete(`${url}/discount/${payload.discount_code_id}`, {
    withCredentials: true,
  });
