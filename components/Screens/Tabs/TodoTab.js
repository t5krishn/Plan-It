import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import TodoCards from "./TodoCards";

export default function TodoTab({ navigation }) {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const request = new Request("http://localhost:3000/user/1/trip/1/to_do", {
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
				setTodos(json);
			});
	}, []);

	return (
		<View style={styles.container}>
			<MenuBtn navigation={navigation} />
			<View style={styles.upper}>
				<Text>TodoTab</Text>
				<Text>4 To do items</Text>
				<Text>8 Completed</Text>
			</View>
			<ScrollView style={styles.lower}>
				<TodoCards items={todos} />
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
