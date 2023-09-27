import request from "../request";
import { AdminFormState } from "../../pages/adminHomePage/createUser/AdminForm";
import { DiscountForm } from "../../pages/adminHomePage/products/voucher/Voucher";
//lấy toàn bộ users
export const getUsers = async () => {
  return request.get("/api/v1/admins");
};

//tạo mới user

export const createUsers = async (payload: AdminFormState) => {
  return request.post("/api/v1/admins", payload);
};

// chỉnh sửa user
export const editUsers = async (
  userEdit: string,
  payload: { [key: string]: any }
) => {
  return request.patch(`/api/v1/admins/${userEdit}`, payload);
};

//thêm mới voucher
export const createVoucher = async (payload: Partial<DiscountForm>) => {
  return request.post("/discount", payload);
};
//tìm product để giới hạn voucher
export const voucherFindProduct = async (payload: string) => {
  return request.get(`/products/db/voucher/search?payload=${payload}`);
};
//admin search product
export const adminSearchProduct = async (payload: any) => {
  return request.get(
    `/products/db/voucher/admin/search?payload=${payload.payload}`
  );
};
//dashboad categories data analyst
export const adminCategoriesAnalyst = async () => {
  return request.get(`/products/dashboard/analyst`);
};
//dashboad order-transport data analyst
export const adminOrderTransportAnalyst = async () => {
  return request.get(`/payment/dash-board/analyst`);
};

// api log
export const getLogger = async (page: number, rowsPerPage: number) => {
  return request.get(`/activity?page=${page}&rowsPerPage=${rowsPerPage}`);
};
