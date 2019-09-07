import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

export default function UsernameForm(props) {
	const [usernameInput, onChangeUsername] = useState("Enter new username");

	return (
		<View style={styles.formContainer}>
			<Text style={styles.userNameFormTitle}> Update username </Text>
			<TextInput
				autoCapitalize="none"
				onChangeText={text => onChangeUsername(text)}
				style={styles.TextInput}
				value={usernameInput}
				clearTextOnFocus={true}
			/>
			<Button title="Update" onPress={() => props.onSubmit()} />
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		padding: 10,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	TextInput: {
		borderColor: "black",
		borderWidth: 1,
		width: "80%",
		padding: 10,
		marginBottom: 10
	},
	userNameFormTitle: {
		fontSize: 18
	}
});
