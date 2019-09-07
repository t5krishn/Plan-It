import React from "react";
import { View, Dimensions } from "react-native";
import { FloatingAction } from "react-native-floating-action";

export default function AddBtn({ navigation }) {
	return (
		<View
			style={{
				position: "absolute",
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
		icon: require("../../assets/calendar.png"),
		name: "bt_event",
		position: 1,
		textBackground: "none",
		textColor: "white"
	},
	{
		text: "Add To do",
		icon: require("../../assets/check.png"),
		name: "bt_todo",
		position: 2,
		textBackground: "none",
		textColor: "white"
	},
	{
		text: "Add Expense",
		icon: require("../../assets/dollar-symbol.png"),
		name: "bt_expense",
		position: 3,
		textBackground: "none",
		textColor: "white"
	}
];
