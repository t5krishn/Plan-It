import React, { useState } from "react";
import { View, Dimensions, Modal, Button } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import AddModal from "../Screens/Tabs/addModal";

export default function AddBtn(props) {
	const [isVisible, setVisibility] = useState(false);
	const [mode, setMode] = useState("");

	return (
		<View
			style={{
				position: "absolute",
				width: Dimensions.get("screen").width,
				height: Dimensions.get("screen").height + 20
			}}
		>
			{isVisible && (
				<AddModal
					setVisibility={setVisibility}
					isVisible={isVisible}
					tripId={props.tripId}
					mode={mode}
				/>
			)}
			<FloatingAction
				distanceToEdge={{ vertical: 120, horizontal: 20 }}
				actions={actions}
				showBackground={true}
				onPressItem={name => {
					setMode(name);
					setVisibility(true);
				}}
			/>
		</View>
	);
}

const actions = [
	{
		text: "Add Event",
		icon: require("../../assets/calendar.png"),
		name: "event",
		position: 1,
		textBackground: "none",
		textColor: "white"
	},
	{
		text: "Add To do",
		icon: require("../../assets/check.png"),
		name: "to_do",
		position: 2,
		textBackground: "none",
		textColor: "white"
	},
	{
		text: "Add Expense",
		icon: require("../../assets/dollar-symbol.png"),
		name: "expense",
		position: 3,
		textBackground: "none",
		textColor: "white"
	}
];
