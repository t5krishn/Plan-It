import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

export default function EmailForm(props) {
	const [emailInput, onChangeEmail] = useState(props.currentEmail);

	return (
		<View style={styles.formContainer}>
			<Text style={styles.userNameFormTitle}> Update email </Text>
			<TextInput
				autoCapitalize="none"
				onChangeText={text => onChangeEmail(text)}
				style={styles.TextInput}
				value={emailInput}
				clearTextOnFocus={true}
			/>
			<Button
				title="Update"
				onPress={() => props.onSubmit(props.user_id, emailInput)}
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
