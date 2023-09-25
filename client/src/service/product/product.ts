import request from "../request";

export const createNewProduct = async (body: any) => {
  return request.post("/products", body);
};
