import React from 'react';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../browser-history";

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route exact path="/login">
          <SignIn/>
        </Route>
        <PrivateRoute exact
          path="/favorites"
          render={() => <Favorites/>}>
        </PrivateRoute>
        <Route exact path="/offer/:id">
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
