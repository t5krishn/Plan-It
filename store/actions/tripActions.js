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

// For updating store when new event is created

export const REQUEST_NEW_EVENT = "REQUEST_NEW_EVENT";

function requestNewEvent(current_trip, event) {
	return {
		type: REQUEST_NEW_EVENT,
		isTripUpdated: false,
		current_trip
	};
}

export const RECEIVE_NEW_EVENT = "RECEIVE_NEW_EVENT";

function receivedNewEvent(current_trip, event) {
	return {
		type: RECEIVE_NEW_EVENT,
		event,
		current_trip
	};
}

export function postNewEvent(event, userId, tripId) {
	const request = new Request(
		`http://localhost:3000/user/${userId}/trip/${tripId}/event`,
		{
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ event: event })
		}
	);
	return dispatch => {
		dispatch(requestNewEvent(tripId, event));
		fetch(request)
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.status === "ok") {
					return dispatch(receivedNewEvent(tripId, data.event));
				}
			});
	};
}

// For updating store when new todo is created

export const REQUEST_NEW_TODO = "REQUEST_NEW_TODO";

function requestNewTodo(current_trip, todo) {
	return {
		type: REQUEST_NEW_TODO,
		isTripUpdated: false,
		current_trip
	};
}

export const RECEIVE_NEW_TODO = "RECEIVE_NEW_TODO";

function receivedNewTodo(current_trip, todo) {
	return {
		type: RECEIVE_NEW_TODO,
		todo,
		current_trip
	};
}

export function postNewTodo(todo, userId, tripId) {
	const request = new Request(
		`http://localhost:3000/user/${userId}/trip/${tripId}/todo`,
		{
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ todo: todo })
		}
	);
	return dispatch => {
		dispatch(requestNewTodo(tripId, todo));
		fetch(request)
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.status === "ok") {
					return dispatch(receivedNewTodo(tripId, data.todo));
				}
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
