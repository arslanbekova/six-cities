import axios from "axios";
import {store} from 'react-notifications-component';

const BACKEND_URL = `https://6.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVICE_UNAVAILABLE: 503
};

const getNotification = (message, status, statusText) => {
  return store.addNotification({
    title: `Server error! ${status}: ${statusText}`,
    message,
    type: `danger`,
    insert: `top`,
    container: `bottom-full`,
    animationIn: [`animate__animated`, `animate__fadeIn`],
    animationOut: [`animate__animated`, `animate__fadeOut`],
    dismiss: {
      duration: 15000,
      pauseOnHover: true,
      click: true
    }
  });
};

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (error) => {
    const status = error.response.status;
    const statusText = error.response.statusText;
    const message = error.response.request.responseText;

    if (status === HttpCode.BAD_REQUEST) {
      getNotification(message, status, statusText);
    }

    if (status === HttpCode.UNAUTHORIZED) {
      getNotification(message, status, statusText);
    }
    if (status === HttpCode.NOT_FOUND) {
      getNotification(message, status, statusText);
    }

    if (status === HttpCode.SERVICE_UNAVAILABLE) {
      getNotification(message, status, statusText);
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
