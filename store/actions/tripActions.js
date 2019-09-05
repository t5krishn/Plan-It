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

export function fetchTripData(trip) {
	return dispatch => {
		// return fetch(`http://localhost:/user/1/trip/1/event`)
		//   .then(response => response.json())
		//   .then(json => dispatch(receiveTripData(trip, json)));

		dispatch(requestTripData(trip));
		return Promise.all([
			fetch(`http://localhost:3000/user/1/trip/1/event`),
			fetch(`http://localhost:3000/user/1/trip/1/to_do`),
			fetch(`http://localhost:3000/user/1/trip/1/expense`)
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
