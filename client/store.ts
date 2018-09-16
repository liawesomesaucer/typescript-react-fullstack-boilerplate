import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';

import rootReducer from './reducers';

export const history = createHistory();

const initialState = {};
const enhancers: Array<object> = [];
const middleware = [
  thunk,
  routerMiddleware(history),
];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);

  const { devToolsExtension } = window as any;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

// Redux enhancers
const composedEnhancers = (compose as any)(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

export default store;
