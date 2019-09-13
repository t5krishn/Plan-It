// Takes in an array of users and returns the id

export default function getIds(users) {
	const userIds = [];
	for (let user of users) {
		userIds.push(user.id);
	}
	return userIds;
}
