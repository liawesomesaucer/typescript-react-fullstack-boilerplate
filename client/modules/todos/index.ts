import axios from 'axios';
import { Dispatch, Action } from 'redux';

import { history } from 'Boilerplate/store';
import cookies from '../../utils/cookies';

// Types
import { AuthTypes, errorHandler } from '../auth';

export const TODO_UPDATE = 'todos/TODO_UPDATE';
export const TODO_CREATE = 'todos/TODO_CREATE';
export const TODO_LOAD = 'todos/TODO_LOAD';
export const TODO_DELETE = 'todos/TODO_DELETE';

const API_URL = '/api';

// Reducer
export default function (state = {}, action: any) {
  switch (action.type) {
    case TODO_LOAD:
      return {
        ...state,
        TODO: action.payload,
      };
    case TODO_CREATE:
      return state;
    case TODO_UPDATE:
      return state;
    case TODO_DELETE:
      return state;
    default:
      return state;
  }
}


// Action creators

/**
 * Action creator for loading a TODO based on ID
 *
 * @param todoId: the ID of the TODO to load
 */
export function loadTodo(todoId: string) {
  return (dispatch: Dispatch) => {
    axios.get(`${API_URL}/todos/${todoId}`, {
      headers: { Authorization: cookies.get('token') },
    })
    .then((response) => {
      dispatch({
        type: TODO_LOAD,
        payload: response.data.guide,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AuthTypes.AUTH_ERROR);
    });
  };
}

/**
 * Action creator to create a todo
 */
export function createTodo(data: any) {
  const options = { headers: { Authorization: cookies.get('token') } };

  return (dispatch: Dispatch) => {
    axios.post(`${API_URL}/todos/create`, { body: { data } }, options)
    .then((res) => {
      dispatch({
        type: TODO_CREATE,
      });
      history.push(`/todos/${res.data._id}`);
    })
    .catch((error) => {
      // TODO: if unauthorized
      errorHandler(dispatch, error.response, AuthTypes.AUTH_ERROR);
      // TODO: handle other error types
    });
  };
}
