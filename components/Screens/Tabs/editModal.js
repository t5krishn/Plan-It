import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions,
	TextInput,
	StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { updateTripItem } from "../../../store/actions/tripActions";

//Import modals:
import EventModal from "./Modals/EventModal";

const editModal = function(props) {
	const [error, setError] = useState(false);

	const handleSubmit = () => {
		console.log(
			"HEY LOOK HERE",
			props.selectedUser,
			props.selectedTrip,
			props.mode,
			{
				...props.form
			}
		);
		switch (props.mode) {
			case "events":
				props.dispatch(
					updateTripItem(props.selectedUser, props.selectedTrip, props.mode, {
						...props.form
					})
				);
				props.onClose();
				break;
			case "to_do":
				props.dispatch(
					updateTripItem(
						{ ...props.form, completed: false },
						props.selectedUser,
						props.tripId
					)
				);
				props.onClose();
				break;
			case "expense":
				if (invited.length > 0) {
					props.dispatch(
						updateTripItem(
							{ ...props.form, users: getIds(invited) },
							props.selectedUser,
							props.tripId
						)
					);
					props.onClose();
					break;
				} else {
					setError(true);
				}
		}
	};

	return (
		<View
			style={{
				marginTop: 22,
				alignItems: "center"
			}}
		>
			<Modal animationType="slide" transparent={true} visible={props.isVisible}>
				<View
					style={{
						borderRadius: 20,
						marginTop: 100,
						paddingTop: 50,
						zIndex: 9,
						backgroundColor: "gray",
						width: Dimensions.get("screen").width,
						height: Dimensions.get("screen").height,
						alignItems: "center"
					}}
				>
					<TouchableHighlight
						style={styles.close}
						onPress={() => {
							props.onClose();
						}}
					>
						<Icon name="close" size={30} />
					</TouchableHighlight>
					{error && (
						<View style={styles.error}>
							<Text>You must add friends to split the expense with!</Text>
						</View>
					)}
					{props.mode === "events" && (
						<EventModal
							form={props.form}
							setForm={props.setForm}
							handleSubmit={handleSubmit}
						/>
					)}
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	close: {
		position: "absolute",
		right: 20,
		top: 20
	},
	checkBox: {
		width: "100%"
	},
	friendsContainer: {
		flex: 1,
		backgroundColor: "yellow",
		width: "90%%",
		alignItems: "center"
	},
	button: {
		borderColor: "black",
		borderWidth: 2,
		width: 50,
		height: 20
	}
});

function mapStateToProps(state) {
	const { selectedTrip, gettingTripData, selectedUser } = state;
	const { events, tripUsers, expenses, toDos } = gettingTripData[
		selectedTrip
	] || {
		events: [],
		toDos: [],
		tripUsers: [],
		expenses: []
	};

	return {
		selectedTrip,
		selectedUser,
		expenses,
		events,
		tripUsers,
		toDos
	};
}

export default connect(mapStateToProps)(editModal);
