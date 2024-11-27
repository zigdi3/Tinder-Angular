import { initialState } from './users.state';

import {
  LOAD_PROFILE,
  USER_LOGGED_IN,
  USER_LOGOUT,
  USER_PROFILE,
  USER_REGISTERED,
  USERS_LIST,
} from './users.actions';

function userLogin(state: any, action: any) {
  const result = action.result;

  if (result.success) {
    return Object.assign({}, state, {
      userAuthenticated: result.success,
      token: result.token,
      username: result.user.email,
    });
  }

  return state;
}

function userRegistration(state: any, action: any) {
  const result = action.result;
  return Object.assign({}, state, {
    userRegistered: result.success,
  });
}

function logout(state: any, action: any) {
  return Object.assign({}, state, {
    userAuthenticated: false,
    token: null,
    username: null,
  });
}

// function profile(state: any, action: any) {
//   console.log(action);
//   const result = action.result;
//   console.log(result.updated.name);
//   return Object.assign({}, state, {
//     profileCreated: result.success,
//     username: result.updated.name
//   });
// }

function loadProfile(state: any, profile: any) {
  return Object.assign({}, state, { profile });
}

function loadUsers(state: any, usersList: any) {
  return Object.assign({}, state, { usersList });
}

export function usersReducer(state = initialState, action: any) {
  switch (action.type) {
    case USER_REGISTERED:
      return userRegistration(state, action);
    case USER_LOGGED_IN:
      return userLogin(state, action);
    case USER_LOGOUT:
      return logout(state, action);
    // case USER_PROFILE:
    //   return profile(state, action);
    case USERS_LIST:
      return loadUsers(state, action.users);
    case LOAD_PROFILE:
      return loadProfile(state, action.profile);
    default:
      return state;
  }
}
