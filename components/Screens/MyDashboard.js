import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MenuBtn from "../Buttons/Menubtn";

export default function Dashboard({ navigation }) {
	return (
		<View style={styles.container}>
			<MenuBtn navigation={navigation} />
			<Text>DashboardScreen (Trips Overview)</Text>
			<Button
				title="San Diego Trip"
				onPress={() => navigation.navigate("TabNavigator")}
			/>
			<Button title="Add Trip" onPress={() => navigation.navigate("NewTrip")} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	TextInput: {
		borderColor: "black",
		borderWidth: 1,
		width: 100
	}
});
