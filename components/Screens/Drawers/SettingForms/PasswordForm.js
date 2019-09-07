import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

export default function PasswordForm(props) {
	const [curPWInput, onCurPWChange] = useState("**************");
	const [newPWInput, onNewPWChange] = useState("**************");
	const [confirmPWInput, onConfirmPWChange] = useState("**************");

	return (
		<View style={styles.formContainer}>
			<Text style={styles.userNameFormTitle}> Update Password </Text>
			<Text style={{ alignItem: "left" }}>Current Password</Text>
			<TextInput
				secureTextEntry={true}
				autoCapitalize="none"
				onChangeText={text => onCurPWChange(text)}
				style={styles.TextInput}
				value={curPWInput}
				clearTextOnFocus={true}
			/>
			<TextInput
				secureTextEntry={true}
				autoCapitalize="none"
				onChangeText={text => onNewPWChange(text)}
				style={styles.TextInput}
				value={newPWInput}
				clearTextOnFocus={true}
			/>
			<TextInput
				secureTextEntry={true}
				autoCapitalize="none"
				onChangeText={text => onConfirmPWChange(text)}
				style={styles.TextInput}
				value={confirmPWInput}
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
