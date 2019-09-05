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

export default function RegisterForm({ navigation }) {
	const [state, setState] = useState({
		name: "",
		location: "",
		starts_on: "",
		ends_on: "",
		description: ""
	});

	handleSubmit = () => {
		const request = new Request(" https://plan-it-api-1.herokuapp.com/user/1/trip", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ trip: state })
		});

		fetch(request)
			.then(response => response.json())
			.then(data => {
				if (data.status === "ok") {
					navigation.navigate("Dashboard");
				} else {
					Alert.alert("There was an issue with saving your trip");
				}
			});
	};

	inviteFriends = () => {};

	return (
		<KeyboardAvoidingView style={styles.container} behaviour="padding" enabled>
			<View style={styles.buttonView}>
				<Button
					title="Cancel"
					onPress={() => navigation.navigate("Dashboard")}
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
