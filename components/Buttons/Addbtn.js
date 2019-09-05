import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { FloatingAction } from "react-native-floating-action";

export default function AddBtn({ navigation }) {
	return (
		<View
			style={{
				width: Dimensions.get("screen").width,
				height: Dimensions.get("screen").height + 20
			}}
		>
			<FloatingAction
				distanceToEdge={{ vertical: 120, horizontal: 20 }}
				actions={actions}
				showBackground={true}
				onPressItem={name => {
					console.log(`selected button: ${name}`);
				}}
			/>
		</View>
	);
}

const actions = [
	{
		text: "Add Event",
		name: "bt_event",
		position: 1,
		textBackground: "none",
		textColor: "white"
	},
	{
		text: "Add To do",
		name: "bt_todo",
		position: 2,
		textBackground: "none",
		textColor: "white"
	},
	{
		text: "Add Expense",
		name: "bt_expense",
		position: 3,
		textBackground: "none",
		textColor: "white"
	}
];

const styles = StyleSheet.create({
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: "white",
		zIndex: 9
	}
});
