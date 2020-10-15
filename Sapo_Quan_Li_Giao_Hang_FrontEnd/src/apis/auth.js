import Axios from 'axios';
import AxiosService from '../utils/axoisService';
const url = 'auth';
export const signup = (data) => {
  return AxiosService.post(`http://localhost:8080/api/${url}/signup`, data);
};

export const login = (data) => {
  return AxiosService.post(`http://localhost:8080/api/${url}/signin`, data);
};

export const checkLogin = () => {
  let accessToken = localStorage.getItem('TOKEN')
  const headers = {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": `application/json`
    }
  }
 return Axios.post(`http://localhost:8080/api/${url}/checklogin`, {}, headers);
}