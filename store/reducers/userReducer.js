import {
	SELECT_USER,
	REQUEST_USER_DATA,
	RECEIVE_USER_DATA,
	RECEIVED_NEW_USER_TRIP,
	REQUEST_NEW_USER_TRIP,
	REQUEST_UPDATE_USERNAME,
	RECEIVE_UPDATE_USERNAME,
	ERROR_UPDATE_USERNAME,
	REQUEST_UPDATE_EMAIL,
	RECEIVE_UPDATE_EMAIL,
	ERROR_UPDATE_EMAIL,
	REQUEST_UPDATE_PASSWORD,
	RECEIVE_UPDATE_PASSWORD,
	ERROR_UPDATE_PASSWORD,
	REQUEST_UPDATE_PROFILEPIC,
	RECEIVE_UPDATE_PROFILEPIC,
	ERROR_UPDATE_PROFILEPIC,
	REQUEST_DELETE_ACCOUNT,
	CONFIRM_DELETE_ACCOUNT,
	ERROR_DELETE_ACCOUNT,
	REQUEST_ACCEPT_INVITE,
	CONFIRM_ACCEPT_INVITE,
	ERROR_ACCEPT_INVITE,
	REQUEST_DECLINE_INVITE,
	CONFIRM_DECLINE_INVITE,
	ERROR_DECLINE_INVITE,
	REQUEST_FRIEND_INVITE,
	CONFIRM_FRIEND_INVITE,
	ERROR_FRIEND_INVITE,
	RECEIVE_TRIP_INFO_UPDATE,
	RECEIVE_TRIP_DELETE
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
		case RECEIVED_NEW_USER_TRIP:
			return Object.assign({}, state, {
				isFetchingUser: true,
				user_trips: [{ ...action.trip }, ...state.user_trips]
			});
		case RECEIVE_TRIP_INFO_UPDATE:
		case RECEIVE_TRIP_DELETE:
			return Object.assign({}, state, {
				isFetchingUser: true,
				user_trips: [...action.trips]
			});
		case REQUEST_NEW_USER_TRIP:
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
		user: {}
	},
	action
) {
	switch (action.type) {
		case REQUEST_UPDATE_USERNAME:
		case ERROR_UPDATE_USERNAME:
			return Object.assign({}, state, {
				isUserUpdated: action.isUserUpdated
			});
		case RECEIVE_UPDATE_USERNAME:
			return Object.assign({}, state, {
				user: Object.assign({}, state.user, {
					username: action.newUsername
				}),
				isUserUpdated: action.isUserUpdated
			});
	}
}

function emailUpdate(
	state = {
		isUserUpdated: false,
		user: {}
	},
	action
) {
	switch (action.type) {
		case REQUEST_UPDATE_EMAIL:
		case ERROR_UPDATE_EMAIL:
			return Object.assign({}, state, {
				isUserUpdated: action.isUserUpdated
			});
		case RECEIVE_UPDATE_EMAIL:
			return Object.assign({}, state, {
				user: Object.assign({}, state.user, {
					email: action.newEmail
				}),
				isUserUpdated: action.isUserUpdated
			});
	}
}

function passwordUpdate(state = { isUserUpdated: false }, action) {
	switch (action.type) {
		case REQUEST_UPDATE_PASSWORD:
		case ERROR_UPDATE_PASSWORD:
		case RECEIVE_UPDATE_PASSWORD:
			return Object.assign({}, state, {
				isUserUpdated: action.isUserUpdated
			});
	}
}

function profilePicUpdate(
	state = {
		isUserUpdated: false,
		user: {}
	},
	action
) {
	switch (action.type) {
		case REQUEST_UPDATE_PROFILEPIC:
		case ERROR_UPDATE_PROFILEPIC:
			return Object.assign({}, state, {
				isUserUpdated: action.isUserUpdated
			});
		case RECEIVE_UPDATE_PROFILEPIC:
			return Object.assign({}, state, {
				user: Object.assign({}, state.user, {
					profile_picture: action.newProfilePic
				}),
				isUserUpdated: action.isUserUpdated
			});
	}
}

function deleteAccount(
	state = {
		isUserUpdated: false,
		user: {}
	},
	action
) {
	switch (action.type) {
		case REQUEST_DELETE_ACCOUNT:
		case CONFIRM_DELETE_ACCOUNT:
		case ERROR_DELETE_ACCOUNT:
			return Object.assign({}, state, {
				isUserUpdated: action.isUserUpdated
			});
	}
}

function friendInvite(
	state = {
		isUserUpdated: false,
		user_friends: []
	},
	action
) {
	switch (action.type) {
		case REQUEST_ACCEPT_INVITE:
		case ERROR_ACCEPT_INVITE:
		case REQUEST_DECLINE_INVITE:
		case ERROR_DECLINE_INVITE:
		case REQUEST_FRIEND_INVITE:
		case ERROR_FRIEND_INVITE:
			return Object.assign({}, state, {
				isUserUpdated: action.isUserUpdated
			});
		case CONFIRM_DECLINE_INVITE:
		case CONFIRM_ACCEPT_INVITE:
		case CONFIRM_FRIEND_INVITE:
			return Object.assign({}, state, {
				user_friends: [...action.friends]
			});
	}
}

function gettingUserData(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USER_DATA:
		case REQUEST_USER_DATA:
		case RECEIVED_NEW_USER_TRIP:
		case REQUEST_NEW_USER_TRIP:
		case RECEIVE_TRIP_INFO_UPDATE:
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
		case REQUEST_UPDATE_PASSWORD:
		case RECEIVE_UPDATE_PASSWORD:
		case ERROR_UPDATE_PASSWORD:
			return Object.assign({}, state, {
				[action.user_id]: passwordUpdate(state[action.user_id], action)
			});
		case REQUEST_UPDATE_PROFILEPIC:
		case RECEIVE_UPDATE_PROFILEPIC:
		case ERROR_UPDATE_PROFILEPIC:
			return Object.assign({}, state, {
				[action.user_id]: profilePicUpdate(state[action.user_id], action)
			});
		case REQUEST_DELETE_ACCOUNT:
		case CONFIRM_DELETE_ACCOUNT:
		case ERROR_DELETE_ACCOUNT:
			return Object.assign({}, state, {
				[action.user_id]: deleteAccount(state[action.user_id], action)
			});
		case REQUEST_ACCEPT_INVITE:
		case CONFIRM_ACCEPT_INVITE:
		case ERROR_ACCEPT_INVITE:
		case REQUEST_DECLINE_INVITE:
		case CONFIRM_DECLINE_INVITE:
		case ERROR_DECLINE_INVITE:
		case REQUEST_FRIEND_INVITE:
		case CONFIRM_FRIEND_INVITE:
		case ERROR_FRIEND_INVITE:
			return Object.assign({}, state, {
				[action.user_id]: friendInvite(state[action.user_id], action)
			});
		case RECEIVE_TRIP_DELETE:
			return Object.assign(
				{},
				{
					[action.user_id]: userData(state[action.user_id], action)
				}
			);
		default:
			return state;
	}
}

export { gettingUserData, selectedUser };
