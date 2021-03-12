import {ActionCreator} from './action';
import {AuthorizationStatus} from '../utils/const';
import camelcaseKeys from 'camelcase-keys';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`, {
    transformResponse: [
      (data) => {
        return camelcaseKeys(JSON.parse(data), {deep: true});
      }
    ]
  })
  .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password}, {
    transformResponse: [
      (data) => {
        return camelcaseKeys(JSON.parse(data), {deep: true});
      }
    ]
  })
    .then(({data}) => dispatch(ActionCreator.loadAuthInfo(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(`/`)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
);
