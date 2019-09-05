import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import ExpenseCards from "./ExpenseCards";
import AddBtn from "../../Buttons/Addbtn";

import { connect } from "react-redux";

// useEffect(() => {
// 	const request = new Request(" https://plan-it-api-1.herokuapp.com/user/1/trip/1/expense", {
// 		method: "GET",
// 		headers: {
// 			"Content-type": "application/json"
// 		}
// 	});
// 	fetch(request)
// 		.then(response => {
// 			return response.json();
// 		})
// 		.then(json => {
// 			setExpenses(json);
// 		});
// }, []);

function ExpensesTab(props) {
	return (
		<View style={styles.container}>
			<MenuBtn navigation={props.navigation} />
			<View style={styles.upper}>
				<Text>San Diego Trip!</Text>
				{console.log(props.isFetchingTrip)}
				<Text>{props.expenses.length} Expenses</Text>
				<Text>You owe $800 total</Text>
			</View>
			<ScrollView style={styles.lower}>
				<ExpenseCards items={props.expenses} />
			</ScrollView>
			<AddBtn />
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
	const { expenses } = gettingTripData[selectedTrip] || {
		expenses: []
	};

	return {
		selectedTrip,
		expenses
	};
}

export default connect(mapStateToProps)(ExpensesTab);
