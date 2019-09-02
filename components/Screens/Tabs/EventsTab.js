import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";

export default function EventsTab({ navigation }) {
	return (
		<View style={styles.container}>
			<MenuBtn navigation={navigation} />
			<View style={styles.upper}>
				<Text>TabEventsScreen</Text>
			</View>
			<View style={styles.lower}>
				<Text>Lower</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center"
	},
	upper: {
		backgroundColor: "#FFF"
	},
	lower: {
		backgroundColor: "#000",
		color: "#FFF"
	}
});
