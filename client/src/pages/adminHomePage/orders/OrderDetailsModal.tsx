import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { orderDetailsStyle } from "../../../constants/style";
import { OrderDetailType } from "./ListOrders";

interface OrderDetailsModalProps {
  handleCloseDetailsModal: () => void;
  orderData: any; // Dữ liệu đơn hàng
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  handleCloseDetailsModal,
  orderData,
}) => {
  console.log("modal", orderData);

  const totalAmount = orderData.orderDetails.reduce(
    (acc: number, item: OrderDetailType) => acc + item.discounted_price,
    0
  );
  const orderDetails = orderData.orderDetails;

  const { t } = useTranslation(); //Translation

  const handleCancel = () => {
    handleCloseDetailsModal();
  };

  return (
    <Modal
      style={{ top: 30 }}
      width={650}
      open
      onCancel={handleCancel}
      footer={[]}
    >
      <div>
        <div className="text-2xl flex justify-center items-center my-[1rem] font-chakra font-semibold">
          {t("order_details")}
        </div>
        <div>
          {/* shipping address & payment method */}
          <div className="px-[1rem]">
            <div>
              <div className="text-xl font-oswald">
                {orderData.receiver_name}
              </div>
              <hr className="my-2" />
              <div>
                <span className={orderDetailsStyle.spanStyle}>Phone: </span>
                {orderData.phone}
              </div>
              <div>
                <span className={orderDetailsStyle.spanStyle}>Email: </span>
                {orderData.email}
              </div>
              <div>
                <span className={orderDetailsStyle.spanStyle}>Address: </span>
                {orderData.address}
              </div>
              <div>
                <span className={orderDetailsStyle.spanStyle}>
                  {t("payment_method")}
                </span>
                : {orderData.payment_method}
              </div>
            </div>
          </div>

          {/* ordered products table */}
          <div className="overflow-x-auto overflow-y-auto h-[40vh]">
            <hr className="my-2" />
            <table className="table">
              <tbody>
                {orderDetails.map((item: OrderDetailType) => (
                  <tr key={item.order_detail_id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src="/sample.png" alt="img" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {item.product.product_name} &nbsp; &nbsp;
                            {item.discounted_price !== item.total_price && (
                              <>
                                <span className="text-red-500">
                                  - $
                                  {item.total_price -
                                    item.discounted_price * item.quantity}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="text-sm opacity-50">
                            {item.product_description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>
                        {item.engraving_content && (
                          <>
                            <i className="fa-solid fa-quote-left" />
                            {item.engraving_content}
                            <i className="fa-solid fa-quote-right" />
                          </>
                        )}
                      </div>
                    </td>

                    <td>x {item.quantity}</td>
                    <th>${item.discounted_price}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOTAL  */}
          <div className="text-xl font-bold font-oswald px-[1rem]">
            Total: ${totalAmount}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
