import {REVIEWS} from '../mocks/reviews';
import {ActionType} from './action';

const initialState = {
  city: `Paris`,
  offers: [],
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

    case ActionType.CHANGE_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload
      };
  }

  return state;
};

export {reducer};
