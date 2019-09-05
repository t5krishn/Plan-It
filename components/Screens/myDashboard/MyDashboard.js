import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
	TouchableOpacity
} from "react-native";
import CalendarMonth from "./CalendarMonth";
import TripsList from "./TripsList";
import MenuBtn from "../../Buttons/Menubtn";
import { connect } from "react-redux";
import { selectTrip, fetchTripData } from "../../../store/actions/tripActions";

function Dashboard(props) {
	let [trips, setTrips] = useState([]);

	const getAllTrips = () => {
		fetch("http://localhost:3000/user/1/trip")
			.then(res => res.json())
			.then(data => {
				setTrips(data);
			});
	};

	const onPressTripHandler = trip_id => {
		props.dispatch(selectTrip(trip_id));
		props.dispatch(fetchTripData(trip_id));
		props.navigation.navigate("TabNavigator");
	};

	useEffect(() => {
		getAllTrips();
	}, []);

	return (
		<View style={styles.mainScreenContainer}>
			<MenuBtn navigation={props.navigation} />
			<View style={styles.topContainer}>
				<Text style={styles.titleText}>DashboardScreen</Text>

				<View style={styles.calendarContainer}>
					<CalendarMonth trips={trips} />
				</View>
			</View>

			<View style={styles.bottomContainer}>
				<ScrollView
					style={styles.tripsScrollContainer}
					contentContainerStyle={styles.tripsContent}
				>
					<TripsList onPress={onPressTripHandler} trips={trips} />
					<TouchableOpacity
						style={{
							height: 50,
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "blue"
						}}
						onPress={() => props.navigation.navigate("NewTrip")}
					>
						<Text style={{ color: "lightgreen" }}>+ Add new trip</Text>
					</TouchableOpacity>
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

function mapStateToProps(state) {
	const { selectedTrip, gettingTripData } = state;
	const { isFetching, events, toDos, expenses } = gettingTripData[
		selectedTrip
	] || {
		isFetching: true,
		events: [],
		toDos: [],
		expenses: []
	};

	return {
		selectedTrip,
		isFetching,
		events,
		toDos,
		expenses
	};
}

export default connect(mapStateToProps)(Dashboard);
