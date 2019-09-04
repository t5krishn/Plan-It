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
import MenuBtn from "../Buttons/Menubtn";

export default function LoginScreen({ navigation }) {
	const loadData = async () => {
		const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
		console.log("isloggedin", isLoggedIn);
		navigation.navigate(isLoggedIn === "1" ? "Dashboard" : "Login");
	};

	loadData();

	const [state, setState] = useState({ email: "", password: "" });

	const login = async () => {
		await AsyncStorage.setItem("isLoggedIn", "1");
		navigation.navigate("Dashboard");
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
					login();
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
			<Button title="Sign Up" onPress={() => navigation.navigate("Signup")} />
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
