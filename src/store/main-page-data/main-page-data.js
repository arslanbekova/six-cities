import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSortType, loadOffers, updateOffers} from '../actions/main-page-actions';
import {CITY_BY_DEFAULT, SortOption, LoadedStatus} from '../../utils/const';

const initialState = {
  offers: [],
  isDataLoaded: LoadedStatus.NOT_LOADED,
  city: CITY_BY_DEFAULT,
  sortType: SortOption.POPULAR
};

const mainPageData = createReducer(initialState, (builder) => {
  builder.addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
    state.isDataLoaded = LoadedStatus.LOADED;
  });
  builder.addCase(updateOffers, (state, action) => {
    state.offers = state.offers.map((offer) => offer.id === action.payload.id ? action.payload : offer);
  });
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  });
  builder.addCase(changeSortType, (state, action) => {
    state.sortType = action.payload;
  });
});

export {mainPageData};
