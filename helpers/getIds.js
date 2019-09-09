export default function getIds(users) {
	const userIds = [];
	for (let user of users) {
		userIds.push(user.id);
	}
	return userIds;
}
