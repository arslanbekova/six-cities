import React from 'react';
import OffersList from '../offers-list/offers-list';
import {ComponentType} from '../../utils/const';

const OffersListNear = (props) => {
  return (
    <OffersList cardType={ComponentType.NEAR} {...props}/>
  );
};

export default OffersListNear;
