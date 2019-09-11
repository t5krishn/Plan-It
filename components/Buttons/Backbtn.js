import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("screen").width;

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
		padding: "3%",
		position: "absolute",
		left: "2%",
		top: width / 25
	}
});
