import React from 'react';
import PropTypes from 'prop-types';
import {authTypes} from '../../prop-types/prop-types';

const RoomHost = (props) => {
  const {hostInfo, offerDescription} = props;
  const isPro = `
    .property__avatar-wrapper--pro::after {
      content: "";
      position: absolute;
      top: -3px;
      right: -16px;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      background-color: #ff9000;
      background-image: url(../img/star-white.svg);
      background-size: 20px 19px;
      background-position: center 6px;
      background-repeat: no-repeat
    }`;
  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className="property__avatar-wrapper user__avatar-wrapper property__avatar-wrapper--pro" style={hostInfo.isPro ? {isPro} : undefined}>
          <img className="property__avatar user__avatar" src={hostInfo.avatarUrl} width="74" height="74" alt="Host avatar"/>
        </div>
        <span className="property__user-name">
          {hostInfo.name}
        </span>
      </div>
      <div className="property__description">
        {offerDescription.split(`.`).slice(0, -1).map((sentence) =>
          <p className="property__text" key={sentence}>
            {sentence + `.`}
          </p>
        )}
      </div>
    </div>
  );
};

RoomHost.propTypes = {
  hostInfo: PropTypes.shape(authTypes).isRequired,
  offerDescription: PropTypes.string.isRequired
};

export default RoomHost;
