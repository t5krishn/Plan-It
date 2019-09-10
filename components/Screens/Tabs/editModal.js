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
import {
	updateTripItem,
	deleteTripItem
} from "../../../store/actions/tripActions";

//Import modals:
import EventModal from "./Modals/EventModal";
import TodoModal from "./Modals/TodoModal";
import ExpenseModal from "./Modals/ExpenseModal";

const editModal = function(props) {
	const [error, setError] = useState(false);

	const handleSubmit = () => {
		switch (props.mode) {
			case "events":
				props.dispatch(
					updateTripItem(props.selectedUser, props.selectedTrip, props.mode, {
						...props.form
					})
				);
				props.onClose();
				break;
			case "toDos":
				props.dispatch(
					updateTripItem(props.selectedUser, props.selectedTrip, props.mode, {
						...props.form
					})
				);
				props.onClose();
				break;
			case "expenses":
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

	const deleteItem = form => {
		switch (props.mode) {
			case "events":
				props.dispatch(
					deleteTripItem(
						props.selectedUser,
						props.selectedTrip,
						props.mode,
						props.form.id
					)
				);
				props.onClose();
				break;
			case "toDos":
				props.dispatch(
					deleteTripItem(
						props.selectedUser,
						props.selectedTrip,
						props.mode,
						props.form.id
					)
				);
				props.onClose();
				break;
			case "expenses":
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
					break;
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
							onDelete={deleteItem}
							title={"Edit Event"}
						/>
					)}
					{props.mode === "toDos" && (
						<TodoModal
							form={props.form}
							setForm={props.setForm}
							handleSubmit={handleSubmit}
							onDelete={deleteItem}
							title={"Edit To Do Item"}
						/>
					)}
					{props.mode === "expenses" && (
						<ExpenseModal
							form={props.form}
							setForm={props.setForm}
							handleSubmit={handleSubmit}
							onDelete={deleteItem}
							title={"Edit To Do Item"}
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
