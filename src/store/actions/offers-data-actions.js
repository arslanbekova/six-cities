import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_REVIEWS: `data/loadReviews`,
  LOAD_OFFER: `data/loadOffer`,
  LOAD_OFFERS_NEAR: `data/loadOffersNear`,
  LOAD_FAVORITES_OFFERS: `data/loadFavoritesOffers`,
  UPDATE_OFFER: `data/updateOffer`,
  UPDATE_OFFER_LOADED_STATUS: `data/updateOfferLoadedStatus`,
  UPDATE_OFFERS_NEAR: `data/updateOffersNear`,
  UPDATE_FAVORITES_OFFERS: `data/updateFavoritesOffers`,
};

export const loadReviews = createAction(ActionType.LOAD_REVIEWS, (reviews) => {
  return {
    payload: reviews
  };
});
export const loadOffer = createAction(ActionType.LOAD_OFFER, (offer) => {
  return {
    payload: offer
  };
});
export const loadOffersNear = createAction(ActionType.LOAD_OFFERS_NEAR, (offers) => {
  return {
    payload: offers
  };
});
export const loadFavoritesOffers = createAction(ActionType.LOAD_FAVORITES_OFFERS, (offers) => {
  return {
    payload: offers
  };
});
export const updateOffer = createAction(ActionType.UPDATE_OFFER, (offer) => {
  return {
    payload: offer
  };
});
export const updateOfferLoadedStatus = createAction(ActionType.UPDATE_OFFER_LOADED_STATUS, (status) => {
  return {
    payload: status
  };
});
export const updateOffersNear = createAction(ActionType.UPDATE_OFFERS_NEAR, (offer) => {
  return {
    payload: offer
  };
});
export const updateFavoritesOffers = createAction(ActionType.UPDATE_FAVORITES_OFFERS, (offer) => {
  return {
    payload: offer
  };
});
