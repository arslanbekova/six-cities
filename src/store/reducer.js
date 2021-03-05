import {OFFERS} from '../mocks/offers';
import {REVIEWS} from '../mocks/reviews';
import {ActionType} from './action';

const initialState = {
  city: `Paris`,
  offers: OFFERS,
  reviews: REVIEWS,
  sortType: `Popular`
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };

    case ActionType.SORT_OFFERS:
      return {
        ...state,
        sortType: action.payload
      };
  }

  return state;
};

export {reducer};
