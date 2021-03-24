export const AuthorizationStatus = {
  AUTH: true,
  NO_AUTH: false,
};

export const LoadedStatus = {
  LOADED: true,
  NOT_LOADED: false,
};

export const PathName = {
  MAIN: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer/:id`,
  OFFER_PAGE: `/offer/`,
  NOT_FOUND: `/not-found`
};

export const BackendUrl = {
  HOTELS: `/hotels`,
  NEAR: `/nearby`,
  FAVORITE_HOTELS: `/favorite`,
  COMMENTS: `/comments`,
  LOGIN: `/login`,
  LOGOUT: `/logout`
};

export const CITY_BY_DEFAULT = `Paris`;

export const ComponentType = {
  MAIN: `MAIN`,
  NEAR: `NEAR`,
  FAVORITE: `FAVORITES`
};

export const Filter = {
  TO_HIGHEST_PRICE: `Price: low to high`,
  TO_LOWEST_PRICE: `Price: high to low`,
  TOP_RATED: `Top rated first`,
  POPULAR: `Popular`
};

export const FavoriteStatus = {
  ADD: 1,
  REMOVE: 0,
};
