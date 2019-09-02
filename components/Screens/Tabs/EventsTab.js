import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EventsTab({ navigation }) {
	return (
		<View style={styles.container}>

			<Text>TabEventsScreen: {navigation.getParam('trip_id')}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});
