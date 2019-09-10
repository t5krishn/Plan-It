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
	const { form, setForm, handleSubmit } = props;

	return (
		<View style={styles.content}>
			<Text style={styles.title}>{props.title}</Text>
			<Text>Name:</Text>
			<TextInput
				style={styles.textInput}
				value={form.name ? form.name : ""}
				onChangeText={text => setForm({ ...form, name: text })}
			/>
			<Text>Address:</Text>
			<TextInput
				style={styles.textInput}
				value={form.address ? form.address : ""}
				onChangeText={text => setForm({ ...form, address: text })}
			/>
			<Text>Starts on:</Text>
			<TextInput
				style={styles.textInput}
				value={form.starts_on ? form.starts_on : ""}
				onChangeText={text => setForm({ ...form, starts_on: text })}
			/>
			<Text>Ends on:</Text>
			<TextInput
				style={styles.textInput}
				value={form.ends_on ? form.ends_on : ""}
				onChangeText={text => setForm({ ...form, ends_on: text })}
			/>
			<Text>Description:</Text>
			<TextInput
				style={styles.textInput}
				value={form.description ? form.description : ""}
				onChangeText={text => setForm({ ...form, description: text })}
			/>
			<TouchableHighlight style={styles.submit}>
				<Text onPress={() => handleSubmit("event")}>
					{props.onDelete ? "Update" : "Submit"}
				</Text>
			</TouchableHighlight>
			{props.onDelete && (
				<TouchableHighlight
					style={styles.button}
					onPress={() => props.onDelete(form.id)}
				>
					<Text>Delete</Text>
				</TouchableHighlight>
			)}
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
