export const ActionType = {
  CHANGE_CITY: `main/changeCity`,
  CHANGE_SORT_TYPE: `main/changeSortType`,
  LOAD_OFFERS: `data/loadOffers`,
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
  })
};
