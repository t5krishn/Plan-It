export default function getCurrentTrip(tripsArr, currentTripId) {
	for (let trip of tripsArr) {
		if (trip.id === currentTripId) {
			return trip;
		}
	}
}
