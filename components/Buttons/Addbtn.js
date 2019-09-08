import React, { useState } from "react";
import { View, Dimensions, Modal, Button } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import AddModal from "../Screens/Tabs/addModal";

export default function AddBtn(props) {
	const [isVisible, setVisibility] = useState(false);
	const [addFriendsVisible, setFriendVisibility] = useState(false);
	const [mode, setMode] = useState("");

	return (
		<View>
			{isVisible && (
				<AddModal
					setVisibility={setVisibility}
					isVisible={isVisible}
					tripId={props.tripId}
					userId={props.userId}
					mode={mode}
					setFriendVisibility={setFriendVisibility}
					addFriendsVisible={addFriendsVisible}
				/>
			)}
			<FloatingAction
				distanceToEdge={{ vertical: 100, horizontal: 20 }}
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
