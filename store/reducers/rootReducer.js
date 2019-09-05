import { combineReducers } from "redux";

import { gettingTripData, selectedTrip } from "./tripReducer";
import { gettingUserData, selectedUser } from "./userReducer";

import { RESET_STORE } from "../actions/storeAction";

const appReducer = combineReducers({
  gettingTripData,
  selectedTrip,
  gettingUserData,
  selectedUser
});

export function rootReducer(state = {}, action) {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
}
