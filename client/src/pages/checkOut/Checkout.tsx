import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { buttonStyle, inputStyle } from "../../constants/style";
import { ROUTER_PATH } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Tooltip, notification } from "antd";
import axios from "axios";
import { ProductInterface } from "../../constants/interface/ProductInterface";
// import { useSelector } from "react-redux";
// import { dataCartSelector } from "../../store/selectors/cartSelector";

interface VoucherPayload {
  product_id: string;
  product_name: string;
}
interface OrderForm {
  order_details: any;
  voucher: string;
  order: {
    receiver_name: string;
    email: string;
    phone: string;
    address: string;
    payment_method?: string;
    payment_status: string;
  };
}

const Checkout: React.FC = () => {
  const { t } = useTranslation(); //Translation:
  const [creditSelected, setCreditSelected] = useState<boolean>(false); //Credit card payment selected
  const [cashSelected, setCashSelected] = useState<boolean>(false); //COD payment selected
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [voucher, setVoucher] = useState<string>(""); //Voucher
  const [voucherPayload, setVoucherPayload] = useState<VoucherPayload[]>([]); //Voucher payload
  const [voucherAmount, setVoucherAmount] = useState<number>(0); //Voucher amount
  const [total, setTotal] = useState<number>(0);

  //CREDIT-CARD FORM:
  const [creditCardForm, setCreditCardForm] = useState({
    cardHolder: "",
    cardNumber: "",
    expiredDate: "",
    cvv: "",
  });

  const navigate = useNavigate();

  //CART FROM LOCAL STORAGE:
  // const cart = localStorage.getItem("cart") || "{}";
  // const cartItems = (JSON.parse(cart)?.data as ProductInterface[]) || [];
  const cart = localStorage.getItem("cart") || "[]";
  const cartItems = (JSON.parse(cart) as ProductInterface[]) || [];

  // const cartData = JSON.parse(localStorage.getItem("cart") || "{}");
  // const cartId = cartData.cart_id;
  const cartId = cartItems[0]?.cart_id || "";

  //REDUX CART
  // const cartItemsData = useSelector(dataCartSelector);
  // const cartItems = cartItemsData.data as ProductInterface[];
  // const dispatch = useDispatch();

  //GET ALL PRODUCTS NAME AND PRODUCT ID FROM LOCALSTORAGE AND PUT TO VOUCHER PAYLOAD:
  const getAllProductsNameAndId = () => {
    if (!Array.isArray(cartItems)) return;

    const productsNameAndId = cartItems.map((item: any) => ({
      product_name: item.product_name,
      product_id: item.product_id,
    }));
    setVoucherPayload(productsNameAndId);
  };

  useEffect(() => {
    getAllProductsNameAndId();
  }, [voucher]);

  useEffect(() => {
    console.log("cartItems: ", cartItems);

    if (cartItems.length === 0) {
      navigate(ROUTER_PATH.HOME);
    }
  }, [cartItems]);

  //ORDERFORM:
  const [orderForm, setOrderForm] = useState<OrderForm>({
    order_details: cartItems,
    voucher: voucher,
    order: {
      receiver_name: "",
      email: "",
      phone: "",
      address: "",
      payment_method: "",
      payment_status: "",
    },
  });

  //Modal Credit card:
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  //GET SUBTOTAL FROM LOCALSTORAGE:
  const subtotal = localStorage.getItem("subtotal") || "";

  //PAYMENT BY CREDIT-CARD:
  const handlePaymentByCredit = () => {
    setCreditSelected(!creditSelected);
    setOrderForm((prevOrderForm) => ({
      ...prevOrderForm,
      order: {
        ...prevOrderForm.order,
        payment_method: "prepaid",
        payment_status: "paid",
      },
    }));
    setCashSelected(false);
    if (creditSelected === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  //PAYMENT BY CASH:
  const handlePaymentByCash = () => {
    setCashSelected(!cashSelected);
    setOrderForm((prevOrderForm) => ({
      ...prevOrderForm,
      order: {
        ...prevOrderForm.order,
        payment_method: "cod",
        payment_status: "unpaid",
      },
    }));
    setCreditSelected(false);
  };

  //VALIDATE CREDIT-CARD INFO INPUTS:
  const validateCardInputs = () => {
    if (
      creditCardForm.cardHolder === "" ||
      creditCardForm.cardNumber === "" ||
      creditCardForm.expiredDate === "" ||
      creditCardForm.cvv === ""
    ) {
      notification.error({
        message: "Please fill in all card infomation!",
        duration: 2,
      });
      return false;
    }
    return true;
  };

  //VALIDATE SHIPPING INFO INPUTS:
  const validateShippingInputs = () => {
    if (
      orderForm.order.receiver_name === "" ||
      orderForm.order.phone === "" ||
      orderForm.order.email === "" ||
      orderForm.order.address === ""
    ) {
      notification.error({
        message: "Please complete shipping infomation!",
        duration: 2,
      });
      return false;
    }
    return true;
  };

  //HANDLE SUBMIT CREDIT-CARD:
  const handleSubmitCreditCard = () => {
    if (validateCardInputs() === false) {
      return;
    } else {
      notification.success({
        message: "Credit card confirmed!",
        duration: 2,
      });

      setOpen(false);
      setCreditSelected(true);
    }
  };

  //HANDLE APPLY VOUCHER:
  const handleApplyVoucher = (e: any) => {
    setVoucher(e.target.value);
    setOrderForm({
      ...orderForm,
      voucher: e.target.value,
    });
  };

  //HANDLE CHANGE CREDIT-CARD INPUT:
  const handleChangeCardInput = (e: any) => {
    const { name, value } = e.target;
    setCreditCardForm({
      ...creditCardForm,
      [name]: value,
    });
  };

  //HANDLE CHANGE SHIPPING INPUT:
  const handleChangeShippingInput = (e: any) => {
    const { name, value } = e.target;
    setOrderForm({
      ...orderForm,
      order: {
        ...orderForm.order,
        [name]: value,
      },
    });
  };

  //HANDLE SUBMIT VOUCHER:
  const handleSubmitVoucher = async (e: any) => {
    e.preventDefault();

    if (!voucherPayload) {
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:3008/payment/voucher/${voucher}`,
        voucherPayload
      );

      const { message } = res.data;

      if (message === "Voucher is valid.") {
        const { discount_amount } = res.data.data;
        setVoucherAmount(discount_amount);

        //SAVE VOUCHER AMOUNT TO LOCALSTORAGE:
        localStorage.setItem("voucherAmount", JSON.stringify(discount_amount));

        return notification.success({
          message: "Voucher applied successfully!",
        });
      }

      return notification.error({
        message: message,
      });
    } catch (error: any) {
      const { message } = error.response.data;
      notification.error({
        message: message,
      });
      console.log("Error when applying voucher: ", message);
    }
  };

  //GET VOUCHER AMOUNT FROM LOCALSTORAGE:
  useEffect(() => {
    const voucherAmount = JSON.parse(
      localStorage.getItem("voucherAmount") || "0"
    );
    setVoucherAmount(voucherAmount);
  }, [voucherAmount]);

  //SAVE TOTAL AFTER APPLYING VOUCHER WHEN VOUCHER AMOUNT CHANGES:
  useEffect(() => {
    localStorage.setItem(
      "total",
      JSON.stringify(Number(subtotal) - voucherAmount)
    );

    //GET TOTAL FORM LOCALSTORAGE:
    const total = JSON.parse(localStorage.getItem("total") || "0");
    setTotal(total);
  }, [voucherAmount]);

  //HANDLE CANCEL VOUCHER:
  const handleCancelVoucher = () => {
    setVoucherAmount(0);
    setVoucher("");
    localStorage.removeItem("voucherAmount");
    localStorage.removeItem("total");
  };

  //HANDLE PLACE ORDER:
  const handlePlaceOrder = async () => {
    const isValidCash = cashSelected; //if cash is selected
    const isValidCreditCard = creditSelected && validateCardInputs();
    const isValidShippingForm = validateShippingInputs();

    if (!isValidCash && !isValidCreditCard) {
      return notification.error({
        message: "Please choose payment method!",
      });
    }

    if (!isValidShippingForm) {
      return;
    }
    try {
      if (cartId) {
        const response = await axios.post(
          `http://localhost:3008/payment/checkout/${cartId}`,
          orderForm,
          { withCredentials: true }
        );
        console.log("response when placing order: ", response.data);

        const { message } = response.data;
        notification.success({
          message: message,
        });

        //Set cart to empty:
        localStorage.setItem("cart", JSON.stringify([]));

        //Delete subtotal from local storage:
        localStorage.removeItem("subtotal");

        // //Delete voucherAmount from local storage:
        localStorage.removeItem("voucherAmount");

        navigate(`/order-details/${cartId}`, {
          state: { order: response.data },
        });
      }
    } catch (error: any) {
      const { message } = error.response.data;
      console.log("Error when placing order: ", message);
    }
  };

  return (
    <>
      {/* CREDIT CARD MODAL  */}
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        style={{ top: 60 }}
        footer={null}
      >
        <div>
          <div className="credit-card-modal-title flex justify-center items-center text-[1.5rem] font-semibold font-chakra">
            {t("credit_info")}
          </div>
          <div className="credit-modal flex justify-center items-center">
            <div className="form">
              <div className="credit-card-info--form">
                <div className="input_container">
                  <label htmlFor="password_field" className="input_label">
                    {t("card_holder")}
                  </label>
                  <input
                    id="password_field"
                    className="input_field"
                    type="text"
                    maxLength={30}
                    name="cardHolder"
                    value={creditCardForm.cardHolder}
                    title="Inpit title"
                    placeholder={t("enter_name")}
                    onChange={handleChangeCardInput}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="password_field" className="input_label">
                    {t("card_number")}
                  </label>
                  <input
                    id="password_field"
                    className="input_field"
                    type="text"
                    maxLength={16}
                    name="cardNumber"
                    value={creditCardForm.cardNumber}
                    title="Inpit title"
                    placeholder="0000 0000 0000 0000"
                    onChange={handleChangeCardInput}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="password_field" className="input_label">
                    {t("expiry_date")}
                  </label>
                  <div className="split">
                    <input
                      id="password_field"
                      className="input_field"
                      type="text"
                      maxLength={5}
                      name="expiredDate"
                      value={creditCardForm.expiredDate}
                      title="Expiry Date"
                      placeholder="01/23"
                      onChange={handleChangeCardInput}
                    />
                    <input
                      id="password_field"
                      className="input_field"
                      type="text"
                      maxLength={3}
                      name="cvv"
                      value={creditCardForm.cvv}
                      title="CVV"
                      placeholder="CVV"
                      onChange={handleChangeCardInput}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleSubmitCreditCard}
                className="purchase--btn font-chakra"
              >
                {t("confirm_btn")}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* CHECKOUT PAGE CONTENT  */}
      <div className="checkout min-h-[100vh] flex justify-center items-start text-center md:w-[100%]">
        {/* LEFT SIDE */}
        <div className="checkout-left w-2/3 py-5 px-6 sm:px-10 md:px-4">
          {/* LOGO  */}
          <Link to={ROUTER_PATH.HOME}>
            <img className="w-[20rem]" src="/logos/black-logo.png" alt="logo" />
          </Link>

          {/* CHECKOUT STEPS  */}
          <div className="flex justify-start items-center gap-2 py-3">
            <Link to={ROUTER_PATH.CART}>
              <span className="hover:underline">{t("cart")}</span>
            </Link>
            <i className="fa-solid fa-chevron-right"></i>
            <Link to={ROUTER_PATH.CHECKOUT}>
              <span className="font-bold hover:underline">
                {t("checkout_sm")}
              </span>
            </Link>
            <i className="fa-solid fa-chevron-right"></i>
            <span>{t("complete")}</span>
          </div>

          {/* PAYMENTS DIVIDER ON DESKTOP SCREEN */}
          <div className="divide-zone-1 flex w-full">
            {/* credit card  */}
            <div
              onClick={handlePaymentByCredit}
              className={`payments grid h-20 w-1/2 bg-base-200 flex-grow card rounded-box place-items-center ${
                creditSelected === true
                  ? "border-2 border-blue-400 rounded-[15px]"
                  : ""
              }`}
            >
              <div className="payments1 flex justify-center items-center gap-3 cursor-pointer">
                <img src="/payments/visa.png" alt="visa payments" />
                <img src="/payments/master.png" alt="master payments" />
                <img src="/payments/AMEX.png" alt="amex payments" />
                <img src="/payments/JCB.jpg" alt="JCB card" />
              </div>
            </div>
            <div className="divider divider-horizontal">{t("or")}</div>

            {/* cash  */}
            <div
              onClick={handlePaymentByCash}
              className={`grid h-20 w-1/2 flex-grow card bg-base-200 rounded-box place-items-center cursor-pointer ${
                cashSelected === true
                  ? "border-2 border-blue-400 rounded-[15px]"
                  : ""
              }`}
            >
              <img
                className="w-[7rem] h-[4rem]"
                src="/payments/COD.png"
                alt="COD"
              />
            </div>
          </div>

          {/* PAYMENTS DIVIDER ON MOBILE SCREEN */}
          <div className="divide-zone-2 border-opacity-50 hidden">
            <div
              onClick={handlePaymentByCredit}
              className="grid w-full card rounded-box place-items-center"
            >
              <div
                className={`${
                  creditSelected === true
                    ? "border-2 border-blue-400 rounded-[15px]"
                    : ""
                }`}
              >
                <div className="payments2 flex justify-center items-center gap-5 cursor-pointer">
                  <img src="/payments/visa.png" alt="visa payments" />
                  <img src="/payments/master.png" alt="master payments" />
                  <img src="/payments/AMEX.png" alt="amex payments" />
                  <img src="/payments/JCB.jpg" alt="JCB card" />
                </div>
              </div>
            </div>
            <div className="divider">OR</div>
            <div
              onClick={handlePaymentByCash}
              className={`grid w-full card rounded-box place-items-center cursor-pointer ${
                cashSelected === true
                  ? "border-2 border-blue-400 rounded-[15px]"
                  : ""
              }`}
            >
              <img
                className="cod w-[5rem] h-[4rem]"
                src="/payments/COD.png"
                alt="COD"
              />
            </div>
          </div>

          {/* SHIPPING INFOMATION */}
          <div className="flex justify-start items-center mt-[3rem] text-xl font-chakra">
            {t("shipping_info")}
          </div>

          <div className="shipping-inputs my-[2rem]">
            <div className="input-field1 flex justify-start gap-[2rem] items-center">
              {/* input receiver's name */}
              <div className={inputStyle.shippingInputField}>
                <label className="label">
                  <span className="label-text">{t("receiver")}:</span>
                </label>
                <input
                  type="text"
                  maxLength={25}
                  name="receiver_name"
                  value={orderForm.order.receiver_name}
                  placeholder={t("enter_receiver")}
                  onChange={handleChangeShippingInput}
                  className={inputStyle.shippingInput}
                />
              </div>
              {/* input phone */}
              <div className={inputStyle.shippingInputField}>
                <label className="label">
                  <span className="label-text">{t("phone")}:</span>
                </label>
                <input
                  type="text"
                  maxLength={15}
                  name="phone"
                  value={orderForm.order.phone}
                  placeholder={t("enter_phone")}
                  onChange={handleChangeShippingInput}
                  className={inputStyle.shippingInput}
                />
              </div>
            </div>

            <div className="input-field2 flex justify-start gap-[2rem] items-center">
              {/* input email */}
              <div className={inputStyle.shippingInputField}>
                <label className="label">
                  <span className="label-text">{t("email")}:</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={orderForm.order.email}
                  placeholder={t("enter_email")}
                  onChange={handleChangeShippingInput}
                  className={inputStyle.shippingInput}
                />
              </div>

              {/* input address */}
              <div className={inputStyle.shippingInputField}>
                <label className="label">
                  <span className="label-text">{t("address")}:</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={orderForm.order.address}
                  placeholder={t("enter_address")}
                  onChange={handleChangeShippingInput}
                  className={inputStyle.shippingInput}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className={`${buttonStyle.thirdBtn} flex justify-start`}
          >
            {t("place_order")}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right w-1/3 min-h-[100vh] border-l border-gray-300 py-5 px-6 overflow-y-auto sm:px-10 md:px-3">
          {Array.isArray(cartItems) &&
            cartItems?.map((item) => (
              <div key={item.cart_detail_id} className="overflow-x-auto">
                <table className="table">
                  <tbody>
                    <tr>
                      <td key={item.cart_detail_id}>
                        <div className="flex items-center space-x-3">
                          <div className="avatar relative border border-[#b4b4b4] py-1 px-1 rounded-md">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.primary_img} alt="image" />
                            </div>
                            <span className="bg-[#a1a1a1] absolute left-[3rem] top-[-.5rem] w-[1.2rem] text-center rounded-[100%]">
                              {item.quantity}
                            </span>
                          </div>
                          <div>
                            <div className="font-bold">
                              {item.product_name}&nbsp;
                              {Number(item.onSale) > 0 && (
                                <span className="text-red-500">
                                  -{item.onSale}%
                                </span>
                              )}
                              &nbsp;
                              {item.engraving_checked === 1 && (
                                <Tooltip
                                  placement="top"
                                  title={`Engraving text: ${item.engraving_content}`}
                                >
                                  <i className="fa-solid fa-signature"></i>
                                </Tooltip>
                              )}
                            </div>
                            <div className="checkout-des text-sm opacity-50 md:hidden lg:flex 2xl:flex">
                              {item.product_description}
                            </div>
                          </div>
                        </div>
                      </td>

                      <th>
                        <div className="">
                          $
                          {Number(
                            (
                              (Number(item.price) -
                                (Number(item.price) * Number(item.onSale)) /
                                  100) *
                              item.quantity
                            ).toFixed()
                          ) + (item.engraving_checked === 1 ? 30 : 0)}
                        </div>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}

          {/* VOUCHER FIELD  */}

          <div className="border border-gray-300 mt-[1.5rem] rounded-sm">
            <div className="flex justify-between items-center">
              <form onSubmit={handleSubmitVoucher}>
                <input
                  disabled={voucherAmount > 0}
                  className="outline-none py-1 px-3 bg-transparent"
                  type="text"
                  value={voucher}
                  onChange={handleApplyVoucher}
                  placeholder={t("voucher")}
                />
              </form>

              <button
                onClick={(e) =>
                  voucherAmount > 0
                    ? handleCancelVoucher()
                    : handleSubmitVoucher(e)
                }
                className={`${buttonStyle.thirdBtn} md:text-[.7rem]`}
              >
                {voucherAmount > 0 ? t("remove_voucher") : t("apply")}
              </button>
            </div>
          </div>

          <hr className="w-full my-[1.5rem]" />

          {/* SUBTOTAL */}
          <div className="flex justify-between text-sm">
            <div className="font-medium">{t("subtotal")}: </div>
            <div className="font-semibold">${Number(subtotal).toFixed()}</div>
          </div>

          {/* VOUCHER */}
          {voucherAmount > 0 && (
            <div className="flex justify-between text-sm">
              <div className="font-medium">{t("voucher_amount")}: </div>
              <div className="font-semibold text-red-500">
                {" "}
                -${voucherAmount}
              </div>
            </div>
          )}
          {/* TOTAL  */}
          <div className="flex justify-between">
            <div className="font-bold">{t("total")}: </div>
            <div className="font-semibold">${Number(total).toFixed()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
