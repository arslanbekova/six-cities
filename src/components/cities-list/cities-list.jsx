import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = (props) => {
  const {onChangeCity, city} = props;
  return (
    <ul className="locations__list tabs__list">
      <li className="locations__item">
        <a className={`locations__item-link tabs__item ${city === `Paris` && `tabs__item--active`}`} href="#" onClick={() => onChangeCity(`Paris`)}>
          <span>Paris</span>
        </a>
      </li>
      <li className="locations__item">
        <a className={`locations__item-link tabs__item ${city === `Cologne` && `tabs__item--active`}`} href="#" onClick={() => onChangeCity(`Cologne`)}>
          <span>Cologne</span>
        </a>
      </li>
      <li className="locations__item">
        <a className={`locations__item-link tabs__item ${city === `Brussels` && `tabs__item--active`}`} href="#" onClick={() => onChangeCity(`Brussels`)}>
          <span>Brussels</span>
        </a>
      </li>
      <li className="locations__item">
        <a className={`locations__item-link tabs__item ${city === `Amsterdam` && `tabs__item--active`}`} onClick={() => onChangeCity(`Amsterdam`)}>
          <span>Amsterdam</span>
        </a>
      </li>
      <li className="locations__item">
        <a className={`locations__item-link tabs__item ${city === `Hamburg` && `tabs__item--active`}`} href="#" onClick={() => onChangeCity(`Hamburg`)}>
          <span>Hamburg</span>
        </a>
      </li>
      <li className="locations__item">
        <a className={`locations__item-link tabs__item ${city === `Dusseldorf` && `tabs__item--active`}`} href="#" onClick={() => onChangeCity(`Dusseldorf`)}>
          <span>Dusseldorf</span>
        </a>
      </li>
    </ul>
  );
};

CitiesList.propTypes = {
  onChangeCity: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired
};

export default CitiesList;
