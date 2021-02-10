import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {OFFERS} from './mocks/offers';

const offersCount = 312;

ReactDOM.render(
    <App
      offersCount={offersCount}
      offers={OFFERS}
    />,
    document.querySelector(`#root`)
);
