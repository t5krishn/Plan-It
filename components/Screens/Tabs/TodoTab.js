import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import TodoCards from "./TodoCards";
import AddBtn from "../../Buttons/Addbtn";

import { connect } from "react-redux";

function TodoTab(props) {
	return (
		<View style={styles.container}>
			<MenuBtn navigation={props.navigation} />
			<View style={styles.upper}>
				<Text>TodoTab: </Text>
				<Text>{props.toDos.length} To do items</Text>
				<Text>8 Completed</Text>
			</View>
			<ScrollView style={styles.lower}>
				<TodoCards items={props.toDos} />
				<View style={{ height: 100 }} />
			</ScrollView>
			<AddBtn tripId={props.selectedTrip} userId={props.selectedUser} />
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
	const { toDos, isFetchingTrip } = gettingTripData[selectedTrip] || {
		toDos: []
	};
	const { user } = gettingUserData[selectedUser] || {
		user: { first_name: "default" }
	};

	return {
		selectedUser,
		selectedTrip,
		toDos,
		isFetchingTrip,
		user
	};
}

export default connect(mapStateToProps)(TodoTab);
