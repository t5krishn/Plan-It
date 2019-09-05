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

import { connect } from "react-redux";
import { selectUser, fetchUserData } from "../../store/actions/userAction";

function LoginScreen(props) {
  const [state, setState] = useState({ email: "", password: "" });

  const login = async id => {
    await AsyncStorage.setItem("isLoggedIn", JSON.stringify(id));
    props.navigation.navigate("Dashboard");
  };

  const handleSubmit = () => {
    const request = new Request(" http://localhost:5422/login", {
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
			.catch(err => console.log(err));
	};

	return (
		<View style={styles.container}>
			<Text>Email</Text>
			<TextInput
				autoCapitalize="none"
				style={styles.TextInput}
				onChangeText={text => setState({ ...state, email: text })}
			/>
			<Text>Password</Text>
			<TextInput
				autoCapitalize="none"
				style={styles.TextInput}
				onChangeText={text => setState({ ...state, password: text })}
			/>
			<Button title="Login" onPress={() => handleSubmit()} />
			<Text>Don't have an account? Sign up:</Text>
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
		justifyContent: "center",
		alignItems: "center"
	},
	TextInput: {
		borderColor: "black",
		borderWidth: 1,
		width: 100
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
