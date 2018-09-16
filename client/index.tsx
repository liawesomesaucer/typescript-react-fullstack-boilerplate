import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import axios from 'axios';

import store, { history } from './store';
import cookies from './utils/cookies';

import App from './App';

import { AuthTypes } from './modules/auth';

// Load JWT tokens
const token = cookies.get('token');

if (token) {
  store.dispatch({ type: AuthTypes.AUTH_USER });
}

// Attaches Authorization headers to all requests
axios.defaults.headers.common.Authorization = cookies.get('token');

const render = (Component: React.ComponentType) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route component={Component} />
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  , document.getElementById('app'));
};

render(App);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
