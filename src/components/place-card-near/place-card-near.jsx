import React from 'react';
import PlaceCard from '../place-card/place-card';

const PlaceCardNear = (props) => {
  return (
    <PlaceCard className="near-places__card" {...props}/>
  );
};

export default PlaceCardNear;
