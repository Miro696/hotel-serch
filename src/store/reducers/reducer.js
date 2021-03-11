// import React from 'react';

export const reducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {...state, user: action.user}
    case 'LOGOUT':
      return {...state, user: null}
  default:
    return state;
  }
}
// Initial state
export const initialState = {
  user: JSON.parse(window.localStorage.getItem('token-data')) ?? null
}