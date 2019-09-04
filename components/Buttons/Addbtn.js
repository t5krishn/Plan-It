import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function MenuBtn({ navigation }) {
	const handleSubmit = () => {};

	return (
		<Ionicons
			name="ios-add-circle"
			style={styles.btn}
			size={70}
			color="#000000"
			onPress={() => handleSubmit()}
		/>
	);
}

const styles = StyleSheet.create({
	btn: {
		zIndex: 9,
		padding: 2,
		position: "absolute",
		right: 15,
		bottom: 80
	}
});
