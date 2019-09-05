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

export function fetchUserData(user) {
  return dispatch => {

    dispatch(requestUserData(user));
    return Promise.all([
      fetch(` http://localhost:5422/user/${user}`),
      fetch(` http://localhost:5422/user/${user}/trip`),
      fetch(` http://localhost:5422/user/${user}/transactions`),
      fetch(` http://localhost:5422/user/${user}/friend`)
    ])
      .then(response => {
        let data = response.map(res => res.json())
        return Promise.all(data)
      })
      .then(data => {
        return dispatch(receiveUserData(user, data))
      })
  }
}
