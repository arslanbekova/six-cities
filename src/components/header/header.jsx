import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {PathName} from '../../utils/const';
import {fetchFavoritesOffers, logout} from "../../store/actions/api-actions";

const Header = () => {
  const {authorizationStatus, authInfo} = useSelector((state) => state.USER);
  const logoutButtonStyle = {
    marginLeft: 10 + `px`,
    width: 18 + `px`,
    height: 18 + `px`,
    backgroundImage: `url(../img/logout.svg)`
  };
  const dispatch = useDispatch();

  const handleFavoritesPageOpen = () => {
    if (authorizationStatus) {
      dispatch(fetchFavoritesOffers());
    }
  };

  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={PathName.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user" style={{display: `flex`, alignItems: `baseline`}}>
                <Link className="header__nav-link header__nav-link--profile" to={PathName.FAVORITES} onClick={handleFavoritesPageOpen}>
                  <div className="header__avatar-wrapper user__avatar-wrapper" style={authorizationStatus ? {backgroundImage: `url(${authInfo.avatarUrl})`} : undefined}>
                  </div>
                  <span className={authorizationStatus && `header__user-name user__name` || `header__login`}>{authorizationStatus && authInfo.email || `Sign in`}</span>
                </Link>
                {authorizationStatus && <button className="header__logout-button button" type="button" onClick={handleLogoutButtonClick} style={logoutButtonStyle}></button>}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
