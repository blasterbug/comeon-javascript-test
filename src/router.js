'use strict';

import _ from 'lodash';
import React from 'react';
import {
  IndexRoute,
  Route,
  Router,
} from 'react-router';

import { history } from './store';

import App from './components/App';
// to import components on demand
import asyncComponent from './components/AsyncComponent';

// dynamically imported component
const NotFound = asyncComponent( () => import( './components/NotFound') );
const Login = asyncComponent( () => import( './components/Login') );
const Casino = asyncComponent( () => import( './components/Casino') );
const Game = asyncComponent( () => import( './components/Game') );

// build the router
const router = (
  <Router history={ history } >
    <Route path="/" component={ App } >
      <IndexRoute component={ Login } />
      <Route path="login" component={ Login } />
      <Route path="casino">
        <IndexRoute component={ Casino } />
        <Route path=":game" component={ Game } />
      </Route>
      <Route path="*" component={ NotFound } />
    </Route>
  </Router>
);

// export
export { router };
