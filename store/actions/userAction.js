export const SELECT_USER = "SELECT_USER";

export function selectUser(user) {
  return {
    type: SELECT_USER,
    user_id: user
  };
}

export const REQUEST_USER_DATA = "REQUEST_USER_DATA";

function requestUserData(user) {
  return {
    type: REQUEST_USER_DATA,
    user_id: user,
    isFetchingUser: true
  };
}

export const RECEIVE_USER_DATA = "RECEIVE_USER_DATA";

function receiveUserData(user, data) {
  return {
    type: RECEIVE_USER_DATA,
    isFetchingUser: false,
    user_id: user,
    user: {
      first_name: data[0].first_name,
      last_name: data[0].last_name,
      email: data[0].email,
      username: data[0].username,
      profile_picture: data[0].profile_picture
    },
    user_trips: data[1],
    user_expenses: data[2],
    user_friends: data[3]
  };
}

export const ADD_USER_TRIP = "ADD_USER_TRIP";

export function addNewUserTrip(trip, user_id) {
  return {
    type: ADD_USER_TRIP,
    trip,
    user_id
  };
}

export function fetchUserData(user) {
  return dispatch => {
    dispatch(requestUserData(user));
    return Promise.all([
      fetch(`http://localhost:5422/user/${user}`),
      fetch(`http://localhost:5422/user/${user}/trip`),
      fetch(`http://localhost:5422/user/${user}/transactions`),
      fetch(`http://localhost:5422/user/${user}/friend`)
    ])
      .then(response => {
        let data = response.map(res => res.json());
        return Promise.all(data);
      })
      .then(data => {
        return dispatch(receiveUserData(user, data));
      });
  };
}

export const REQUEST_UPDATE_USERNAME = "REQUEST_UPDATE_USERNAME";

function requestUpdateUsername(user) {
  return {
    type: REQUEST_UPDATE_USERNAME,
    user_id: user,
    isUserUpdated: false
  };
}

export const RECEIVE_UPDATE_USERNAME = "RECEIVE_UPDATE_USERNAME";

function receiveUpdateUsername(user, data) {
  return {
    type: RECEIVE_UPDATE_USERNAME,
    user_id: user,
    newUsername: data.newUsername,
    isUserUpdated: true
  };
}

export const ERROR_UPDATE_USERNAME = "ERROR_UPDATE_USERNAME";

function errorUpdateUsername(user, data) {
  return {
    type: ERROR_UPDATE_USERNAME,
    user_id: user,
    isUserUpdated: {
		error: data.error,
		error_message: data.error_message
	}
  };
}

export function changeUsername(user, newUsername) {
  const request = new Request(`http://localhost:5422/user/${user}/username`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ user, newUsername })
  });
  return dispatch => {
    dispatch(requestUpdateUsername(user));
	fetch(request)
	.then(response => {
        return response.json();
	})
	.then(data => {
		if (data.error) {
			return dispatch(errorUpdateUsername(user, data))
		} else {
			return dispatch(receiveUpdateUsername(user, data))
		}
	});
  };
}

export const REQUEST_UPDATE_EMAIL = "REQUEST_UPDATE_EMAIL";

function requestUpdateEmail(user) {
  return {
    type: REQUEST_UPDATE_EMAIL,
    user_id: user,
    isUserUpdated: false
  };
}

export const RECEIVE_UPDATE_EMAIL = "RECEIVE_UPDATE_EMAIL";

function receiveUpdateEmail(user, data) {
  return {
    type: RECEIVE_UPDATE_EMAIL,
    user_id: user,
    newEmail: data.newEmail,
    isUserUpdated: true
  };
}

export const ERROR_UPDATE_EMAIL = "ERROR_UPDATE_EMAIL";

function errorUpdateEmail(user, data) {
  return {
    type: ERROR_UPDATE_EMAIL,
    user_id: user,
    isUserUpdated: {
		error: data.error,
		error_message: data.error_message
	}
  };
}

export function changeEmail(user, newEmail) {
  const request = new Request(`http://localhost:5422/user/${user}/email`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ user, newEmail })
  });
  return dispatch => {
    dispatch(requestUpdateEmail(user));
	fetch(request)
	.then(response => {
        return response.json();
	})
	.then(data => {
		if (data.error) {
			return dispatch(errorUpdateEmail(user, data))
		} else {
			return dispatch(receiveUpdateEmail(user, data))
		}
	});
  };
}


export const REQUEST_UPDATE_PASSWORD = "REQUEST_UPDATE_PASSWORD";

function requestUpdatePassword(user) {
  return {
    type: REQUEST_UPDATE_PASSWORD,
    user_id: user,
    isUserUpdated: false
  };
}

export const RECEIVE_UPDATE_PASSWORD = "RECEIVE_UPDATE_PASSWORD";

function receiveUpdatePassword(user, data) {
  return {
    type: RECEIVE_UPDATE_PASSWORD,
    user_id: user,
    isUserUpdated: {
      success: data.success
    }
  };
}

export const ERROR_UPDATE_PASSWORD = "ERROR_UPDATE_PASSWORD";

function errorUpdatePassword(user, data) {
  return {
    type: ERROR_UPDATE_PASSWORD,
    user_id: user,
    isUserUpdated: {
      success: data.success,
      error: data.error,
      error_message: data.error_message
    }
  };
}
// password = { currentPassword, newPassword }
export function changePassword(user, password) {
  const request = new Request(`http://localhost:5422/user/${user}/password`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ password })
  });
  return dispatch => {
    dispatch(requestUpdatePassword(user));
	fetch(request)
	.then(response => {
        return response.json();
	})
	.then(data => {
		if (data.error) {
			return dispatch(errorUpdatePassword(user, data))
		} else {
			return dispatch(receiveUpdatePassword(user, data))
		}
	});
  };
}