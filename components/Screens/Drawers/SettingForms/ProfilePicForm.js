import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

export default function ProfilePicForm(props) {
	const [profilePicInput, onChangeProfilePic] = useState(
		"Enter a new profile picture url"
	);

	return (
		<View style={styles.formContainer}>
			<Text style={styles.userNameFormTitle}> Update Profile Picture </Text>
			<TextInput
				autoCapitalize="none"
				onChangeText={text => onChangeProfilePic(text)}
				style={styles.TextInput}
				value={profilePicInput}
				clearTextOnFocus={true}
			/>
			<Button
				title="Update"
				onPress={() => props.onSubmit(props.user_id, profilePicInput)}
			/>
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
