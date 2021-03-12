import React from 'react';
import PropTypes from 'prop-types';
import FavoritePlaceCard from '../favorite-place-card/favorite-place-card';
import Header from '../header/header';
import {connect} from 'react-redux';
import {offerTypes} from '../../prop-types/prop-types';

const Favorites = (props) => {
  const {offers} = props;

  const favoritesOffers = offers.filter((offer) => offer.isFavorite === true).reduce((result, item) => {
    result[item.city.name] = [...result[item.city.name] || [], item];
    return result;
  }, {});

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(favoritesOffers).map((cityKey) => <li className="favorites__locations-items" key={cityKey}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{cityKey}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {Object.values(favoritesOffers).map((city) => city.map((offer) => offer.city.name === cityKey ? <FavoritePlaceCard key={offer.id} offer={offer}/> : ``))}
                </div>
              </li>)}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired
};

const mapStateToProps = (state) => {
  return {
    offers: state.offers,
  };
};

export {Favorites};
export default connect(mapStateToProps)(Favorites);
