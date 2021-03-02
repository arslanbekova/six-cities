import React from 'react';
import OffersList from '../offers-list/offers-list';

const OffersListNear = (props) => {
  return (
    <OffersList cardType="NEAR" {...props}/>
  );
};

export default OffersListNear;
