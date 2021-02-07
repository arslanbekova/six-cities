import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from '../main/main';

const App = (props) => {
  const {offersCount} = props;
  return (
    <Main offersCount={offersCount}/>
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
};

export default App;
