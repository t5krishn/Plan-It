import { combineReducers } from "redux";

import {
  SELECT_USER,
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA
} from "../actions/userAction";

function selectedUser(state = {}, action) {
  switch (action.type) {
    case SELECT_USER:
      return action.user_id;
    default:
      return state;
  }
}

function userData(
  state = {
    isFetchingUser: false,
    user: {},
    user_trips: [],
    user_expenses: [],
    user_friends: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_USER_DATA:
      return Object.assign({}, state, {
        isFetchingUser: true
      });
    case RECEIVE_USER_DATA:
      return Object.assign({}, state, {
        isFetchingUser: false,
        user_id: action.user_id,
        user: { ...action.user },
        user_trips: action.user_trips,
        user_expenses: action.user_expenses,
        user_friends: action.user_friends
      });
    default:
      return state;
  }
}

function gettingUserData(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USER_DATA:
    case REQUEST_USER_DATA:
      return Object.assign({}, state, {
        [action.user_id]: userData(state[action.user_id], action)
      });
    default:
      return state;
  }
}

// const userReducer = combineReducers({
//   gettingUserData,
//   selectedUser
// });

// export default userReducer;

export {  gettingUserData, selectedUser };
