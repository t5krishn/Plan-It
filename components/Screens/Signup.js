import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native";

export default function RegisterForm() {
	const [state, setState] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: ""
	});

	handleSubmit = () => {
		const request = new Request("http://localhost:3000/users", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(state)
		});

		fetch(request).then(response => {
			// response.ok is true if User has successfully been INSERTED
			if (response.ok) {
			}
		});
	};

	return (
		<KeyboardAvoidingView style={styles.container} behaviour="padding" enabled>
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
	}
});
