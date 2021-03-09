import {ActionCreator} from "./action";
import camelcaseKeys from 'camelcase-keys'

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`, {
      transformResponse: [
        (data) => {
          return camelcaseKeys(JSON.parse(data), { deep: true })
        }
      ]
    })
    .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
);
