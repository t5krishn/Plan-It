import { combineReducers } from "redux";

import {
	SELECT_TRIP,
	REQUEST_TRIP_DATA,
	RECEIVE_TRIP_DATA,
	REQUEST_NEW_EVENT,
	RECEIVE_NEW_EVENT,
	REQUEST_NEW_TODO,
	RECEIVE_NEW_TODO,
	REQUEST_NEW_EXPENSE,
	RECEIVE_NEW_EXPENSE,
	RECEIVE_TRIP_UPDATE,
	REQUEST_TRIP_UPDATE,
	REQUEST_TRIP_ITEM_DELETE,
	RECEIVE_TRIP_ITEM_DELETE
} from "../actions/tripActions";

import {
	REQUEST_TRIP_INFO_UPDATE,
	RECEIVE_TRIP_INFO_FOR_TRIP,
	REQUEST_TRIP_DELETE,
	RECEIVE_TRIP_DELETE_FOR_TRIP
} from "../actions/userAction";

function selectedTrip(state = {}, action) {
	switch (action.type) {
		case SELECT_TRIP:
			return action.current_trip;
		default:
			return state;
	}
}

function tripData(
	state = {
		isFetchingTrip: false,
		events: [],
		toDos: [],
		expenses: [],
		tripUsers: []
	},
	action
) {
	switch (action.type) {
		case RECEIVE_NEW_EVENT:
			return Object.assign({}, state, {
				isFetchingTrip: false,
				events: [action.event, ...state.events]
			});
		case RECEIVE_NEW_TODO:
			return Object.assign({}, state, {
				isFetchingTrip: false,
				toDos: [action.todo, ...state.toDos]
			});
		case RECEIVE_NEW_EXPENSE:
			return Object.assign({}, state, {
				isFetchingTrip: false,
				expenses: [action.expense, ...state.expenses]
			});
		case REQUEST_NEW_EVENT:
		case REQUEST_NEW_TODO:
		case REQUEST_NEW_EXPENSE:
		case REQUEST_TRIP_DATA:
			return Object.assign({}, state, {
				isFetchingTrip: true
			});
		case RECEIVE_TRIP_DATA:
			return Object.assign({}, state, {
				isFetchingTrip: false,
				events: action.events,
				toDos: action.toDos,
				expenses: action.expenses,
				tripUsers: action.tripUsers
			});
		default:
			return state;
	}
}

function updateTrip(
	state = {
		isFetchingTrip: false,
		events: [],
		toDos: [],
		expenses: []
	},
	action
) {
  switch (action.type) {
    case REQUEST_TRIP_UPDATE:
    case REQUEST_TRIP_ITEM_DELETE:
    case REQUEST_TRIP_INFO_UPDATE:
    case REQUEST_TRIP_DELETE:
      return Object.assign({}, state, {
        isFetchingTrip: true
      });
    case RECEIVE_TRIP_INFO_FOR_TRIP:
      return Object.assign({}, state, {
        isFetchingTrip: false,
        tripUsers: [...action.users]
      });
    case RECEIVE_TRIP_DELETE_FOR_TRIP:
      return Object.assign({}, state, {
        isFetchingTrip: false
      });
    case RECEIVE_TRIP_UPDATE:
      return Object.assign({}, state, {
        isFetchingTrip: false,
        [action.updateType]: [ action.data, ...state[action.updateType]],
      });
    case RECEIVE_TRIP_ITEM_DELETE:
      return Object.assign({}, state, {
        isFetchingTrip: false,
        [action.updateType]: [ ...action.data ],
      });
    default:
      return state;
  }
}

function gettingTripData(state = {}, action) {
	switch (action.type) {
		case REQUEST_NEW_EVENT:
		case RECEIVE_NEW_EVENT:
		case REQUEST_TRIP_DATA:
		case RECEIVE_TRIP_DATA:
		case REQUEST_NEW_TODO:
		case RECEIVE_NEW_TODO:
		case REQUEST_NEW_EXPENSE:
		case RECEIVE_NEW_EXPENSE:
			return Object.assign({}, state, {
				[action.current_trip]: tripData(state[action.current_trip], action)
			});
		case REQUEST_TRIP_UPDATE:
		case RECEIVE_TRIP_UPDATE:
		case REQUEST_TRIP_ITEM_DELETE:
		case RECEIVE_TRIP_ITEM_DELETE:
		case REQUEST_TRIP_INFO_UPDATE:
		case RECEIVE_TRIP_INFO_FOR_TRIP:
		case REQUEST_TRIP_DELETE:
		case RECEIVE_TRIP_DELETE_FOR_TRIP:
			return Object.assign({}, state, {
				[action.current_trip]: updateTrip(state[action.current_trip], action)
			});
		default:
			return state;
	}
}

export { gettingTripData, selectedTrip };
