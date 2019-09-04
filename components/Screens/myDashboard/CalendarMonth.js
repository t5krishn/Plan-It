import React from "react";
import { Calendar, CalendarList } from "react-native-calendars";

export default function CalendarMonth(props) {
	return (
		<CalendarList
			markedDates={{
				"2019-09-20": { textColor: "green" },
				"2019-09-22": { startingDay: true, color: "green" },
				"2019-09-23": {
					selected: true,
					endingDay: true,
					color: "green"
				},
				"2019-09-04": {
					disabled: true,
					startingDay: true,
					color: "green",
					endingDay: true
				}
			}}
			markingType={"period"}
			onVisibleMonthsChange={months => {
				console.log("now these months are visible", months);
			}}
			pastScrollRange={50}
			futureScrollRange={50}
			scrollEnabled={true}
			showScrollIndicator={true}
			style={{
				borderWidth: 1,
				borderColor: "gray"
			}}
		/>
	);
}
