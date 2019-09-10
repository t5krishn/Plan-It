import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import EventCards from "./EventCards";
import AddBtn from "../../Buttons/Addbtn";
import TripSettingsBtn from "../../Buttons/TripSettingsbtn";
import CalendarMonth from "../myDashboard/CalendarMonth";
import { connect } from "react-redux";

function EventsTab(props) {
	return (
		<View style={styles.container}>
			<MenuBtn navigation={props.navigation} />

			{!props.isFetchingTrip && (
				<TripSettingsBtn
					tripUsers={props.tripUsers.filter(user => {
						return user.id !== parseInt(props.selectedUser);
					})}
					user={props.selectedUser}
					trip={props.trip}
					dispatch={props.dispatch}
					navigation={props.navigation}
					friends={props.user_friends}					
				/>
			)}
			
			<View style={styles.upper}>
				<Text style={styles.upperText}>San Diego Trip! </Text>
				<Text style={styles.upperText}>{props.events.length} Events Total</Text>
			</View>
			<ScrollView contentContainerStyle={styles.lower}>
				{props.isFetchingTrip ? (
					<Text>Loading!</Text>
				) : (
					<EventCards items={props.events} />
				)}
				<View style={{ height: 100 }} />
			</ScrollView>
			<AddBtn
				tripId={props.selectedTrip}
				userId={props.selectedUser}
				navigation={props.navigation}
			/>
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
		backgroundColor: "#FFFFFF",
		alignItems: "center",
		justifyContent: "center"
	},
	upperText: {
		fontFamily: "Avenir"
	},
	lower: {
		flex: 2,
		width: "100%",
		backgroundColor: "#FFF",
		alignItems: "center"
	}
});

function mapStateToProps(state) {
	const { selectedTrip, gettingTripData, selectedUser, gettingUserData } = state;
	const { events, tripUsers, isFetchingTrip } = gettingTripData[selectedTrip] || {
		events: [],
		tripUsers: []
	};

	const  { user_friends } = gettingUserData[selectedUser] || {
		user_friends: []
	};
	const trip = gettingUserData[selectedUser].user_trips.find(e=> e.id===selectedTrip)

	return {
		selectedTrip,
		events,
		trip,
		tripUsers,
		selectedUser,
		isFetchingTrip,
		user_friends
	};
}

export default connect(mapStateToProps)(EventsTab);
