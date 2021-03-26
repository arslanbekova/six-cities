import React from 'react';
import Map from '../map/map';
import {ComponentType} from '../../utils/const';

const MapNear = (props) => {
  return (
    <Map mapType={ComponentType.NEAR} {...props}/>
  );
};

export default MapNear;

