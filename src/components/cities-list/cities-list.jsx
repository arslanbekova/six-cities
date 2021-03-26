import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeCity} from '../../store/actions/main-page-actions';

const CitiesList = () => {
  const {city} = useSelector((state) => state.MAIN_PAGE);

  const CITIES = [
    `Paris`,
    `Cologne`,
    `Brussels`,
    `Amsterdam`,
    `Hamburg`,
    `Dusseldorf`
  ];

  const dispatch = useDispatch();

  const handleCityChange = (activeCity) => {
    dispatch(changeCity(activeCity));
  };

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((cityItem) =>
        <li key={cityItem} className="locations__item">
          <a className={`locations__item-link tabs__item ${cityItem === city && `tabs__item--active`}`} onClick={() => handleCityChange(cityItem)}>
            <span>{cityItem}</span>
          </a>
        </li>
      )}
    </ul>
  );
};

export default CitiesList;
