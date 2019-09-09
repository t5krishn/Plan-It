import React, { useState } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	View,
	Button,
	Dimensions
} from "react-native";
import { connect } from "react-redux";
import { addNewUserTrip } from "../../store/actions/userAction";

function RegisterForm(props) {
	const [state, setState] = useState({
		name: "",
		location: "",
		starts_on: "",
		ends_on: "",
		description: ""
	});

	const handleSubmit = () => {
		
		props.dispatch(addNewUserTrip(props.selectedUser, state));
		props.navigation.navigate("Dashboard");

	};

	const inviteFriends = () => {};

	return (
		<KeyboardAvoidingView style={styles.container} behaviour="padding" enabled>
			<View style={styles.buttonView}>
				<Button
					title="Cancel"
					onPress={() => props.navigation.navigate("Dashboard")}
				/>
				<Button title="Save" onPress={() => handleSubmit()} />
			</View>
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
			<TouchableOpacity style={styles.button} onPress={() => inviteFriends()}>
				<Text>Invite Friends</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
				<Text>Submit</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	textInput: {
		height: 40,
		borderColor: "#000",
		borderWidth: 1,
		width: 200
	},
	button: {
		backgroundColor: "#FD6592",
		height: 40
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold"
	},
	buttonView: {
		position: "absolute",
		top: 35,
		justifyContent: "space-between",
		flexDirection: "row",
		justifyContent: "space-between",
		width: 350
	}
});

function mapStateToProps(state) {
	const { selectedUser, gettingUserData } = state;
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

	return {
		selectedUser,
		isFetchingUser,
		user,
		user_trips,
		user_expenses,
		user_friends
	};
}

export default connect(mapStateToProps)(RegisterForm);
