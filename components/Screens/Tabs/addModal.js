import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TouchableHighlight,
	Dimensions,
	TextInput,
	StyleSheet,
	ScrollView,
	AlertIOS
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
	postNewEvent,
	postNewTodo,
	postNewExpense
} from "../../../store/actions/tripActions";
import { connect } from "react-redux";
import getIds from "../../../helpers/getIds";
import EventModal from "./Modals/EventModal";
import TodoModal from "./Modals/TodoModal";
import ExpenseModal from "./Modals/ExpenseModal";
import AddFriendsModal from "./addFriendsModal";

/*
  Depending on the mode (event/ to_do/ expense) the form is different:
    - Event form : 
    { 
      name, 
      address, 
      starts_on, 
      ends_on, 
      description, 
      trip_id  
          }
    - Todo form : 
    { 
      content,
      boolean,
      trip_id  
          }
    - Expense form : 
    { 
      name, 
      amount_in_cents,
      expense_date, 
      trip_id 
          }
*/

function AddModal(props) {
	const [form, setForm] = useState({
		trip_id: props.tripId
	});
	const [invited, setInvited] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (invited.length) {
			setError(false);
		}
	}, [invited]);

	const handleSubmit = mode => {
		switch (mode) {
			case "event":
				props.navigation.navigate("TripEvents");
				props.dispatch(postNewEvent(form, props.selectedUser, props.tripId));
				props.setVisibility(false);
				break;
			case "to_do":
				props.navigation.navigate("TripTodo");
				props.dispatch(
					postNewTodo(
						{ ...form, completed: false },
						props.selectedUser,
						props.tripId
					)
				);
				props.setVisibility(false);
				break;
			case "expense":
				if (invited.length > 0) {
					props.navigation.navigate("TripExpenses");
					props.dispatch(
						postNewExpense(
							{ ...form, users: getIds(invited) },
							props.selectedUser,
							props.tripId
						)
					);
					props.setVisibility(false);
					break;
				} else {
					setError(true);
				}
		}
	};

	const friends = props.friends.filter(user => {
		return user.id !== parseInt(props.selectedUser);
	});

	return (
		<View style={styles.mainContainer}>
			<Modal animationType="slide" transparent={true} visible={props.isVisible}>
				<View
					style={{
						borderRadius: 20,
						marginTop: 80,
						paddingTop: 50,
						zIndex: 9,
						backgroundColor: "green",
						width: Dimensions.get("screen").width,
						height: Dimensions.get("screen").height,
						alignItems: "center"
					}}
				>
					<TouchableHighlight
						style={styles.close}
						onPress={() => {
							props.setVisibility(false);
						}}
					>
						<Icon name="close" size={30} />
					</TouchableHighlight>
					{error && (
						<View style={styles.error}>
							<Text>You must add friends to split the expense with!</Text>
						</View>
					)}
					{props.mode === "event" && (
						<EventModal
							form={form}
							setForm={setForm}
							handleSubmit={handleSubmit}
							title={"Create A New Event"}
						/>
					)}
					{props.mode === "to_do" && (
						<TodoModal
							form={form}
							setForm={setForm}
							handleSubmit={handleSubmit}
							title={"Create A New To do Item"}
						/>
					)}
					{props.mode === "expense" && (
						<ExpenseModal
							form={form}
							setForm={setForm}
							handleSubmit={handleSubmit}
							setInvited={setInvited}
							invited={invited}
							setFriendVisibility={props.setFriendVisibility}
							addFriendsVisible={props.addFriendsVisible}
						/>
					)}
					{props.addFriendsVisible && (
						<AddFriendsModal
							setInvited={setInvited}
							friends={friends}
							setFriendVisibility={props.setFriendVisibility}
							addFriendsVisible={props.addFriendsVisible}
						/>
					)}
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		marginTop: 22,
		alignItems: "center",
		width: "100%"
	},
	close: {
		position: "absolute",
		right: 20,
		top: 20
	},
	content: {
		width: "85%"
	},
	textInput: {
		width: 200,
		height: 40,
		borderColor: "#000",
		borderWidth: 1
	},
	title: {
		fontSize: 20
	},
	submit: {
		marginTop: 10,
		borderWidth: 2,
		borderColor: "black"
	},
	error: {
		backgroundColor: "red",
		padding: 10
	},
	friendsList: {
		backgroundColor: "yellow",
		height: "30%"
	}
});

export default connect()(AddModal);
