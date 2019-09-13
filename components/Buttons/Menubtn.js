import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function MenuBtn({ navigation }) {
	return (
		<Ionicons
			name="md-menu"
			style={styles.menubtn}
			color="black"
			size={32}
			onPress={() => {
				navigation.toggleDrawer();
			}}
		/>
	);
}

const styles = StyleSheet.create({
	menubtn: {
		zIndex: 9,
		padding: 2,
		position: "absolute",
		left: "5%",
		top: "5%"
	}
});
