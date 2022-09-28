import axios, {  AxiosRequestHeaders } from 'axios';
import Cookie from 'js-cookie';
import ApiData from '../dtos/ApiData';

interface ApiHeaders extends AxiosRequestHeaders, ApiData {}

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.response.use(res => {
  if(res.headers['access-token']) {
    const apiData: ApiData = {
      'access-token': res.headers['access-token'],
      client: res.headers.client,
      expiry: Number(res.headers.expiry),
      'token-type': res.headers['token-type'],
      uid: res.headers.uid
    };

    api.defaults.headers.common = apiData as ApiHeaders;
    Cookie.set('@api-data', JSON.stringify(apiData));
  }

  return res;
})

api.interceptors.request.use(req => {
  if(req.url.includes('admin')) {
    const apiData: ApiData = Cookie.get('@api-data') ? JSON.parse(Cookie.get('@api-data')) : null;
    req.headers = apiData as ApiHeaders;
  }

  return req;
})

export default api;