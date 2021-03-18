import axios from "axios";
import {ActionCreator} from '../store/action';

const BACKEND_URL = `https://6.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }

    if (err.response.status === HttpCode.NOT_FOUND) {
      onErrorUpLoad()
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
