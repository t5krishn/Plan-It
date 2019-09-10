import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TouchableHighlight,
	Dimensions,
	TextInput,
	StyleSheet,
	ScrollView,
	AlertIOS
} from "react-native";

export default function EventModal({ form, setForm, handleSubmit }) {
	return (
		<View style={styles.content}>
			<Text style={styles.title}>Create a new to do item</Text>
			<TextInput
				style={styles.textInput}
				value={form.content ? form.content : ""}
				onChangeText={text => setForm({ ...form, content: text })}
			/>
			<TouchableHighlight style={styles.submit}>
				<Text onPress={() => handleSubmit("to_do")}>Submit</Text>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		marginTop: 22,
		alignItems: "center",
		width: "100%"
	},
	close: {
		position: "absolute",
		right: 20,
		top: 20
	},
	content: {
		width: "85%"
	},
	textInput: {
		width: 200,
		height: 40,
		borderColor: "#000",
		borderWidth: 1
	},
	title: {
		fontSize: 20
	},
	submit: {
		marginTop: 10,
		borderWidth: 2,
		borderColor: "black"
	},
	error: {
		backgroundColor: "red",
		padding: 10
	},
	friendsList: {
		backgroundColor: "yellow",
		height: "30%"
	}
});
