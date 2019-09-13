import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Button } from "react-native-elements";

export default function PasswordForm(props) {
	const [curPWInput, onCurPWChange] = useState("");
	const [newPWInput, onNewPWChange] = useState("");
	const [confirmPWInput, onConfirmPWChange] = useState("");

	const handleSubmit = () => {
		if (newPWInput === confirmPWInput) {
			props.onSubmit(props.user_id, {
				currentPassword: curPWInput,
				newPassword: newPWInput
			});
		} else {
			Alert.alert("New passwords don't match!");
		}
	};

	return (
		<View style={styles.formContainer}>
			<Text style={styles.userNameFormTitle}> Update Password </Text>
			<Text style={styles.formTitles}>Current Password</Text>
			<TextInput
				secureTextEntry={true}
				autoCapitalize="none"
				onChangeText={text => onCurPWChange(text)}
				style={styles.TextInput}
				value={curPWInput}
				clearTextOnFocus={true}
			/>
			<Text style={styles.formTitles}>New Password</Text>
			<TextInput
				secureTextEntry={true}
				autoCapitalize="none"
				onChangeText={text => onNewPWChange(text)}
				style={styles.TextInput}
				value={newPWInput}
				clearTextOnFocus={true}
			/>
			<Text style={styles.formTitles}>Confirm New Password</Text>
			<TextInput
				secureTextEntry={true}
				autoCapitalize="none"
				onChangeText={text => onConfirmPWChange(text)}
				style={styles.TextInput}
				value={confirmPWInput}
				clearTextOnFocus={true}
			/>
			<Button
				title="Update"
				onPress={handleSubmit}
				buttonStyle={{ backgroundColor: "black" }}
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
		borderBottomWidth: 1,
		width: "80%",
		padding: 10,
		marginBottom: 10,
		backgroundColor: "#FFFFFFBF"
	},
	userNameFormTitle: {
		fontSize: 18
	},
	formTitles: {
		fontFamily: "Avenir-Medium",
		fontSize: 15,
		fontWeight: "bold"
	}
});
