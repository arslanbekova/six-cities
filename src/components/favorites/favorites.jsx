import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../header/header';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoritesList from '../favorites-list/favorites-list';

const Favorites = () => {
  const favoritesOffers = useSelector((state) => state.DATA);

  return (
    <div className="page">
      <Header/>
      {!Object.keys(favoritesOffers).length ? <FavoritesEmpty/> : <FavoritesList/>}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

export default Favorites;
