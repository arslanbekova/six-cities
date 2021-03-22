import {ActionCreator} from './action';
import {AuthorizationStatus} from '../utils/const';
import camelcaseKeys from 'camelcase-keys';

const FORMATTED_RESPONS = {
  transformResponse: [
    (data) => {
      return camelcaseKeys(JSON.parse(data), {deep: true});
    }
  ]
};

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
);

export const fetchOffer = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(ActionCreator.loadOffer(data)))
  .then(() => dispatch(ActionCreator.redirectToRoute(`/offer/${id}`)))
  .catch((err) => dispatch(ActionCreator.redirectToRoute(`/not_found`)))
);

export const fetchOffersNear = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}/nearby`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(ActionCreator.loadOffersNear(data)))
  .catch((err) => dispatch(ActionCreator.redirectToRoute(`/not_found`)))
);

export const fetchFavoritesOffers = () => (dispatch, _getState, api) => (
  api.get(`/favorite`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(ActionCreator.loadFavoritesOffers(data)))
  .catch((err) => dispatch(ActionCreator.redirectToRoute(`/not_found`)))
);

export const addToFavorites = (id, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${id}/${status}`, {id, status}, FORMATTED_RESPONS)
    .then(({data}) => dispatch(ActionCreator.updateOffers(data)))
);

export const fetchReviewsList = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(ActionCreator.loadReviews(data)))
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
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
);
