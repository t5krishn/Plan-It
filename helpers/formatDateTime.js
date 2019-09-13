export const formatDate = date => {
	return new Date(date)
		.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric"
		})
		.replace(/ /g, ", ");
};

export const formatTime = date => {
	const hours = new Date(date).getHours();
	const min = new Date(date).getMinutes();
	const minutes = min.toString().length > 1 ? min : "0" + min;
	return hours + ":" + minutes;
};
