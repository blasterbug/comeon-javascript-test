'use strict';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { router } from './router.js';

//import './styles/main.scss';

// render the main component
ReactDOM.render(
  <Provider store={ store }>
    { router }
  </Provider>,
  document.getElementById( 'app' )
);