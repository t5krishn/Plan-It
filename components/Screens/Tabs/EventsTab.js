import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import EventCards from "./EventCards";
import AddBtn from "../../Buttons/Addbtn";
import CalendarMonth from "../myDashboard/CalendarMonth";
import { connect } from "react-redux";

function EventsTab(props) {
	return (
		<View style={styles.container}>
			<MenuBtn navigation={props.navigation} />
			<View style={styles.upper}>
				<Text>San Diego Trip! </Text>
				<Text>{props.events.length} Events Total</Text>

				<Text>Calendar View</Text>
			</View>
			<ScrollView style={styles.lower}>
				{props.isFetchingTrip ? (
					<Text>Loading!</Text>
				) : (
					<EventCards items={props.events} />
				)}
				<View style={{ height: 100 }} />
			</ScrollView>
			<AddBtn tripId={props.selectedTrip} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		width: Dimensions.get("screen").width,
		height: Dimensions.get("screen").height
	},
	upper: {
		flex: 0.5,
		backgroundColor: "purple",
		justifyContent: "center",
		alignItems: "center"
	},
	lower: {
		flex: 2,
		backgroundColor: "red"
	}
});

function mapStateToProps(state) {
	const { selectedTrip, gettingTripData } = state;
	const { events, isFetchingTrip } = gettingTripData[selectedTrip] || {
		isFetchingTrip: true,
		events: []
	};

	return {
		selectedTrip,
		isFetchingTrip,
		events
	};
}

export default connect(mapStateToProps)(EventsTab);
