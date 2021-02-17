import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {OFFERS} from './mocks/offers';
import {REVIEWS} from '../../mocks/reviews';

const offersCount = 312;

ReactDOM.render(
    <App
      offersCount={offersCount}
      offers={OFFERS}
      reviews={REVIEWS}
    />,
    document.querySelector(`#root`)
);
