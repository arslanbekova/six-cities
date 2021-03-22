export const ActionType = {
  CHANGE_CITY: `main/changeCity`,
  CHANGE_SORT_TYPE: `main/changeSortType`,
  LOAD_OFFERS: `data/loadOffers`,
  LOAD_REVIEWS: `data/loadReviews`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `login/redirectToRoute`,
  LOAD_AUTH_INFO: `login/loadAuthInfo`,
  LOAD_OFFER: `data/loadOffer`,
  LOAD_OFFERS_NEAR: `data/loadOffersNear`,
  LOAD_FAVORITES_OFFERS: `data/loadFavoritesOffers`,
  UPDATE_OFFERS: `data/updateOffers`,
  UPDATE_OFFER: `data/updateOffer`,
  UPDATE_OFFER_LOADED_STATUS: `data/updateOfferLoadedStatus`,
  UPDATE_OFFERS_NEAR: `data/updateOffersNear`,
  UPDATE_FAVORITES_OFFERS: `data/updateFavoritesOffers`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  loadAuthInfo: (authInfo) => ({
    type: ActionType.LOAD_AUTH_INFO,
    payload: authInfo
  }),
  loadOffer: (offer) => ({
    type: ActionType.LOAD_OFFER,
    payload: offer
  }),
  loadOffersNear: (offers) => ({
    type: ActionType.LOAD_OFFERS_NEAR,
    payload: offers
  }),
  loadFavoritesOffers: (offers) => ({
    type: ActionType.LOAD_FAVORITES_OFFERS,
    payload: offers
  }),
  updateOffers: (offer) => ({
    type: ActionType.UPDATE_OFFERS,
    payload: offer
  }),
  updateOffer: (offer) => ({
    type: ActionType.UPDATE_OFFER,
    payload: offer
  }),
  updateOfferLoadedStatus: (status) => ({
    type: ActionType.UPDATE_OFFER_LOADED_STATUS,
    payload: status
  }),
  updateOffersNear: (offer) => ({
    type: ActionType.UPDATE_OFFERS_NEAR,
    payload: offer
  }),
  updateFavoritesOffers: (offer) => ({
    type: ActionType.UPDATE_FAVORITES_OFFERS,
    payload: offer
  })
};
