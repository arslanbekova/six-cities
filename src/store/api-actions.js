import {ActionCreator} from './action';
import {AuthorizationStatus} from '../utils/const';
import camelcaseKeys from 'camelcase-keys';

const FORMATTED_RESPONS = {
  transformResponse: [
    (data) => {
      if (data) {
        return camelcaseKeys(JSON.parse(data), {deep: true});
      }
      return data;
    }
  ]
};

export const fetchOffersList = () => (dispatch, _getState, api) => {
  api.get(`/hotels`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
  .catch({});
};

export const fetchOffer = (id) => (dispatch, _getState, api) => {
  return api.get(`/hotels/${id}`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(ActionCreator.loadOffer(data)))
  .catch({});
};

export const fetchOffersNear = (id) => (dispatch, _getState, api) => {
  api.get(`/hotels/${id}/nearby`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(ActionCreator.loadOffersNear(data)))
  .catch(() => {});
};

export const fetchFavoritesOffers = () => (dispatch, _getState, api) => (
  api.get(`/favorite`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(ActionCreator.loadFavoritesOffers(data)))
  .catch(() => {})
);

export const addToFavorites = (id, status, cardType) => (dispatch, _getState, api) => {
  return api.post(`/favorite/${id}/${status}`, {id, status}, FORMATTED_RESPONS)
    .then(({data}) => {
      if (cardType === `MAIN`) {
        dispatch(ActionCreator.updateOffers(data));
      }
      if (cardType === `NEAR`) {
        dispatch(ActionCreator.updateOffersNear(data));
      }
      if (cardType === `FAVORITES`) {
        dispatch(ActionCreator.updateFavoritesOffers(data));
      }
    })
    .catch({});
};

export const fetchReviewsList = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(ActionCreator.loadReviews(data)))
  .catch(() => {})
);

export const postComment = (id, {comment, rating}, onSuccessUpLoad, onErrorUpLoad) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, {comment, rating}, FORMATTED_RESPONS)
    .then(({data}) => dispatch(ActionCreator.loadReviews(data)))
    .then(onSuccessUpLoad)
    .catch(onErrorUpLoad)
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`, FORMATTED_RESPONS)
    .then(({data}) => dispatch(ActionCreator.loadAuthInfo(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password}, FORMATTED_RESPONS)
    .then(({data}) => dispatch(ActionCreator.loadAuthInfo(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(`/`)))
    .catch({})
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
);
