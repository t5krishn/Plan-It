import React, { useState } from "react";
import { View, Dimensions, Modal, Button } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import AddModal from "../Screens/Tabs/addModal";

export default function AddBtn(props) {
	const [isVisible, setVisibility] = useState(false);

	const handleForm = name => {
		switch (name) {
			case "event":
				setVisibility(true);
				break;
			case "todo":
				setVisibility(true);
				break;
			case "expense":
				setVisibility(true);
				break;
		}
	};

	return (
		<View
			style={{
				position: "absolute",
				width: Dimensions.get("screen").width,
				height: Dimensions.get("screen").height + 20
			}}
		>
			{isVisible && (
				<AddModal setVisibility={setVisibility} isVisible={isVisible} />
			)}
			<FloatingAction
				distanceToEdge={{ vertical: 120, horizontal: 20 }}
				actions={actions}
				showBackground={true}
				onPressItem={name => {
					handleForm(name);
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
		name: "todo",
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
