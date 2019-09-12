import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-elements";

export default function UsernameForm(props) {
	const [usernameInput, onChangeUsername] = useState(
		props.currentUsername || "Enter a username"
	);

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
			<Button
				title="Update"
				buttonStyle={{backgroundColor: "black"}}
				onPress={() => {
					props.onSubmit(props.user_id, usernameInput);
				}}
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
		marginBottom: 10,
		backgroundColor: "#FFFFFFBF"
	},
	userNameFormTitle: {
		fontSize: 18
	}
});
