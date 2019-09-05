import { combineReducers } from "redux";

import {
	SELECT_TRIP,
	REQUEST_TRIP_DATA,
	RECEIVE_TRIP_DATA
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
		case RECEIVE_TRIP_DATA:
		case REQUEST_TRIP_DATA:
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
