import React, { useState } from "react";
import { View, Dimensions, Modal, Button } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import AddModal from "../Screens/Tabs/addModal";
import { connect } from "react-redux";

function AddBtn(props) {
	const [isVisible, setVisibility] = useState(false);
	const [addFriendsVisible, setFriendVisibility] = useState(false);
	const [mode, setMode] = useState("");

	console.log(">>>>>>>>>>>>>", props.tripUsers);

	return (
		<View>
			{isVisible && (
				<AddModal
					setVisibility={setVisibility}
					isVisible={isVisible}
					tripId={props.tripId}
					mode={mode}
					setFriendVisibility={setFriendVisibility}
					addFriendsVisible={addFriendsVisible}
					friends={props.tripUsers}
					selectedUser={props.selectedUser}
					navigation={props.navigation}
				/>
			)}
			<FloatingAction
				distanceToEdge={{ vertical: 20, horizontal: 20 }}
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

function mapStateToProps(state) {
	const { selectedTrip, gettingTripData, selectedUser } = state;
	const { expenses, tripUsers } = gettingTripData[selectedTrip] || {
		expenses: [],
		tripUsers: []
	};

	return {
		selectedTrip,
		expenses,
		tripUsers,
		selectedUser
	};
}

export default connect(mapStateToProps)(AddBtn);
