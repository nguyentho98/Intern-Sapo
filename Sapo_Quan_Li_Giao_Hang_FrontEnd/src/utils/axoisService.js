import axios from 'axios';
class AxiosService {
  constructor() {
    const instance = axios.create({
      headers: {},
    });
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  get(url) {
    return this.instance.get(url);
  }

  getall(url, data) {
    return this.instance.patch(url, data);
  }

  post(url, body) {
    return this.instance.post(url, body);
  }


  put(url, body) {
    return this.instance.put(url, body);
  }

  delete(url) {
    return this.instance.delete(url);
  }

  setHeader(name, value) {
    this.instance.defaults.headers.common[name] = value;
  }

  removeHeader(name) {
    delete this.instance.defaults.headers.common[name];
  }
}
export default new AxiosService();