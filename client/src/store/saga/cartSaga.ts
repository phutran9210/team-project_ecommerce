import { Effect, put, takeEvery, call, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  getCartRequest,
  getCartSuccess,
  getCartFailure,
  addCartRequest,
  addCartSuccess,
  addToServerCartFailure,
  increaseQuantityRequest,
  increaseQuantitySuccess,
  PayLoadChangeQuantity,
  removeItem,
  removeItemRequest,
  changeItemFailure,
} from "../slices/cartSlice/cart-slice";
import { ProductInterface } from "../../constants/interface/ProductInterface";
import * as api from "../api/apiCart";
import { Modal } from "antd";
import { message, notification } from "antd";

function* getDataCartSaga(action: {
  payload: string;
}): Generator<Effect, any, any> {
  try {
    const response = yield call(api.fetchCart, action.payload);

    yield put(getCartSuccess(response.data));
  } catch (error: any) {
    yield put(getCartFailure(error.response.data));
  }
}

function* addItemCartSaga(action: {
  payload: Partial<ProductInterface>;
}): Generator<Effect, any, any> {
  const dataCart: { data: Partial<ProductInterface>[]; cart_id: string } =
    yield select((state) => state.cartData.dataCart);

  const item = action.payload;

  const checkDuplicate = dataCart.data.find(
    (product) =>
      product.product_id === item.product_id &&
      product.engraving_content === item.engraving_content
  );

  if (checkDuplicate) {
    const payloadUpdate = {
      cart_detail_id: checkDuplicate.cart_detail_id,
      change: 1,
      engraving_content: checkDuplicate.engraving_content,
      product_id: checkDuplicate.product_id,
    };

    try {
      const response = yield call(
        api.fetchUpdateItem,
        dataCart.cart_id,
        item.product_id,
        payloadUpdate
      );

      if (response.data) {
        yield put(increaseQuantitySuccess(payloadUpdate));
        const updatedCartData = yield select(
          (state) => state.cartData.dataCart
        );
        localStorage.setItem("cart", JSON.stringify(updatedCartData.data));
      }
    } catch (error) {
      console.error(error);
    }

    return;
  }

  try {
    const payloadUpdate = {
      product_id: item.product_id,
      quantity: item.quantity,
      engraving_content: item.engraving_content,
      engraving_checked: item.engraving_checked,
    };

    const response = yield call(
      api.fetchUpdateCart,
      dataCart.cart_id,
      payloadUpdate
    );

    yield put(addCartSuccess(response.data));

    notification.success({
      message: "Added to cart!",
      duration: 3,
      style: { top: 50 },
    });

    const dataCartUpdate: {
      data: Partial<ProductInterface>[];
      cart_id: string;
    } = yield select((state) => state.cartData.dataCart);
    localStorage.setItem("cart", JSON.stringify(dataCartUpdate.data));
  } catch (error: any) {
    yield put(addToServerCartFailure(error.response.data));
    message.error("Server error");
  }
}

function* watchStorageEvents(): Generator<Effect, any, any> {
  while (true) {
    const event = yield take("LOCAL_STORAGE_CHANGED");
    if (event.key === "cart") {
      const newCart = JSON.parse(event.newValue);
      yield put(getCartSuccess(newCart));
    }
  }
}

function* quantityChangeSaga(action: {
  payload: PayLoadChangeQuantity;
}): Generator<Effect, any, any> {
  const dataCart: { data: Partial<ProductInterface>[]; cart_id: string } =
    yield select((state) => state.cartData.dataCart);

  const productIndex = dataCart.data.findIndex((product) => {
    if (action.payload.engraving_content) {
      return (
        product.product_id === action.payload.product_id &&
        product.engraving_content === action.payload.engraving_content
      );
    }

    return product.product_id === action.payload.product_id;
  });

  if (
    productIndex !== -1 &&
    dataCart.data[productIndex].quantity! < 2 &&
    action.payload.change === -1
  ) {
    const channel = yield call(confirmDelete);
    const shouldDelete = yield take(channel);
    if (!shouldDelete) {
      return;
    }
    if (shouldDelete) {
      yield put(removeItem(productIndex));
    }
  }

  const itemId = action.payload.product_id;
  const payloadUpdate = action.payload;

  try {
    const response = yield call(
      api.fetchUpdateItem,
      dataCart.cart_id,
      itemId,
      payloadUpdate
    );

    if (response.data.status === 200) {
      yield put(increaseQuantitySuccess(action.payload));
      const updatedCartData = yield select((state) => state.cartData.dataCart);
      localStorage.setItem("cart", JSON.stringify(updatedCartData.data));
    }
  } catch (error: any) {
    yield put(changeItemFailure(error.response.data));
    notification.error({
      message: `${error.response.data.message}`,
      duration: 3,
      style: { top: 50 },
    });
  }
}

function* removeItemSaga(action: {
  payload: Partial<PayLoadChangeQuantity>;
}): Generator<Effect, any, any> {
  const dataCart: { data: Partial<ProductInterface>[]; cart_id: string } =
    yield select((state) => state.cartData.dataCart);

  const productIndex = dataCart.data.findIndex((product) => {
    if (action.payload.engraving_content) {
      return (
        product.product_id === action.payload.product_id &&
        product.engraving_content === action.payload.engraving_content
      );
    }

    return product.product_id === action.payload.product_id;
  });
  if (productIndex !== -1) {
    const channel = yield call(confirmDelete);
    const shouldDelete = yield take(channel);
    if (!shouldDelete) {
      return;
    }
    if (shouldDelete) {
      const itemId = action.payload.product_id;
      const payloadUpdate = action.payload;

      try {
        const response = yield call(
          api.fetchUpdateItem,
          dataCart.cart_id,
          itemId,
          payloadUpdate
        );
        if (response.data.status === 200) {
          yield put(removeItem(productIndex));
          // Cập nhật localStorage
          const dataCart: {
            data: Partial<ProductInterface>[];
            cart_id: string;
          } = yield select((state) => state.cartData.dataCart);

          localStorage.setItem("cart", JSON.stringify(dataCart.data));
        }
      } catch (error: any) {
        yield put(changeItemFailure(error.response.data));
        message.error(`${error.response.data.message}`);
      }
    }
  }
}

function* cartSaga() {
  yield takeEvery(getCartRequest, getDataCartSaga);
  yield takeEvery(addCartRequest, addItemCartSaga);
  yield takeEvery(increaseQuantityRequest, quantityChangeSaga);
  yield takeEvery(removeItemRequest, removeItemSaga);
  yield watchStorageEvents();
}
export default cartSaga;

//config
function confirmDelete() {
  return eventChannel((emitter) => {
    Modal.confirm({
      title: "Do you want to delete this item from your cart?",
      onCancel: () => {
        emitter(false);
      },
      onOk: () => {
        emitter(true);
      },
    });
    return () => {}; // return an unsubscribe function if needed
  });
}
