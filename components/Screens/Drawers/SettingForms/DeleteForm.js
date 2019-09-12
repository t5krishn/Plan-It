import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";

export default function DeleteForm(props) {
	const handleSubmit = () => {
		Alert.alert(
			"Confirm",
			"Are you sure you want to delete your account?",
			[
				{ text: "Cancel", onPress: () => {}, style: "cancel" },
				{
					text: "OK",
					onPress: () => {
						props.onSubmit(props.user_id);
					}
				}
			],
			{ cancelable: false }
		);
	};

	return (
		<View style={styles.formContainer}>
			<Text style={styles.userNameFormTitle}> Delete account </Text>

			<Button
				title="Delete"
				// titleStyle={{
				//   color:"black",
				//   textShadowColor:"white",
				//   textShadowRadius:5
				// }}
				buttonStyle={{ backgroundColor: "red" }}
				onPress={handleSubmit}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		marginTop: 20,
		marginBottom: 100,
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
		marginBottom: 10
	},
	userNameFormTitle: {
		fontSize: 18
	}
});
