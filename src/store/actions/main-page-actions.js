import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: `mainPage/changeCity`,
  CHANGE_SORT_TYPE: `mainPage/changeSortType`,
  LOAD_OFFERS: `mainPage/loadOffers`,
  UPDATE_OFFERS: `mainPage/updateOffers`,
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (city) => {
  return {
    payload: city
  };
});

export const changeSortType = createAction(ActionType.CHANGE_SORT_TYPE, (sortType) => {
  return {
    payload: sortType
  };
});

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => {
  return {
    payload: offers
  };
});

export const updateOffers = createAction(ActionType.UPDATE_OFFERS, (offer) => {
  return {
    payload: offer
  };
});

