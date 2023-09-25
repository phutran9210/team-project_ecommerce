import {
  sendCategories,
  sendCategoriesSuccess,
  sendResetAllForm,
  sendResetAllFormSuccess,
  setDefaultResetAllForm,
  setDefaultResetAllFormSuccess,
} from "../slices/productSlice/product-slice";
import {
  getProductRequest,
  getProductSuccsess,
  getProductFailure,
  PayloadGetProduct,
  sendProductIdRequest,
  sendProductIdSuccess,
  EditId,
  PayloadOneProduct,
  getProductEditRequest,
  getProductEditSuccsess,
  getProductEditFailure,
  sentEditProductRequest,
  sentEditProductFailure,
  sentEditProductSuccsess,
} from "../slices/productSlice/editProduct-slice";
import * as api from "../api/apiProduct";

import { Effect, put, takeEvery, call } from "redux-saga/effects";
import { Modal, notification } from "antd";

function* takeCategories(action: {
  payload: string;
}): Generator<Effect, any, any> {
  yield put(sendCategoriesSuccess(action.payload));
}

function* resetFormAddProductSaga(): Generator<Effect, any, any> {
  yield put(sendResetAllFormSuccess());
}
function* setDefaultFormAddProductSaga(): Generator<Effect, any, any> {
  yield put(setDefaultResetAllFormSuccess());
}

// admin product
function* getProductSaga(action: {
  payload: PayloadGetProduct;
}): Generator<Effect, any, any> {
  try {
    const response = yield call(api.fetchFindAllProduct, action.payload);
    if (response.data.status === 200) {
      yield put(getProductSuccsess(response.data));
    }
  } catch (error: any) {
    yield put(getProductFailure(error.response.data));
    notification.error({
      message: `${error.response.data.message}`,
      duration: 3,
      style: { top: 50 },
    });
  }
}

//payload product_id
function* sendProductIdToHome(action: {
  payload: EditId;
}): Generator<Effect, any, any> {
  yield put(sendProductIdSuccess(action.payload));
}

//lấy edit product
function* getOneProductSaga(action: {
  payload: PayloadOneProduct;
}): Generator<Effect, any, any> {
  try {
    const response = yield call(api.fetchFindOneProduct, action.payload);
    yield put(getProductEditSuccsess(response.data));
  } catch (error: any) {
    yield put(getProductEditFailure(error.response.data));
  }
}

//cập nhật editProduct
function* sentEditProductSaga(action: {
  payload: any;
}): Generator<Effect, any, any> {
  const id = action.payload.productId;
  const payloadProduct = action.payload.payload;
  try {
    const response = yield call(api.fetchEditProduct, id, payloadProduct);

    if (response.data.status === 200) {
      yield put(sentEditProductSuccsess(response.data.result));
      Modal.success({
        title: "Success!",
        content: "Product updated successfully.",
        okText: "Close",
      });
    }
  } catch (error: any) {
    yield put(sentEditProductFailure(error.response.data));
    notification.error({
      message: `${error.response.data.message}`,
      duration: 3,
      style: { top: 50 },
    });
  }
}
function* productSaga() {
  yield takeEvery(sendCategories, takeCategories);
  yield takeEvery(sendResetAllForm, resetFormAddProductSaga);
  yield takeEvery(setDefaultResetAllForm, setDefaultFormAddProductSaga);

  //admin
  yield takeEvery(getProductRequest, getProductSaga);
  yield takeEvery(sendProductIdRequest, sendProductIdToHome);
  yield takeEvery(getProductEditRequest, getOneProductSaga);
  yield takeEvery(sentEditProductRequest, sentEditProductSaga);
}
export default productSaga;
