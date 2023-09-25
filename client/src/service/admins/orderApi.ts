import request from "../request";

export const orderFindAll = async (
  order_id?: number,
  page?: number,
  tagValue?: string
) => {
  let endpoint = "/payment";

  const params = [];
  if (order_id) {
    params.push(`order_id=${order_id}`);
  }
  if (page !== undefined) {
    params.push(`page=${page}`);
  }
  if (tagValue) {
    params.push(`tagValue=${tagValue}`);
  }

  if (params.length > 0) {
    endpoint += `?${params.join("&")}`;
  }

  return request.get(endpoint);
};

export const updateOrder = async (order_id: number, order_status: any) => {
  return request.patch(`/payment/${order_id}`, order_status);
};
