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
import { gettingUserData } from "../../../store/reducers/userReducer";

function Dashboard(props) {

	const onPressTripHandler = trip_id => {
		props.dispatch(selectTrip(trip_id));
		props.dispatch(fetchTripData(trip_id, selectedUser));
		props.navigation.navigate("TabNavigator");
	};

	return (
		<View style={styles.mainScreenContainer}>
			<MenuBtn navigation={props.navigation} />
			<View style={styles.topContainer}>
				<Text style={styles.titleText}>DashboardScreen: </Text>
				<View style={styles.calendarContainer}>
					<CalendarMonth trips={props.user_trips} />
				</View>
			</View>

			<View style={styles.bottomContainer}>
				<ScrollView
					style={styles.tripsScrollContainer}
					contentContainerStyle={styles.tripsContent}
				>
					<TripsList onPress={onPressTripHandler} trips={props.user_trips} />
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
	tripsContsent: {
		paddingBottom: 10
		// backgroundColor: "yellow"
	}
});

function mapStateToProps(state) {
	const { /* selectedTrip, gettingTripData, */ selectedUser, gettingUserData } = state;
	// const { isFetchingTrip, events, toDos, expenses } = gettingTripData[
	// 	selectedTrip
	// ] || {
	// 	isFetchingTrip: true,
	// 	events: [],
	// 	toDos: [],
	// 	expenses: []
	// };

	const { isFetchingUser, user_trips } = gettingUserData[
		selectedUser
	] || {
		isFetchingUser: true,
		user_trips: []
	}

	return {
		// selectedTrip,
		// isFetchingTrip,
		// events,
		// toDos,
		// expenses
		selectedUser,
		isFetchingUser,
		user_trips
	};
}

export default connect(mapStateToProps)(Dashboard);
