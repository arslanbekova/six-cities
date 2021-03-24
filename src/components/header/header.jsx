import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {authTypes} from '../../prop-types/prop-types';
import {fetchFavoritesOffers, logout} from "../../store/api-actions";

const Header = (props) => {
  const {authorizationStatus, authInfo, onOpenFavoritesPage, onClickLogoutButton} = props;

  const handleOpenFavoritesPage = () => {
    if (authorizationStatus) {
      onOpenFavoritesPage();
    }
  };

  const logoutButtonStyle = {
    marginLeft: 10 + `px`,
    width: 18 + `px`,
    height: 18 + `px`,
    backgroundImage: `url(../img/logout.svg)`
  };

  const handleLogout = () => {
    onClickLogoutButton();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user" style={{display: `flex`, alignItems: `baseline`}}>
                <Link className="header__nav-link header__nav-link--profile" to="/favorites" onClick={handleOpenFavoritesPage}>
                  <div className="header__avatar-wrapper user__avatar-wrapper" style={authorizationStatus ? {backgroundImage: `url(${authInfo.avatarUrl})`} : undefined}>
                  </div>
                  <span className={authorizationStatus && `header__user-name user__name` || `header__login`}>{authorizationStatus && authInfo.email || `Sign in`}</span>
                </Link>
                {authorizationStatus && <button className="header__logout-button button" type="button" onClick={handleLogout} style={logoutButtonStyle}></button>}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.bool.isRequired,
  authInfo: PropTypes.shape(authTypes),
  onOpenFavoritesPage: PropTypes.func.isRequired,
  onClickLogoutButton: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  authInfo: state.authInfo
});

const mapDispatchToProps = (dispatch) => ({
  onOpenFavoritesPage() {
    dispatch(fetchFavoritesOffers());
  },
  onClickLogoutButton() {
    dispatch(logout());
  }
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
