import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FriendsScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>FriendsScreen</Text>
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
