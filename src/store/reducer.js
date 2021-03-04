import {OFFERS} from '../mocks/offers';
import {REVIEWS} from '../mocks/reviews';
import {ActionType} from './action';

const initialState = {
  city: `Paris`,
  offersList: [],
  offers: OFFERS,
  reviews: REVIEWS,
  sortType: `Popular`
};

const sortOffers = (sortType, state) => {
  switch (sortType) {
    case `Price: low to high`:
      state.offers.sort((a, b) => a.price - b.price);
      break;
    case `Price: high to low`:
      state.offers.sort((a, b) => b.price - a.price);
      break;
    case `Top rated first`:
      state.offers.sort((a, b) => b.rating - a.rating);
      break;
    default:
      state.offers.sort((a, b) => a.id - b.id);
  }

  return state.offers;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };

    case ActionType.FILTER_OFFERS:
      return {
        ...state,
        offersList: state.offers.filter((offer) => offer.city.name === state.city)
      };

    case ActionType.SORT_OFFERS:
      return {
        ...state,
        offers: sortOffers(action.payload, state),
        sortType: action.payload
      };
  }

  return state;
};

export {reducer};
