import {loadOffer, loadReviews, loadOffersNear, loadFavoritesOffers, updateOffersNear, updateOffer} from './offers-data-actions';
import {loadOffers, updateOffers} from './main-page-actions';
import {requireAuthorization, loadAuthInfo} from './user-actions';
import {redirectToRoute} from './redirect-actions';
import {AuthorizationStatus, PathName} from '../../utils/const';
import {BackendUrl, ComponentType} from '../../utils/const';
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
  api.get(BackendUrl.HOTELS, FORMATTED_RESPONS)
  .then(({data}) => dispatch(loadOffers(data)))
  .catch({});
};

export const fetchOffer = (id) => (dispatch, _getState, api) => {
  return api.get(BackendUrl.HOTELS + `/${id}`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(loadOffer(data)))
  .catch({});
};

export const fetchOffersNear = (id) => (dispatch, _getState, api) => {
  api.get(BackendUrl.HOTELS + `/${id}` + BackendUrl.NEAR, FORMATTED_RESPONS)
  .then(({data}) => dispatch(loadOffersNear(data)))
  .catch(() => {});
};

export const fetchFavoritesOffers = () => (dispatch, _getState, api) => (
  api.get(BackendUrl.FAVORITE_HOTELS, FORMATTED_RESPONS)
  .then(({data}) => dispatch(loadFavoritesOffers(data)))
  .catch(() => {})
);

export const addToFavorites = (id, status, cardType) => (dispatch, _getState, api) => {
  return api.post(BackendUrl.FAVORITE_HOTELS + `/${id}/${status}`, {id, status}, FORMATTED_RESPONS)
    .then(({data}) => {
      if (cardType === ComponentType.MAIN) {
        dispatch(updateOffers(data));
      }
      if (cardType === ComponentType.NEAR) {
        dispatch(updateOffersNear(data));
      }
      if (cardType === ComponentType.FAVORITE) {
        dispatch(fetchFavoritesOffers());
        dispatch(updateOffer(data));
        dispatch(updateOffers(data));
        dispatch(updateOffersNear(data));
      }
    })
    .catch({});
};

export const fetchReviewsList = (id) => (dispatch, _getState, api) => (
  api.get(BackendUrl.COMMENTS + `/${id}`, FORMATTED_RESPONS)
  .then(({data}) => dispatch(loadReviews(data)))
  .catch(() => {})
);

export const postComment = (id, {comment, rating}, onSuccessUpLoad, onErrorUpLoad) => (dispatch, _getState, api) => (
  api.post(BackendUrl.COMMENTS + `/${id}`, {comment, rating}, FORMATTED_RESPONS)
    .then(({data}) => dispatch(loadReviews(data)))
    .then(onSuccessUpLoad)
    .catch(onErrorUpLoad)
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(BackendUrl.LOGIN, FORMATTED_RESPONS)
    .then(({data}) => dispatch(loadAuthInfo(data)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(BackendUrl.LOGIN, {email, password}, FORMATTED_RESPONS)
    .then(({data}) => dispatch(loadAuthInfo(data)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(PathName.MAIN)))
    .catch({})
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(BackendUrl.LOGOUT)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
);
