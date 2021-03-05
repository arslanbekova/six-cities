export const ActionType = {
  CHANGE_CITY: `main/changeCity`,
  SORT_OFFERS: `main/sortOffers`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  sortOffers: (sortType) => ({
    type: ActionType.SORT_OFFERS,
    payload: sortType
  })
};
