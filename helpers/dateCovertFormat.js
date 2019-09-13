// Formats date in "YYYY-MM-DD" to "4 Sept"

export default function dateConvertFormat(dateString) {
	const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
	const b = dateString.split(/\D/);
	return b[2] + " " + months[b[1] - 1];
}
