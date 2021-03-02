export const ActionType = {
  CHANGE_CITY: `main/changeCity`,
  FILTER_OFFERS: `main/filterOffers`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  filterOffers: () => ({
    type: ActionType.FILTER_OFFERS,
  })
};
