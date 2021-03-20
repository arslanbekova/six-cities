import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types';
import FavoritePlaceCard from '../favorite-place-card/favorite-place-card';

const FavoritesList = (props) => {
  const {favoritesOffers} = props;
  return (
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
  );
};

FavoritesList.propTypes = {
  favoritesOffers: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape(offerTypes))).isRequired
};

export default FavoritesList;
