import {
	SELECT_USER,
	REQUEST_USER_DATA,
	RECEIVE_USER_DATA,
	ADD_USER_TRIP,
	REQUEST_UPDATE_USERNAME,
	RECEIVE_UPDATE_USERNAME,
	ERROR_UPDATE_USERNAME,
	REQUEST_UPDATE_EMAIL,
	RECEIVE_UPDATE_EMAIL,
	ERROR_UPDATE_EMAIL,
	REQUEST_UPDATE_PASSWORD,
	RECEIVE_UPDATE_PASSWORD,
	ERROR_UPDATE_PASSWORD
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
		case ADD_USER_TRIP:
			return Object.assign({}, state, {
				user_trips: [action.trip, ...state.user_trips]
			});
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




function usernameUpdate(
	state = {
		isUserUpdated: false,
		user: {},	
	},
	action
	) {
	switch (action.type) {
		case REQUEST_UPDATE_USERNAME:
			return Object.assign({}, state, {
				isUserUpdated : action.isUserUpdated				
			});
		case ERROR_UPDATE_USERNAME:
			return Object.assign({}, state, {
				isUserUpdated : action.isUserUpdated				
			});
		case RECEIVE_UPDATE_USERNAME:
			return Object.assign({}, state, {
				user: Object.assign({}, state.user, {
					username: action.newUsername
				}),
				isUserUpdated : action.isUserUpdated
			});
	}
}

function emailUpdate(
	state = {
		isUserUpdated: false,
		user: {},	
	},
	action
	) {
	switch (action.type) {
		case REQUEST_UPDATE_EMAIL:
			return Object.assign({}, state, {
				isUserUpdated : action.isUserUpdated				
			});
		case ERROR_UPDATE_EMAIL:
			return Object.assign({}, state, {
				isUserUpdated : action.isUserUpdated				
			});
		case RECEIVE_UPDATE_EMAIL:
			return Object.assign({}, state, {
				user: Object.assign({}, state.user, {
					email: action.newEmail
				}),
				isUserUpdated : action.isUserUpdated
			});
	}
}

function passwordUpdate(
	state = {
		isUserUpdated: false	
	},
	action
	) {
	switch (action.type) {
		case REQUEST_UPDATE_EMAIL:
			return Object.assign({}, state, {
				isUserUpdated : action.isUserUpdated				
			});
		case ERROR_UPDATE_EMAIL:
			return Object.assign({}, state, {
				isUserUpdated : action.isUserUpdated				
			});
		case RECEIVE_UPDATE_EMAIL:
			return Object.assign({}, state, {
				user: Object.assign({}, state.user, {
					email: action.newEmail
				}),
				isUserUpdated : action.isUserUpdated
			});
	}
}

function gettingUserData(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USER_DATA:
		case REQUEST_USER_DATA:
		case ADD_USER_TRIP:
			return Object.assign({}, state, {
				[action.user_id]: userData(state[action.user_id], action)
			});
		case REQUEST_UPDATE_USERNAME:
		case RECEIVE_UPDATE_USERNAME:
		case ERROR_UPDATE_USERNAME:
			return Object.assign({}, state, {
				[action.user_id]: usernameUpdate(state[action.user_id], action)
			});
		case REQUEST_UPDATE_EMAIL:
		case RECEIVE_UPDATE_EMAIL:
		case ERROR_UPDATE_EMAIL:
			return Object.assign({}, state, {
				[action.user_id]: emailUpdate(state[action.user_id], action)
			});
		default:
			return state;
	}
}

export { gettingUserData, selectedUser };
