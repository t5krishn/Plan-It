import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Alert,
	AsyncStorage
} from "react-native";
import Backbtn from "../Buttons/Backbtn";
import { connect } from "react-redux";
import { selectUser, fetchUserData } from "../../store/actions/userAction";

function LoginScreen(props) {
	const [state, setState] = useState({ email: "", password: "" });

	const login = async id => {
		await AsyncStorage.setItem("isLoggedIn", JSON.stringify(id));
		props.navigation.navigate("Dashboard");
	};

	const handleSubmit = () => {
		const request = new Request("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(state)
		});

		fetch(request)
			.then(res => res.json())
			.then(data => {
				if (data.status === "error") {
					Alert.alert("Your password or username is incorrect");
				} else {
					props.dispatch(selectUser(data.id));
					props.dispatch(fetchUserData(data.id));

					login(data.id);
				}
			})
			.catch(err =>
				Alert.alert("There was an error in your login request: ", err)
			);
	};

	return (
		<View style={styles.container}>
			<Backbtn navigation={props.navigation} />
			<Text style={styles.title}>Sign In</Text>
			<Text style={styles.text}>Email</Text>
			<TextInput
				autoCapitalize="none"
				style={styles.TextInput}
				onChangeText={text => setState({ ...state, email: text })}
			/>
			<Text style={styles.text}>Password</Text>
			<TextInput
				autoCapitalize="none"
				style={styles.TextInput}
				onChangeText={text => setState({ ...state, password: text })}
			/>
			<Button title="Login" onPress={() => handleSubmit()} />
			<Text style={styles.text}>Don't have an account? Sign up:</Text>
			<Button
				title="Sign Up"
				onPress={() => props.navigation.navigate("Signup")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center"
	},
	title: {
		fontFamily: "Avenir",
		fontSize: 40,
		marginTop: 110,
		marginRight: 200
	},
	TextInput: {
		borderColor: "#594D4F",
		borderBottomWidth: 1,
		width: "80%"
	},
	text: {
		fontFamily: "Avenir",
		color: "#594D4F",
		fontSize: 20
	}
});

// function mapStateToProps(state) {
// 	const { selectedUser, gettingUserData } = state;
// 	const {
// 		isFetchingUser,
// 		user,
// 		user_trips,
// 		user_expenses,
// 		user_friends
// 	} = gettingUserData[selectedUser] || {
// 		isFetchingUser: true,
// 		user: {},
// 		user_trips: [],
// 		user_expenses: [],
// 		user_friends: []
// 	};

// 	return {
// 		selectedUser,
// 		isFetchingUser,
// 		user,
// 		user_trips,
// 		user_expenses,
// 		user_friends
// 	};
// }

export default connect()(LoginScreen);
