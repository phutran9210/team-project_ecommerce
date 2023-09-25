import request from "./request";
import {
  PayloadCodeLogin,
  PayloadLogin,
} from "../constants/interface/authInterface";
//LoginAdmin step1
export const adminLogin = async (params: PayloadLogin) => {
  return request.post("/auth/api/v1/admin", params);
};

//LoginAdmin step2
export const adminLoginStep2 = async (payload: PayloadCodeLogin) => {
  return request.post("/auth/api/v1/admin/verify", payload);
};
