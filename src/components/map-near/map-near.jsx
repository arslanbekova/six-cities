import React from 'react';
import Map from '../map/map';

const MapNear = (props) => {
  return (
    <Map cardType="NEAR" {...props}/>
  );
};

export default MapNear;
