import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import ExpenseCards from "./ExpenseCards";

export default function ExpensesTab({ navigation }) {
	const [expenses, setExpenses] = useState([]);

	useEffect(() => {
		const request = new Request("http://localhost:3000/user/1/trip/1/expense", {
			method: "GET",
			headers: {
				"Content-type": "application/json"
			}
		});
		fetch(request)
			.then(response => {
				return response.json();
			})
			.then(json => {
				setExpenses(json);
			});
	}, []);

	return (
		<View style={styles.container}>
			<MenuBtn navigation={navigation} />
			<View style={styles.upper}>
				<Text>San Diego Trip!</Text>
				<Text>8 Expenses</Text>
				<Text>You owe $800 total</Text>
			</View>
			<ScrollView style={styles.lower}>
				<ExpenseCards items={expenses} />
			</ScrollView>
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
