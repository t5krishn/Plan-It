import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TodoTab({ navigation }) {
	return (
		<View style={styles.container}>
		
			<Text>TabTodoScreen: {navigation.getParam('trip_id')}</Text>
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
