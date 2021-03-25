import {createSelector} from "reselect";
import {NameSpace} from '../root-reducer';
import {SortOption} from '../../utils/const';

const getOffersFilter = (state) => state[NameSpace.MAIN_PAGE].city;
const getOffers = (state) => state[NameSpace.MAIN_PAGE].offers;
const getSortType = (state) => state[NameSpace.MAIN_PAGE].sortType;

export const selectOffers = createSelector(
    [getOffersFilter, getOffers, getSortType],
    (city, offers, sortType) => {
      const filtredOffers = offers.filter((offer) => offer.city.name === city);
      switch (sortType) {
        case SortOption.TO_HIGHEST_PRICE:
          filtredOffers.sort((a, b) => a.price - b.price);
          break;
        case SortOption.TO_LOWEST_PRICE:
          filtredOffers.sort((a, b) => b.price - a.price);
          break;
        case SortOption.TOP_RATED:
          filtredOffers.sort((a, b) => b.rating - a.rating);
          break;
        default:
          return filtredOffers;
      }
      return filtredOffers;
    }
);
