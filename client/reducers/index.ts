import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from '../modules/auth';
import todoReducer from '../modules/todos';

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  auth: authReducer,
  todos: todoReducer,
});

export default rootReducer;
