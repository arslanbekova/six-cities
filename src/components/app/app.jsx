import React from 'react';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import {PathName} from '../../utils/const';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../browser-history";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <ReactNotification/>
      <Switch>
        <Route exact path={PathName.MAIN}>
          <Main/>
        </Route>
        <Route exact path={PathName.LOGIN}>
          <SignIn/>
        </Route>
        <PrivateRoute exact
          path={PathName.FAVORITES}
          render={() => <Favorites/>}>
        </PrivateRoute>
        <Route exact path={PathName.OFFER}>
          <Room/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
