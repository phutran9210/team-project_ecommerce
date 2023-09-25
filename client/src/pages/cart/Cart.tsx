import { Link } from "react-router-dom";
import { ROUTER_PATH } from "../../constants";
import { buttonStyle } from "../../constants/style";
import { useState, useEffect } from "react";
import { ProductInterface } from "../../constants/interface/ProductInterface";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import {
  increaseQuantityRequest,
  PayLoadChangeQuantity,
  removeItemRequest,
} from "../../store/slices/cartSlice/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { dataCartSelector } from "../../store/selectors/cartSelector";

const Cart: React.FC = () => {
  const [subtotal, setSubtotal] = useState<number>(0); //Subtotal
  //Translation:
  const { t } = useTranslation();

  // //CART FROM LOCAL STORAGE:
  // const cart = localStorage.getItem("cart") || {};
  // const cartItems = cart.data as ProductInterface[];

  //REDUX CART
  const cartItemsData = useSelector(dataCartSelector);
  const cartItems = cartItemsData.data as ProductInterface[];
  const dispatch = useDispatch();

  //Subtotal:
  useEffect(() => {
    if (cartItems) {
      const subtotal = cartItems.reduce((acc: any, item: any) => {
        const price = Number(item.price);
        const discount = (price * Number(item.onSale)) / 100;

        if (item.engraving_checked === 1) {
          return acc + (price - discount + 30) * item.quantity;
        } else {
          return acc + (price - discount) * item.quantity;
        }
      }, 0);
      //Get 2 decimal after dot of subtotal:
      const convertSubTotal = Number(subtotal.toFixed());

      localStorage.setItem("subtotal", convertSubTotal.toString());
      setSubtotal(Number(subtotal.toFixed()));
    }
  }, [cartItems]);

  //Increase quantity:
  const increaseQuantity = (item: ProductInterface) => {
    //Increase quantity in Redux:
    const payloadChange: PayLoadChangeQuantity = {
      cart_detail_id: item.cart_detail_id,
      product_id: item.product_id,
      engraving_content: item.engraving_content,
      change: +1,
    };
    dispatch(increaseQuantityRequest(payloadChange));

    //Increase quantity in Local Storage:
    // const newCartItems = cartItems.map((cartItem) => {
    //   if (cartItem.product_id === item.product_id) {
    //     return {
    //       ...cartItem,
    //       quantity: cartItem.quantity + 1,
    //     };
    //   }
    //   return cartItem;
    // });
    // const newCart = {
    //   ...cart,
    //   data: newCartItems,
    // };
    // localStorage.setItem("cart", JSON.stringify(newCart));
  };

  //Decrease quantity:
  const decreaseQuantity = (item: ProductInterface) => {
    //Decrese quantity in Redux:
    const payloadChange: PayLoadChangeQuantity = {
      cart_detail_id: item.cart_detail_id,
      product_id: item.product_id,
      engraving_content: item.engraving_content,
      change: -1,
    };
    dispatch(increaseQuantityRequest(payloadChange));

    //Decrease quantity in Local Storage:
    //   const newCartItems = cartItems.map((cartItem) => {
    //     if (cartItem.product_id === item.product_id) {
    //       return {
    //         ...cartItem,
    //         quantity: cartItem.quantity - 1,
    //       };
    //     }
    //     return cartItem;
    //   });
    //   const newCart = {
    //     ...cart,
    //     data: newCartItems,
    //   };
    //   localStorage.setItem("cart", JSON.stringify(newCart));
  };

  //remove product
  const handleDelete = (item: ProductInterface) => {
    const payloadChange: Partial<PayLoadChangeQuantity> = {
      cart_detail_id: item.cart_detail_id,
      product_id: item.product_id,
      engraving_content: item.engraving_content,
      action: "remove",
    };
    dispatch(removeItemRequest(payloadChange));
  };

  return (
    <div className="cart min-h-[100vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] 2xl:min-h-[100vh]">
      <div className="bg-black h-[4rem]" />

      {/* HEAD  */}
      <div className="cart-head flex justify-between items-center h-[4rem] px-[2rem]">
        {/* HEAD LEFT */}
        <div className="cart-head-back text-xs hover:text-yellow-500 sm:w-[25%]">
          <Link to={ROUTER_PATH.HOME}>
            <i className="fa-solid fa-arrow-left-long"></i> &nbsp;
            {t("countinue_shopping")}
          </Link>
        </div>

        {/* HEAD CENTER */}
        <div className="cart-head-title text-center text-[2.5rem] text-[#4A4A4A] font-chakra sm:w-[50%]">
          {t("my_cart")}
        </div>

        {/* HEAD RIGHT */}
        <div className={`checkout-btn sm:w-[25%] flex justify-end`}>
          {cartItems && cartItems.length > 0 && (
            <Link
              to={`/checkout/${cartItemsData.cart_id}`}
              className={`cart-head-btn ${buttonStyle.thirdBtn} cursor-pointer`}
            >
              {t("checkout")}
            </Link>
          )}
        </div>
      </div>

      {/* CONTENT */}
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="overflow-x-auto px-[3rem]">
            <table className="table">
              {/* content head */}
              <thead>
                <tr>
                  <th>{t("product")}</th>
                  <td></td>
                  <td>{t("price")}</td>
                  <td className="text-center">{t("quantity")}</td>
                  <td>{t("item_total")}</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems?.map((item, index) => (
                    <tr key={index}>
                      {/* PRODUCT NAME & DESCRIPTION */}
                      <th className="sm:min-w-[15rem]">
                        <Link to={`/product/${item.product_id}`}>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={item.primary_img}
                                  alt="product image"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold font-oswald">
                                {item.product_name} &nbsp;
                                {Number(item.onSale) > 0 && (
                                  <span className="text-red-500">
                                    -{item.onSale}%
                                  </span>
                                )}
                              </div>
                              <div className="text-sm opacity-50">
                                {item.product_description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </th>

                      {/* ENGRAVING */}
                      {item.engraving_checked === 1 ? (
                        <td className="sm:min-w-[5rem]">
                          <div className="font-semibold text-red-500">
                            +$30 Engraving
                          </div>
                          <div>
                            <i className="fa-solid fa-quote-left" />{" "}
                            {item.engraving_content}{" "}
                            <i className="fa-solid fa-quote-right" />
                          </div>
                        </td>
                      ) : (
                        <td />
                      )}

                      {/* PRICE */}
                      <td className="font-chakra sm:min-w-[5rem]">
                        $
                        {Number(item.price) -
                          Number(
                            (
                              (Number(item.price) * Number(item.onSale)) /
                              100
                            ).toFixed()
                          )}
                      </td>

                      {/* QUANTITY */}
                      <td>
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => decreaseQuantity(item)}
                            className={buttonStyle.quantity_btn}
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            onClick={() => increaseQuantity(item)}
                            className={buttonStyle.quantity_btn}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* ITEM TOTAL */}
                      <td>
                        <span className="text-sm font-chakra">
                          $
                          {Number(
                            (
                              (Number(item.price) -
                                (Number(item.price) * Number(item.onSale)) /
                                  100) *
                              item.quantity
                            ).toFixed()
                          ) + (item.engraving_checked === 1 ? 30 : 0)}
                        </span>
                      </td>

                      {/* DELETE PRODUCT */}
                      <td>
                        <Tooltip placement="top" title="delete">
                          <button
                            onClick={() => handleDelete(item)}
                            className="hover:text-red-500"
                          >
                            <i className="fa-solid fa-trash-can" />
                          </button>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <hr className="w-scceen my-[2rem]" />

          {/* SUBTOTAL */}
          <div className="flex justify-end px-[3rem] my-[2rem]">
            <div className="cart-bottom flex justify-around items-center gap-[20rem]">
              <div className="font-chakra font-semibold">{t("subtotal")}: </div>
              {subtotal > 0 && <div className="font-semibold">${subtotal}</div>}
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <img className="w-[30%]" src="/emptycart.jpg" alt="" />
        </div>
      )}
    </div>
  );
};

export default Cart;
