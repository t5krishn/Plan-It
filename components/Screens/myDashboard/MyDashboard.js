import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import CalendarMonth from "./CalendarMonth";
import TripsList from "./TripsList";
import MenuBtn from "../../Buttons/Menubtn";

export default function Dashboard({ navigation }) {
	let [trips, setTrips] = useState([]);

	const getAllTrips = () => {
		fetch("http://localhost:3000/trip")
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setTrips(data);
			});
	};

	useEffect(() => {
		getAllTrips();
	}, []);

	return (
		<View style={styles.mainScreenContainer}>
			<MenuBtn navigation={navigation} />
			<View style={styles.topContainer}>
				<Text style={styles.titleText}>DashboardScreen</Text>

				<View style={styles.calendarContainer}>
					<CalendarMonth />
				</View>
			</View>

			<View style={styles.bottomContainer}>
				<ScrollView
					style={styles.tripsScrollContainer}
					contentContainerStyle={styles.tripsContent}
				>
					<TripsList navigation={navigation} trips={trips} />
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
		marginTop: "2%"
	},
	tripsScrollContainer: {
		width: "100%"
	},
	tripsContent: {
		paddingBottom: 10
		// backgroundColor: "yellow"
	}
});
