import {createSelector} from "reselect";
import {NameSpace} from '../root-reducer';

const getFavoriteOffers = (state) => state[NameSpace.DATA].favoritesOffers;
export const selectFavoritesOffers = createSelector(
    [getFavoriteOffers],
    (favoritesOffers) => {
      return favoritesOffers.reduce((result, item) => {
        result[item.city.name] = [...result[item.city.name] || [], item];
        return result;
      }, {});
    }
);

const getReviews = (state) => state[NameSpace.DATA].reviews;
export const selectReviews = createSelector(
    [getReviews],
    (reviews) => {
      const sortedReviews = reviews.slice().sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateB - dateA;
      });
      return sortedReviews;
    }
);
