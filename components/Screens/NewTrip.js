import React, { useState, useEffect } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	View,
	Button,
	Dimensions,
	ScrollView
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { addNewUserTrip } from "../../store/actions/userAction";
import AddFriendsModal from "../Screens/Tabs/addFriendsModal";
import BackBtn from "../Buttons/Backbtn";
import getIds from "../../helpers/getIds";

function RegisterForm(props) {
	const [addFriendsVisible, setFriendVisibility] = useState(false);
	const [isDateTimePickerVisible, setDateTimeVisibility] = useState({
		start: false,
		end: false
	});
	// invited is an array of userIds: {userObject}
	const [invited, setInvited] = useState([]);

	const [state, setState] = useState({
		name: "",
		location: "",
		starts_on: new Date(),
		ends_on: new Date(),
		description: ""
	});

	const handleSubmit = () => {
		props.dispatch(
			addNewUserTrip(props.selectedUser, {
				...state,
				trip_users: [...getIds(invited), props.selectedUser]
			})
		);
		props.navigation.navigate("Dashboard");
	};

	const handleDatePicked = (date, mode) => {
		if (mode === "startDate") {
			setState({ ...state, starts_on: date });
			setDateTimeVisibility({ ...isDateTimePickerVisible, start: false });
		} else {
			setState({ ...state, ends_on: date });
			setDateTimeVisibility({ ...isDateTimePickerVisible, end: false });
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container} behaviour="padding" enabled>
			{/* <View style={styles.buttonView}>
				<Button
					title="Cancel"
					onPress={() => props.navigation.navigate("Dashboard")}
				/>
				<Button title="Save" onPress={() => handleSubmit()} />
			</View> */}
			<BackBtn onPress={() => props.navigation.navigate("Dashboard")} />
			<View style={styles.title}>
				<Text style={styles.titleText}>Create a new trip</Text>
			</View>
			<View style={styles.inputContainer}>
				<Text>Name:</Text>
				<TextInput
					style={styles.textInput}
					value={state.firstName}
					onChangeText={text => setState({ ...state, name: text })}
				/>
				<Text>Location:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setState({ ...state, location: text })}
				/>
				<Text>Starts on:</Text>
				<Button
					title="Show DatePicker"
					onPress={() =>
						setDateTimeVisibility({ ...isDateTimePickerVisible, start: true })
					}
				/>
				<DateTimePicker
					customCancelButtonIOS={
						<View style={styles.dateButton}>
							<Text style={styles.dateText}>Cancel</Text>
						</View>
					}
					customConfirmButtonIOS={
						<View style={styles.dateButton}>
							<Text style={styles.dateText}>Confirm</Text>
						</View>
					}
					datePickerContainerStyleIOS={{ borderRadius: 0 }}
					titleIOS={"Pick a start date"}
					isVisible={isDateTimePickerVisible.start}
					onConfirm={date => handleDatePicked(date, "startDate")}
					onCancel={() =>
						setDateTimeVisibility({ ...isDateTimePickerVisible, start: false })
					}
				/>

				<Text>Ends on:</Text>
				<Button
					title="Show DatePicker"
					onPress={() =>
						setDateTimeVisibility({ ...isDateTimePickerVisible, end: true })
					}
				/>
				<DateTimePicker
					customCancelButtonIOS={
						<View style={styles.dateButton}>
							<Text style={styles.dateText}>Cancel</Text>
						</View>
					}
					customConfirmButtonIOS={
						<View style={styles.dateButton}>
							<Text style={styles.dateText}>Confirm</Text>
						</View>
					}
					datePickerContainerStyleIOS={{ borderRadius: 0 }}
					titleIOS={"Pick an end date"}
					isVisible={isDateTimePickerVisible.end}
					onConfirm={date => handleDatePicked(date, "endDate")}
					onCancel={() =>
						setDateTimeVisibility({ ...isDateTimePickerVisible, end: false })
					}
				/>
				<Text>Description:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setState({ ...state, description: text })}
				/>
				{invited.length ? (
					<View style={styles.friendsList}>
						<Text>Friends invited:</Text>
						<ScrollView>
							{invited.map(friend => {
								return (
									<Text>
										{friend.first_name} {friend.last_name} (@{friend.username})
									</Text>
								);
							})}
						</ScrollView>
					</View>
				) : (
					<View />
				)}

				<TouchableOpacity
					style={styles.button}
					onPress={() => setFriendVisibility(true)}
				>
					{invited.length ? (
						<Text>Edit Friends</Text>
					) : (
						<Text>Invite Friends</Text>
					)}
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
					<Text>Submit</Text>
				</TouchableOpacity>
			</View>

			<AddFriendsModal
				setInvited={setInvited}
				setFriendVisibility={setFriendVisibility}
				addFriendsVisible={addFriendsVisible}
				friends={props.user_friends}
			/>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		paddingTop: 80
	},
	title: {
		backgroundColor: "yellow",
		paddingLeft: 20
	},
	titleText: {
		fontFamily: "Avenir",
		fontSize: 22
	},
	inputContainer: {
		padding: 20,
		alignItems: "center"
	},
	textInput: {
		height: 40,
		borderColor: "#000",
		borderWidth: 1,
		width: 200
	},
	button: {
		padding: 2,
		backgroundColor: "#FD6592",
		height: 40
	},
	buttonText: {
		fontSize: 16
	},
	friendsList: {
		backgroundColor: "yellow",
		width: "80%",
		height: "30%"
	},
	dateButton: {
		backgroundColor: "black",
		alignItems: "center",
		paddingTop: 15
	},
	dateText: {
		color: "white",
		fontFamily: "Avenir",
		height: "100%",
		fontSize: 16
	}
});

function mapStateToProps(state) {
	const {
		selectedUser,
		gettingUserData,
		selectedTrip,
		gettingTripData
	} = state;

	const {
		isFetchingUser,
		user,
		user_trips,
		user_expenses,
		user_friends
	} = gettingUserData[selectedUser] || {
		isFetchingUser: true,
		user: {},
		user_trips: [],
		user_expenses: [],
		user_friends: []
	};

	const { tripUsers } = gettingTripData[selectedTrip] || {
		isFetchingTrip: true,
		tripUsers: []
	};

	return {
		selectedUser,
		isFetchingUser,
		user,
		user_trips,
		user_expenses,
		user_friends,
		selectedTrip,
		tripUsers
	};
}

export default connect(mapStateToProps)(RegisterForm);
