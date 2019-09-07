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
	RECEIVE_NEW_EXPENSE
} from "../actions/tripActions";

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
		expenses: []
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
				toDos: [action.expense, ...state.expenses]
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
				expenses: action.expenses
			});
		default:
			return state;
	}
}

function gettingTripData(state = {}, action) {
	switch (action.type) {
		case RECEIVE_NEW_EVENT:
		case REQUEST_NEW_EVENT:
		case RECEIVE_TRIP_DATA:
		case REQUEST_TRIP_DATA:
		case RECEIVE_NEW_TODO:
		case REQUEST_NEW_TODO:
		case RECEIVE_NEW_EXPENSE:
		case REQUEST_NEW_EXPENSE:
			return Object.assign({}, state, {
				[action.current_trip]: tripData(state[action.current_trip], action)
			});
		default:
			return state;
	}
}

// const tripReducer = combineReducers({
//   gettingTripData,
//   selectedTrip
// });

// export default tripReducer;

export { gettingTripData, selectedTrip };
