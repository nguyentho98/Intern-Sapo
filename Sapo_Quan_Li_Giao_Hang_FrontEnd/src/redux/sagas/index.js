import { call, put, takeLatest } from 'redux-saga/effects';
import { loginFailed, loginSuccess } from '../actions/auth';
import axiosService from '../../utils/axoisService';
import { AUTHORIZATION_KEY, STATUS_CODE } from '../constants/index';
import { login } from '../../apis/auth';
import * as authTypes from '../constants/auth';
import * as orderTypes from '../constants/fulfillment';
import * as customerTypes from '../constants/customer';
import * as userTypes from '../constants/shipper';
import * as addressTypes from '../constants/address';
import * as statisticTypes from '../constants/statistic';
import history from '../../utils/history';
import { checkLogin } from '../../apis/auth';

import { apifetchListShipper } from '../../apis/shipper';
import {
  apiaddFulfillment,
  apifetchListFulfillment,
  apifetchFulfillmentById,
  apifetchListFulfillments,
} from '../../apis/fulfillment';
import {
  addFulfillmentFailed,
  addFulfillmentSuccess,
  fetchListFulfillmentFailed,
  fetchListFulfillmentSuccess,
  fetchFulfillmentByIdFailed,
  fetchFulfillmentByIdSuccess,
} from '../actions/fulfillment';
import { apiaddCustomer, apifetchListCustomer } from '../../apis/customer';
import {
  addCustomerSuccess,
  fetchListCustomerFailed,
  fetchListCustomerSuccess,
} from '../actions/customer';
import {
  fetchListShipperFailed,
  fetchListShipperSuccess,
  fetchShipperByIdSuccess,
} from '../actions/shipper';
import {
  addShippingFromSuccess,
  addShippingToSuccess,
  fetchListShippingFromFailed,
  fetchListShippingFromSuccess,
  fetchListShippingToFailed,
  fetchListShippingToSuccess,
} from '../actions/address';
import {
  apiCreateShippingFrom,
  apiCreateShippingTo,
  apifetchListShippingFrom,
  apifetchListShippingTo,
} from '../../apis/address';
import { toastSuccess, toastError } from '../../helper/ToastHelper';
import { apifetchStatistic } from '../../apis/statistic';
import { fetchStatisticSuccess } from '../actions/statistic';

function* processLogin({ payload }) {
  const { email, password } = payload;
  try {
    const resp = yield call(login, {
      email,
      password,
    });

    const { data, status } = resp;
    if (status === STATUS_CODE.SUCCES) {
      yield put(loginSuccess(data));
      const accessToken = data.token;
      axiosService.setHeader('Authorization', `Bearer ${accessToken}`);
      axiosService.setHeader('Content-Type', `application/json`);
      localStorage.setItem(AUTHORIZATION_KEY, accessToken);
      localStorage.setItem('username', data.fullName);
      localStorage.setItem('userId', data.id);
      checkLogin()
        .then((res) => {
          if (res.data[0].authority === 'ROLE_SHIPPER') {
            history.push('/shipper');
          } else {
            history.push('/admin');
          }
          axiosService.setHeader(
            'Authorization',
            `Bearer ${localStorage.getItem('TOKEN')}`
          );
          axiosService.setHeader('Content-Type', `application/json`);
        })
        .catch((er) => {
          localStorage.clear();
          history.replace('/login');
        });
      // toastSuccess("Đăng nhập thành công!")
    } else {
    }
  } catch (error) {
    yield put(loginFailed());
    // toastError("Tài khoản hoặc mật khẩu không đúng!")
  }
}
function* watchListShipper({ payload }) {
  const { page, limit, name } = payload;
  try {
    const resp = yield call(apifetchListShipper, page, limit, name);
    const { data } = resp;
    yield put(fetchListShipperSuccess(data));
  } catch (error) {
    yield put(fetchListShipperFailed(error));
  }
}

function* watchListCustomer({ payload }) {
  const { page, limit, name } = payload;
  try {
    const resp = yield call(apifetchListCustomer, page, limit, name);
    const { data } = resp;
    console.log(resp);
    yield put(fetchListCustomerSuccess(data));
  } catch (error) {
    yield put(fetchListCustomerFailed(error));
  }
}
function* addCustomerSaga({ payload }) {
  const dataAdd = payload.data;
  try {
    const resp = yield call(apiaddCustomer, dataAdd);
    const { data, status } = resp;
    console.log(resp);
    if (status === STATUS_CODE.SUCCES) {
      yield put(addCustomerSuccess(data));
    } else {
    }
  } catch (error) {
    if (error.response.status === 404) {
    }
  }
}
function* watchListFulfillment({ payload }) {
  const { page, limit, status,shipperID, name } = payload;
  try {
    const resp = yield call(apifetchListFulfillment, page, limit, status, shipperID, name);
    const { data } = resp;
    // if (status === STATUS_CODE.SUCCES) {
    yield put(fetchListFulfillmentSuccess(data));
    // } else {

    // }
  } catch (error) {
    yield put(fetchListFulfillmentFailed(error));
  }
}
function* watchListFulfillments({ payload }) {
  const { page, limit, status, name } = payload;
  try {
    const resp = yield call(
      apifetchListFulfillments,
      page,
      limit,
      status,
      name
    );
    const { data } = resp;
    // if (status === STATUS_CODE.SUCCES) {
    yield put(fetchListFulfillmentSuccess(data));
    // } else {

    // }
  } catch (error) {
    yield put(fetchListFulfillmentFailed(error));
  }
}
function* addFulfillmentSaga({ payload }) {
  const dataAdd = payload.data;
  try {
    const resp = yield call(apiaddFulfillment, dataAdd);
    const { data } = resp;
    yield put(addFulfillmentSuccess(data));
    toastSuccess('Tạo phiếu giao hàng thành công');
    history.push(`/admin/orders-update/${data.id}`);
  } catch (error) {
    yield put(addFulfillmentFailed(error));
  }
}
function* watchDetailFulfillment({ payload }) {
  const { id } = payload;
  const resp = yield call(apifetchFulfillmentById, id);
  const { data, status: statuscode } = resp;
  if (statuscode === STATUS_CODE.SUCCES) {
    yield put(fetchFulfillmentByIdSuccess(data));
    yield put(fetchShipperByIdSuccess(data.shipperDTO));
  } else {
    yield put(fetchFulfillmentByIdFailed(data));
  }
}

function* watchListShippingTo() {
  try {
    const resp = yield call(apifetchListShippingTo);
    const { data, status } = resp;
    if (status === STATUS_CODE.SUCCES) {
      yield put(fetchListShippingToSuccess(data));
    } else {
      yield put(fetchListShippingToFailed(data));
    }
  } catch (error) {}
}

function* watchListShippingFrom({ payload }) {
  const { id } = payload;
  const resp = yield call(apifetchListShippingFrom, id);
  const { data, status: statuscode } = resp;
  if (statuscode === STATUS_CODE.SUCCES) {
    yield put(fetchListShippingFromSuccess(data));
  } else {
    yield put(fetchListShippingFromFailed(data));
  }
}
function* createShippingFromSaga({ payload }) {
  const dataAdd = payload.data;
  try {
    const resp = yield call(apiCreateShippingFrom, dataAdd);
    const { data, status } = resp;
    if (status === STATUS_CODE.SUCCES) {
      yield put(addShippingFromSuccess(data));
    } else {
    }
  } catch (error) {
    if (error.response.status === 404) {
    }
  }
}
function* createShippingToSaga({ payload }) {
  const dataAdd = payload.data;
  const resp = yield call(apiCreateShippingTo, dataAdd);
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCES) {
    yield put(addShippingToSuccess(data));
  } else {
  }
}

function* watchStatistic({ payload }) {
  const resp = yield call(apifetchStatistic);
  const { data } = resp;
  yield put(fetchStatisticSuccess(data));
}

function* rootSaga() {
  console.log('xin chào saga');
  yield takeLatest(authTypes.LOGIN, processLogin);
  yield takeLatest(userTypes.FETCH_SHIPPER, watchListShipper);

  yield takeLatest(customerTypes.FETCH_CUSTOMER, watchListCustomer);
  yield takeLatest(customerTypes.ADD_CUSTOMER, addCustomerSaga);

  yield takeLatest(orderTypes.FETCH_FULFILLMENT, watchListFulfillment);
  yield takeLatest(orderTypes.FETCH_FULFILLMENTS, watchListFulfillments);
  yield takeLatest(orderTypes.ADD_FULFILLMENT, addFulfillmentSaga);
  yield takeLatest(orderTypes.FETCH_FULFILLMENT_BY_ID, watchDetailFulfillment);

  yield takeLatest(addressTypes.FETCH_RECEIPT, watchListShippingFrom);
  yield takeLatest(addressTypes.FETCH_SHIPPING, watchListShippingTo);
  yield takeLatest(addressTypes.ADD_RECEIPT, createShippingFromSaga);
  yield takeLatest(addressTypes.ADD_SHIPPING, createShippingToSaga);

  yield takeLatest(statisticTypes.FETCH_STATISTIC, watchStatistic);
}
export default rootSaga;
