import React, { useState } from "react";
import {
	Text,
	Alert,
	TextInput,
	StyleSheet,
	KeyboardAvoidingView,
	Button,
	View,
	AsyncStorage
} from "react-native";

import { connect } from "react-redux";
import { selectUser, fetchUserData } from "../../store/actions/userAction";

import KeyboardShift from "../../helpers/keyboard"

function RegisterForm(props) {
	const [state, setState] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: ""
	});

	const login = async function(id) {
		await AsyncStorage.setItem("isLoggedIn", JSON.stringify(id));
		props.navigation.navigate("Dashboard");
	};

	const handleSubmit = () => {
		const request = new Request("https://plan-it-api-1.herokuapp.com/user", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ user: state })
		});

		fetch(request)
			.then(res => res.json())
			.then(data => {
				if (data.status === "error") {
					Alert.alert("There was an error with creating your account");
				} else {
					props.dispatch(selectUser(data.id));
					props.dispatch(fetchUserData(data.id));

					login(data.id);
				}
			})
			.catch(err => Alert.alert("There was an error with your signup: ", err));
	};

	return (
		<KeyboardShift>
		<View /* bahaviour="padding" */ style={styles.container}>
			<View style={styles.btnView}>
				<Button
					title="Cancel"
					onPress={() => props.navigation.navigate("Welcome")}
				/>
				<Button title="Save" onPress={() => handleSubmit()} />
			</View>
			<View>
				<Text>First Name:</Text>
				<TextInput
					style={styles.textInput}
					value={state.firstName}
					onChangeText={text => setState({ ...state, first_name: text })}
				/>
				<Text>Last Name:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setState({ ...state, last_name: text })}
				/>
				<Text>Username:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setState({ ...state, username: text })}
				/>
				<Text>Email:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setState({ ...state, email: text })}
					keyboardType= "email-address"
				/>
				<Text>Password:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setState({ ...state, password: text })}
					keyboardType= "email-address"
					
				/>
			</View>
		</View>
		</KeyboardShift>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center"
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
	btnView: {
		position: "absolute",
		top: 35,
		justifyContent: "space-between",
		flexDirection: "row",
		justifyContent: "space-between",
		width: 350
	}
});

export default connect()(RegisterForm);
