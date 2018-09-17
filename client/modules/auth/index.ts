import axios from 'axios';
import { Dispatch, Action } from 'redux';

import { history } from 'Boilerplate/store';
import { User } from 'Boilerplate/types';

import cookies from '../../utils/cookies';
const API_URL = '/api';

// Types
export enum AuthTypes {
  AUTH_USER = 'auth/AUTH_USER',
  LOGIN_USER = 'auth/LOGIN_USER',
  REGISTER_USER = 'auth/REGISTER_USER',
  UNAUTH_USER = 'auth/UNAUTH_USER',
  AUTH_ERROR = 'auth/AUTH_ERROR',
}

interface AuthAction extends Action {
  payload?: any;
}

interface AuthError {
  data: any,
  status: number,
  response: any,
}

interface AuthState {
  message: string,
  authenticated: boolean,
  error?: AuthError,
  content?: string,
}

// Reducer
const INITIAL_STATE: AuthState = {
  message: '',
  content: '',
  authenticated: false
};

export default function (state = INITIAL_STATE, action: AuthAction) {
  switch (action.type) {
    case AuthTypes.AUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: true,
        user: action.payload,
      };
    case AuthTypes.UNAUTH_USER:
      return { ...state, authenticated: false };
    case AuthTypes.AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// Action creators

// Action creator to remove cookie and set unauthenticated status
// Does not redirect like logoutUser()
export function unauthUser() {
  return (dispatch: Dispatch) => {
    dispatch({ type: AuthTypes.UNAUTH_USER });
    cookies.remove('token', { path: '/' });
  };
}

// Action creator to set authenticated status
// Assumes the cookie is already set
export function authUser(user: User) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: AuthTypes.AUTH_USER,
      payload: user,
    });
  };
}

// Action creator to handle errors
export function errorHandler(dispatch: Dispatch, error: AuthError, type: AuthTypes) {
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  }

  if (error.status === 401) {
    dispatch({
      type,
      payload: 'You are not authorized to do this. Please login and try again.',
    });
    logoutUser();
  } else {
    dispatch({
      type,
      payload: errorMessage,
    });
  }
}

// Action creator to handle logins
export interface LoginInfo {
  email: string;
  password: string;
};

export function loginUser({ email, password }: LoginInfo) {
  return (dispatch: Dispatch) => {
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then((response) => {
      cookies.set('token', response.data.token, { path: '/' });
      dispatch({
        type: AuthTypes.AUTH_USER,
        payload: response.data.user,
      });
      history.push('/');
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AuthTypes.AUTH_ERROR);
    });
  };
}

// Action creator to register user
export interface RegisterInfo {
  email: string;
  username: string;
  password: string;
};

export function registerUser({ email, username, password }: RegisterInfo) {
  return (dispatch: Dispatch) => {
    axios.post(`${API_URL}/auth/register`, { email, username, password })
    .then((response) => {
      cookies.set('token', response.data.token, { path: '/' });
      dispatch({
        type: AuthTypes.AUTH_USER,
        payload: response.data.user,
      });
      history.push('/');
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AuthTypes.AUTH_ERROR);
    });
  };
}

// Action creator to log out the user
export function logoutUser() {
  return (dispatch: Dispatch) => {
    dispatch({ type: AuthTypes.UNAUTH_USER });
    cookies.remove('token', { path: '/' });

    history.push('/');
  };
}
