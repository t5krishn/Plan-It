import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import TodoCards from "./TodoCards";
import AddBtn from "../../Buttons/Addbtn";
import TripSettingsBtn from "../../Buttons/TripSettingsbtn";

import { connect } from "react-redux";

function TodoTab(props) {
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
				<Text>TodoTab: </Text>
				<Text>{props.toDos.length} To do items</Text>
				<Text>8 Completed</Text>
			</View>
			<ScrollView style={styles.lower}>
				<TodoCards items={props.toDos} />
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
		backgroundColor: "purple",
		justifyContent: "center",
		alignItems: "center"
	},
	lower: {
		flex: 2,
		backgroundColor: "blue"
	}
});

function mapStateToProps(state) {
	const {
		selectedTrip,
		gettingTripData,
		selectedUser,
		gettingUserData
	} = state;
	const { toDos, isFetchingTrip, tripUsers } = gettingTripData[selectedTrip] || {
		toDos: [],
		tripUsers: []
	};
	const  { user_friends } = gettingUserData[selectedUser] || {
		user_friends: []
	};
	const trip = gettingUserData[selectedUser].user_trips.find(e=> e.id===selectedTrip)
	return {
		selectedUser,
		selectedTrip,
		toDos,
		isFetchingTrip,
		trip,
		tripUsers,
		user_friends
	};
}

export default connect(mapStateToProps)(TodoTab);
