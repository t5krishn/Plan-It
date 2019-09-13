// Takes in an array of user objects and an array of userIds and returns an array of user objects whos ids match

export default function getFriends(userArray, userIds) {
	const users = [];

	for (let obj of userArray) {
		for (let id of userIds) {
			if (obj.id === id) {
				users.push(obj);
			}
		}
	}

	console.log("I FUCKING HATE MYSELF", users);
	return users;
}
