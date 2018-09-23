import axios from 'axios';
import { Dispatch } from 'redux';

import { history } from 'Boilerplate/store';
import cookies from '../../utils/cookies';

// Types
import { AuthTypes, errorHandler } from '../auth';

export const TODO_CREATE = 'todos/TODO_CREATE';
export const TODO_LOAD = 'todos/TODO_LOAD';
export const TODO_LOAD_ALL = 'todos/TODO_LOAD_ALL';
export const TODO_DELETE = 'todos/TODO_DELETE';

const API_URL = '/api';

// Reducer
export default function (state = {}, action: any) {
  switch (action.type) {
    case TODO_LOAD:
      return {
        ...state,
        todo: action.payload,
      };
    case TODO_LOAD_ALL:
      return {
        ...state,
        todos: action.payload,
      };
    case TODO_CREATE:
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
    axios.get(`${API_URL}/todos/${todoId}`)
    .then((response) => {
      dispatch({
        type: TODO_LOAD,
        payload: response.data.todo,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AuthTypes.AUTH_ERROR);
    });
  };
}

/**
 * Action creator for loading all the todos
 */
export function loadTodos() {
  return (dispatch: Dispatch) => {
    axios.get(`${API_URL}/todos`)
    .then((response) => {
      dispatch({
        type: TODO_LOAD_ALL,
        payload: response.data.todos,
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
  return (dispatch: Dispatch) => {
    axios.post(`${API_URL}/todos/create`, { body: { data } })
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

/**
 * Action creator for finishing and deleting a TODO based on ID
 *
 * @param todoId: the ID of the TODO to load
 */
export function finishTodo(todoId: string) {
  return (dispatch: Dispatch) => {
    axios.get(`${API_URL}/todos/${todoId}`)
    .then((response) => {
      dispatch({
        type: TODO_DELETE,
        payload: response.data.todoId,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AuthTypes.AUTH_ERROR);
    });
  };
}
