import {OFFERS} from '../mocks/offers';
import {REVIEWS} from '../mocks/reviews';
import {ActionType} from './action';

const initialState = {
  city: `Paris`,
  offersList: [],
  offers: OFFERS,
  reviews: REVIEWS,
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
  }

  return state;
};

export {reducer};
