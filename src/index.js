import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from "./services/api";
import {Provider} from 'react-redux';
import rootReducer from './store/root-reducer';
import {requireAuthorization} from './store/actions/user-actions';
import {checkAuth} from "./store/actions/api-actions";
import {AuthorizationStatus} from "./utils/const";
import {redirect} from "./store/middlewares/redirect";

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
