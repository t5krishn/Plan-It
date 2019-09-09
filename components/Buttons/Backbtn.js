import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

export default function Backbtn(props) {
	return (
		<Icon
			name="angle-left"
			style={styles.menubtn}
			color="#000"
			size={45}
			onPress={() => props.onPress()}
		/>
	);
}

const styles = StyleSheet.create({
	menubtn: {
		zIndex: 9,
		padding: 4,
		position: "absolute",
		left: 2,
		top: 38
	}
});
