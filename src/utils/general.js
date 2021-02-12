export const setRating = (offer) => {
  const STAR_WIDTH = 20;
  return Math.round(offer.rating) * STAR_WIDTH + `%`;
};
