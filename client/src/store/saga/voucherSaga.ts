import { Effect, put, takeEvery, call } from "redux-saga/effects";
import * as api from "../api/apiVoucher";
import {
  getVoucherRequest,
  getVoucherSuccess,
  getVoucherFailure,
  renderVoucherRequest,
  renderVoucherSuccess,
  removeVoucherRequest,
  removeVoucherSuccess,
  removeVoucherFailure,
} from "../slices/voucherSlice/voucher-slice";

function* getDataVoucherSaga(): Generator<Effect, any, any> {
  try {
    const response = yield call(api.fetchFindAllProduct);
    yield put(getVoucherSuccess(response.data));
  } catch (error: any) {
    yield put(getVoucherFailure(error.response.data));
  }
}

function* sendVoucherForRenderSaga(action: {
  payload: any;
}): Generator<Effect, any, any> {
  yield put(renderVoucherSuccess(action.payload));
}
function* removeVoucherSaga(action: {
  payload: any;
}): Generator<Effect, any, any> {
  try {
    const response = yield call(api.fetchRemoveVoucher, action.payload);
    if (response.data.status === 200) {
      yield put(removeVoucherSuccess(action.payload));
    }
  } catch (error: any) {
    yield put(removeVoucherFailure(error.response.data));
  }
}

function* voucherSaga() {
  yield takeEvery(getVoucherRequest, getDataVoucherSaga);
  yield takeEvery(renderVoucherRequest, sendVoucherForRenderSaga);
  yield takeEvery(removeVoucherRequest, removeVoucherSaga);
}
export default voucherSaga;
