import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const CitiesList = (props) => {
  const {handleChangeCity, activeCity} = props;

  const CITIES = [
    `Paris`,
    `Cologne`,
    `Brussels`,
    `Amsterdam`,
    `Hamburg`,
    `Dusseldorf`
  ];

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) =>
        <li key={city} className="locations__item">
          <a className={`locations__item-link tabs__item ${city === activeCity && `tabs__item--active`}`} onClick={() => handleChangeCity(city)}>
            <span>{city}</span>
          </a>
        </li>
      )}
    </ul>
  );
};

CitiesList.propTypes = {
  handleChangeCity: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    activeCity: state.city,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
