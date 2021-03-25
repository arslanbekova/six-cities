import {createReducer} from '@reduxjs/toolkit';
import {loadOffer, loadReviews, loadOffersNear, loadFavoritesOffers,
  updateOffersNear, updateFavoritesOffers, updateOffer, updateOfferLoadedStatus} from '../actions/offers-data-actions';
import {LoadedStatus} from '../../utils/const';

const initialState = {
  reviews: [],
  isOfferLoaded: LoadedStatus.NOT_LOADED,
  offer: {},
  offersNear: [],
  favoritesOffers: [],
};

const offersData = createReducer(initialState, (builder) => {
  builder.addCase(loadOffer, (state, action) => {
    state.offer = action.payload;
    state.isOfferLoaded = LoadedStatus.LOADED;
  });
  builder.addCase(loadReviews, (state, action) => {
    state.reviews = action.payload;
  });
  builder.addCase(loadOffersNear, (state, action) => {
    state.offersNear = action.payload;
  });
  builder.addCase(loadFavoritesOffers, (state, action) => {
    state.favoritesOffers = action.payload;
  });
  builder.addCase(updateOffer, (state, action) => {
    state.offer = action.payload;
  });
  builder.addCase(updateOffersNear, (state, action) => {
    state.offersNear = state.offersNear.map((offer) => offer.id === action.payload.id ? action.payload : offer);
  });
  builder.addCase(updateFavoritesOffers, (state, action) => {
    state.favoritesOffers = state.favoritesOffers.map((offer) => offer.id === action.payload.id ? action.payload : offer);
  });
  builder.addCase(updateOfferLoadedStatus, (state, action) => {
    state.isOfferLoaded = action.payload;
  });
});

export {offersData};
