import { checkLogin } from "../../apis/auth";
import { toastError, toastSuccess } from "../../helper/ToastHelper";
import axoisService from "../../utils/axoisService";
import history from "../../utils/history";
import { AUTHORIZATION_KEY } from "../constants";
import * as types from "../constants/auth";
import {setRole} from '../../utils/userRole'
export const login = (email, password) => ({
  type: types.LOGIN,
  payload: {
    email,
    password,
  },
});

export const loginSuccess = (data) => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    data,
  },
});

export const loginFailed = (error) => ({
  type: types.LOGIN_FAILED,
  payload: {
    error,
  },
});

export const loginThunk = (data) => {
  return (dispatch) => {
    return axoisService
      .post(`http://localhost:8080/api/auth/signin`, data)
      .then((res) => {
        toastSuccess("Đăng nhập thành công!")
        const accessToken = res.data.token;
        axoisService.setHeader("Authorization", `Bearer ${accessToken}`);
        axoisService.setHeader("Content-Type", `application/json`);
        localStorage.setItem(AUTHORIZATION_KEY, accessToken);
        localStorage.setItem("username", res.data.fullName);
        localStorage.setItem("userId", res.data.id);
        checkLogin()
          .then((res) => {
            setRole(res.data.authorities[0].authority);
            if (res.data.authorities[0].authority === 'ROLE_SHIPPER') {
              localStorage.setItem("shipperID",res.data.shipperID)
              history.push('/shipper');
            } else {
              history.push('/admin');
            }
          })
          .catch((er) => {
            localStorage.clear();
            history.replace('/login');
          })
      })
      .catch((err) => {
        console.log(err);
        toastError("Tài khoản hoặc mật khẩu không đúng!")
      });
  };
};
