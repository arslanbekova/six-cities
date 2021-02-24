import React from 'react';
import OffersList from '../offers-list/offers-list';

const OffersListNear = (props) => {
  return (
    <OffersList className="near-places__list" {...props}/>
  );
};

export default OffersListNear;
