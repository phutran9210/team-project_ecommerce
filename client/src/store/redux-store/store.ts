import { configureStore } from "@reduxjs/toolkit";
import productSaga from "../saga/productSaga";
import cartSaga from "../saga/cartSaga";
import voucherSaga from "../saga/voucherSaga";

import createSagaMiddleware from "redux-saga";
import createProductReducer from "../slices/productSlice/product-slice";
import cartReducer from "../slices/cartSlice/cart-slice";
import productEdit from "../slices/productSlice/editProduct-slice";
import voucher from "../slices/voucherSlice/voucher-slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    createProduct: createProductReducer,
    cartData: cartReducer,
    editProduct: productEdit,
    voucherData: voucher,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(productSaga);
sagaMiddleware.run(cartSaga);
sagaMiddleware.run(voucherSaga);
