import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import CalendarMonth from "../CalendarMonth";
import TripsList from  "../TripsList";

export default function Dashboard({ navigation }) {
	return (
		<View style={styles.mainScreenContainer}>
			<View style={styles.topContainer}>
				<Text style={styles.titleText}>
					DashboardScreen (Trips Overview)
				</Text>
				
				<View style={styles.calendarContainer}>
					<CalendarMonth />
				</View>
			</View>

			<View style={styles.bottomContainer}>

				<ScrollView
				style = {styles.tripsScrollContainer}
				contentContainerStyle={styles.tripsContent}>

					<TripsList navigation={navigation}/>

				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainScreenContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "skyblue"
	},
	topContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "lightgreen",
		width: "100%"
	},
	bottomContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "lightblue",
		width: "100%"
	},
	titleText: {
		fontSize: 20,
		marginTop: "12%"
	},
	calendarContainer: {
		flex: 1,
		backgroundColor: "lightgrey",
		marginTop: "2%",
	},
	tripsScrollContainer : {
		width : "100%"
	},
	tripsContent: {
		paddingBottom: 10,
		// backgroundColor: "yellow"
	}
});
