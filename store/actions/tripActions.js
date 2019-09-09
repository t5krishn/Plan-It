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
		expenses: data[2],
		tripUsers: data[3]
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
		`https://plan-it-api-1.herokuapp.com/user/${userId}/trip/${tripId}/event`,
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
		`https://plan-it-api-1.herokuapp.com/user/${userId}/trip/${tripId}/to_do`,
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

// For updating store when new expense is created

export const REQUEST_NEW_EXPENSE = "REQUEST_NEW_EXPENSE";

function requestNewExpense(current_trip, expense) {
	return {
		type: REQUEST_NEW_EXPENSE,
		isTripUpdated: false,
		current_trip
	};
}

export const RECEIVE_NEW_EXPENSE = "RECEIVE_NEW_EXPENSE";

function receivedNewExpense(current_trip, expense) {
	return {
		type: RECEIVE_NEW_EXPENSE,
		expense,
		current_trip
	};
}

export function postNewExpense(expense, userId, tripId) {
	const request = new Request(
		`https://plan-it-api-1.herokuapp.com/user/${userId}/trip/${tripId}/expense`,
		{
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ expense: expense })
		}
	);
	return dispatch => {
		dispatch(requestNewExpense(tripId, expense));
		fetch(request)
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.status === "ok") {
					return dispatch(receivedNewExpense(tripId, data.expense));
				}
			});
	};
}

export function fetchTripData(trip, user) {
	return dispatch => {
		dispatch(requestTripData(trip));
		return Promise.all([
			fetch(
				`https://plan-it-api-1.herokuapp.com/user/${user}/trip/${trip}/event`
			),
			fetch(
				`https://plan-it-api-1.herokuapp.com/user/${user}/trip/${trip}/to_do`
			),
			fetch(
				`https://plan-it-api-1.herokuapp.com/user/${user}/trip/${trip}/expense`
			),
			fetch(
				`https://plan-it-api-1.herokuapp.com/user/${user}/trip/${trip}/users`
			)
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

export const REQUEST_TRIP_UPDATE = "REQUEST_TRIP_UPDATE";

function requestTripUpdate(current_trip) {
	return {
		type: REQUEST_TRIP_UPDATE,
		isTripUpdated: false,
		current_trip
	};
}

export const RECEIVE_TRIP_UPDATE = "RECEIVE_TRIP_UPDATE";

function receivedTripUpdate(current_trip, data, updateType) {
	return {
		type: RECEIVE_TRIP_UPDATE,
		updateType,
		data,
		current_trip
	};
}

// ACTION THAT COMBINES ANY TRIP ITEM UPDATE EXCEPT TRIP USERS
// -------------------------------------------------------------------------------------
// updateType could be [ events, toDos, expenses ]
// -------------------------------------------------------------------------------------
// events => updateInfo => { id:eventId, name, address, start_on, ends_on, description }
// toDos => updateInfo => { id:toDoId, content, completed }
// expenses => updateInfo => { id:expenseID, name, amount_in_cents, expense_date, added:[user_ids], removed:[user_ids] }

export function updateTripItem(userId, tripId, updateType, updateInfo) {
	// store object array is different from route name so below state handles that
	const tripItemURl =
		updateType === "events"
			? "event"
			: updateType === "toDos"
			? "to_do"
			: "expense";

	const request = new Request(
		`https://plan-it-api-1.herokuapp.com/user/${userId}/trip/${tripId}/${tripItemURl}/${
			updateInfo.id
		}`,
		{
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ ...updateInfo })
		}
	);
	return dispatch => {
		dispatch(requestTripUpdate(tripId));
		fetch(request)
			.then(response => {
				return response.json();
			})
			.then(json => {
				if (json.status === "ok") {
					return dispatch(receivedTripUpdate(tripId, json.data, updateType));
				}
			});
	};
}

export const REQUEST_TRIP_ITEM_DELETE = "REQUEST_TRIP_ITEM_DELETE";

function requestTripItemDelete(current_trip) {
	return {
		type: REQUEST_TRIP_ITEM_DELETE,
		isTripUpdated: false,
		current_trip
	};
}

export const RECEIVE_TRIP_ITEM_DELETE = "RECEIVE_TRIP_ITEM_DELETE";

function receivedTripItemDelete(current_trip, data, updateType) {
	return {
		type: RECEIVE_TRIP_ITEM_DELETE,
		updateType,
		data,
		current_trip
	};
}

// -------------------------------------------------------------------------------------
// updateType could be [ events, toDos, expenses ]
// -------------------------------------------------------------------------------------
export function deleteTripItem(userId, tripId, updateType, updateId) {
	const tripItemURl =
		updateType === "events"
			? "event"
			: updateType === "toDos"
			? "to_do"
			: "expense";

	const request = new Request(
		`https://plan-it-api-1.herokuapp.com/user/${userId}/trip/${tripId}/${tripItemURl}/${updateId}/delete`,
		{
			method: "POST",
			headers: {
				"Content-type": "application/json"
			}
		}
	);
	return dispatch => {
		dispatch(requestTripItemDelete(tripId));
		fetch(request)
			.then(response => {
				return response.json();
			})
			.then(json => {
				if (json.status === "ok") {
					fetch(
						`https://plan-it-api-1.herokuapp.com/user/${userId}/trip/${tripId}/${tripItemURl}`
					)
						.then(res => res.json())
						.then(data => {
							return dispatch(receivedTripItemDelete(tripId, data, updateType));
						});
				}
			});
	};
}

// USERS => updateInfo => {removed: [ user_ids ], added: [ user_ids ] }
