import React from "react";
// import { StyleSheet } from "react-native";
import { Calendar, CalendarList } from 'react-native-calendars';



export default function CalendarMonth(props) {
    return(
        <CalendarList
        onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
        pastScrollRange={50}
        futureScrollRange={50}
        scrollEnabled={true}
        showScrollIndicator={true}

        style={{
            borderWidth: 1,
            borderColor: 'gray',
        }}
        />
    );
}