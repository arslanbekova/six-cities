import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const offersCount = 312;

ReactDOM.render(
    <App
      offersCount={offersCount}
    />,
    document.querySelector(`#root`)
);
