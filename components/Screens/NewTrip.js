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
import { connect } from "react-redux";
import { addNewUserTrip } from "../../store/actions/userAction";
import AddFriendsModal from "../Screens/Tabs/addFriendsModal";
import BackBtn from "../Buttons/Backbtn";
import getIds from "../../helpers/getIds";

function RegisterForm(props) {
	const [addFriendsVisible, setFriendVisibility] = useState(false);

	// invited is an array of userIds: {userObject}
	const [invited, setInvited] = useState([]);

	const [state, setState] = useState({
		name: "",
		location: "",
		starts_on: "",
		ends_on: "",
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
			<Text>Create a new trip</Text>
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
			<TextInput
				style={styles.textInput}
				onChangeText={text => setState({ ...state, starts_on: text })}
			/>
			<Text>Ends on:</Text>
			<TextInput
				style={styles.textInput}
				onChangeText={text => setState({ ...state, ends_on: text })}
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
		backgroundColor: "blue",
		alignItems: "center",
		paddingTop: 100
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
