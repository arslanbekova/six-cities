export const setRating = (rating) => {
  const STAR_WIDTH = 20;
  return Math.round(rating) * STAR_WIDTH + `%`;
};

export const toUpperCaseFirstSymbol = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const returnCorrectWordForm = (count) => {
  const MIN_COUNT = 1;
  return count > MIN_COUNT ? `s` : ``;
};
