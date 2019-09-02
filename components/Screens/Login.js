import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function LoginScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Username</Text>
			<TextInput style={styles.TextInput} />
			<Text>Password</Text>
			<TextInput style={styles.TextInput} />
			<Button title="Login" onPress={() => navigation.navigate("Dashboard")} />
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
