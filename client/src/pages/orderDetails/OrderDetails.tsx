import { Link, useLocation } from "react-router-dom";
import { ROUTER_PATH } from "../../constants";
import { useTranslation } from "react-i18next";
import { orderDetailsStyle } from "../../constants/style";
import { Tooltip } from "antd";
import moment from "moment";

const OrderDetails = () => {
  const { t } = useTranslation(); //Translation
  const { state } = useLocation();

  const orderInfo = state?.order || {};
  const { order } = orderInfo;
  const { orderDetails } = orderInfo;
  const { voucher } = orderInfo;

  const formattedDate = moment(order.order_date).format("YYYY-MM-DD HH:mm:ss");

  //GET TOTAL FROM LOCAL STORAGE
  const total = localStorage.getItem("total");

  return (
    <div className="flex justify-center items-center w-screen">
      <div className="flex flex-col justify-center items-center text-center w-screen min-h-[100vh] sm:w-[90%] md:w-[100%] lg:w-[100%] 2xl:w-[70%]">
        {/* ORDER DETAILS CONTENT  */}
        <div className="order-details w-[50%] bg-base-300 py-[1rem] px-[1rem] rounded-md">
          {/* LOGO */}
          <Link to={ROUTER_PATH.HOME}>
            <div className="flex justify-center items-center">
              <img
                className="w-[2.5rem]"
                src="/logos/logo-icon-black.png"
                alt="logo"
              />
            </div>
          </Link>
          {/* title */}
          <div className="font-chakra text-[2rem] mt-[1rem] font-semibold">
            {t("order_details")}
          </div>
          <div className="mb-[.5rem] text-xs">{formattedDate}</div>

          {/* order details */}
          <div>
            {/* shipping address & payment method */}
            <div className="px-[1rem]">
              <div>
                <div className="text-xl font-oswald">{order.receiver_name}</div>
                <hr className="my-2" />
                <div>
                  <span className={orderDetailsStyle.spanStyle}>Phone: </span>
                  {order.phone}
                </div>
                <div>
                  <span className={orderDetailsStyle.spanStyle}>Email: </span>
                  {order.email}
                </div>
                <div>
                  <span className={orderDetailsStyle.spanStyle}>Address: </span>
                  {order.address}
                </div>
                <div>
                  <span className={orderDetailsStyle.spanStyle}>
                    {t("payment_method")}
                  </span>
                  : {order.payment_method === "cod" ? "COD" : "Credit card"}
                </div>
                {voucher !== null && (
                  <div>
                    <span className={orderDetailsStyle.spanStyle}>
                      Voucher:
                    </span>
                    <span className="text-red-500">
                      {" "}
                      -${voucher.discount_amount}
                    </span>{" "}
                    <span>({voucher.code_discount})</span>
                  </div>
                )}
              </div>
            </div>

            {/* ordered products table */}
            <div className="relative overflow-x-auto overflow-y-auto h-[40vh] z-20 bg-transparent">
              <hr className="my-2" />
              <table className="table">
                <tbody>
                  {/* render items here  */}
                  {orderDetails?.map((item: any) => (
                    <tr>
                      {/* column 1 */}
                      <td>
                        <div className="flex items-center space-x-7">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.product.primary_img} alt="img" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {item.product.product_name}{" "}
                              {item.product.onSale > 0 && (
                                <span className="text-red-500">
                                  -{item.product.onSale}%
                                </span>
                              )}
                              {item.engraving_content !== "" && (
                                <Tooltip
                                  placement="top"
                                  title={`Engraving text: ${item.engraving_content}`}
                                >
                                  <i className="fa-solid fa-signature" />
                                </Tooltip>
                              )}
                            </div>

                            <div className="text-sm opacity-50">
                              {item.product.product_description}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* column 2 */}
                      <th className="">
                        <div className="flex justify-center items-center sm:w-50rem] md:w-[7rem] lg:w-[4rem] 2xl:w-[7rem]">
                          x {item.quantity}
                        </div>
                      </th>

                      {/* column 3 */}
                      <th>
                        <div className="flex justify-center items-center">
                          ${item.discounted_price}
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TOTAL  */}
          <div className="relative">
            <img
              className="absolute w-[40%] left-3 bottom-0 z-10"
              src="/thanks.png"
              alt="thanks img"
            />
            <div className="flex justify-end text-xl font-bold font-oswald px-[1rem]">
              Total: ${total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
