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

export default function RegisterForm({ navigation }) {
	const [state, setState] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: ""
	});

	// let id;

	const login = async id => {
		await AsyncStorage.setItem("isLoggedIn", JSON.stringify(id));
		navigation.navigate("Dashboard");
	};

	const handleSubmit = () => {
		const request = new Request("http://localhost:3000/user", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ user: state })
		});

		fetch(request)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.status === "error") {
					Alert.alert("There was an error with creating your account");
				} else {
					login(data.id);
				}
			})
			.catch(err => console.log(err));
	};

	return (
		<KeyboardAvoidingView bahaviour="padding" style={styles.container}>
			<View style={styles.btnView}>
				<Button title="Cancel" onPress={() => navigation.navigate("Login")} />
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
				/>
				<Text>Password:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setState({ ...state, password: text })}
				/>
			</View>
		</KeyboardAvoidingView>
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
