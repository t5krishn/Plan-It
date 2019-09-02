import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";

export default function TodoTab({ navigation }) {
	return (
		<View style={styles.container}>
			<MenuBtn navigation={navigation} />
			<View style={styles.upper}>
				<Text>TodoTab</Text>
			</View>
			<View style={styles.lower}>
				<Text>load components</Text>
			</View>
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
		flex: 1,
		backgroundColor: "purple",
		justifyContent: "center",
		alignItems: "center"
	},
	lower: {
		flex: 2,
		backgroundColor: "red"
	}
});
