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

export default function EventModal(props) {
	return (
		<View style={styles.content}>
			<Text style={styles.title}>{props.title}</Text>
			<View>
				<TextInput
					style={styles.textInput}
					value={props.form.content ? props.form.content : ""}
					onChangeText={text => props.setForm({ ...props.form, content: text })}
				/>
			</View>
			{props.onDelete && (
				<TouchableHighlight
					style={styles.button}
					onPress={() => props.onDelete(props.form.id)}
				>
					<Text>Delete</Text>
				</TouchableHighlight>
			)}
			<TouchableHighlight style={styles.submit}>
				<Text onPress={() => props.handleSubmit("to_do")}>Submit</Text>
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
