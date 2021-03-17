import {ActionType} from './action';
import {AuthorizationStatus} from '../utils/const';

const initialState = {
  city: `Paris`,
  offers: [],
  reviews: [],
  sortType: `Popular`,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {},
  isOfferLoaded: false,
  offer: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };

    case ActionType.CHANGE_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload
      };

    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true
      };

    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

    case ActionType.LOAD_AUTH_INFO:
      return {
        ...state,
        authInfo: action.payload,
      };

    case ActionType.LOAD_OFFER:
      return {
        ...state,
        offer: action.payload,
        isOfferLoaded: true
      };
  }

  return state;
};

export {reducer};
