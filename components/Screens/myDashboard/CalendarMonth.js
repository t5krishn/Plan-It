import React from "react";
import { CalendarList } from "react-native-calendars";
import markedDates from "../../../helpers/markedDate";

export default function CalendarMonth(props) {
	const dates = function(tripsArr) {
		let datesObj = {};
		for (let trip of tripsArr) {
			datesObj = { ...datesObj, ...trip.markedDates };
		}
		return datesObj;
	};

	return (
		<CalendarList
			markedDates={dates(markedDates(props.trips))}
			markingType={"period"}
			onVisibleMonthsChange={months => {}}
			pastScrollRange={50}
			futureScrollRange={50}
			scrollEnabled={true}
			showScrollIndicator={true}
		/>
	);
}
