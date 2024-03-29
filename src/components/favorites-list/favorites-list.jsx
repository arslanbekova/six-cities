import React from 'react';
import {useSelector} from 'react-redux';
import {selectFavoritesOffers} from '../../store/offers-data/selectors';
import {ComponentType} from '../../utils/const';
import PlaceCard from '../place-card/place-card';

const FavoritesList = () => {
  const favoritesOffers = useSelector(selectFavoritesOffers);
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
                {Object.values(favoritesOffers).map((city) => city.map((offer) => offer.city.name === cityKey ? <PlaceCard cardType={ComponentType.FAVORITE} key={offer.id} offer={offer}/> : ``))}
              </div>
            </li>)}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default FavoritesList;
