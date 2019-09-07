export const SELECT_TRIP = "SELECT_TRIP";

export function selectTrip(trip) {
	return {
		type: SELECT_TRIP,
		current_trip: trip
	};
}

export const REQUEST_TRIP_DATA = "REQUEST_TRIP_DATA";

function requestTripData(trip) {
	return {
		type: REQUEST_TRIP_DATA,
		current_trip: trip,
		isFetchingTrip: true
	};
}

export const RECEIVE_TRIP_DATA = "RECEIVE_TRIP_DATA";

function receiveTripData(trip, data) {
	return {
		type: RECEIVE_TRIP_DATA,
		isFetchingTrip: false,
		current_trip: trip,
		events: data[0],
		toDos: data[1],
		expenses: data[2]
	};
}

export const ADD_TRIP_EVENT = "ADD_TRIP_EVENT";

export function addNewTripEvent(event) {
	return {
		type: ADD_TRIP_EVENT,
		event
	};
}

export function postNewEvent(event, userId, tripId) {
	return dispatch => {
		dispatch(addNewTripEvent(user));
		return Promise(
			fetch(`http://localhost:3000/user/${userId}/trip/${tripId}/event`)
		)
			.then(response => {
				let data = response.map(res => res.json());
				return Promise.all(data);
			})
			.then(data => {
				return dispatch(receiveTripData(trip, data));
			});
	};
}

export function fetchTripData(trip, user) {
	return dispatch => {
		dispatch(requestTripData(trip));
		return Promise.all([
			fetch(`http://localhost:3000/user/${user}/trip/${trip}/event`),
			fetch(`http://localhost:3000/user/${user}/trip/${trip}/to_do`),
			fetch(`http://localhost:3000/user/${user}/trip/${trip}/expense`)
		])
			.then(response => {
				let data = response.map(res => res.json());
				return Promise.all(data);
			})
			.then(data => {
				return dispatch(receiveTripData(trip, data));
			});
	};
}
