import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	TextInput,
	StyleSheet
} from "react-native";

const width = Dimensions.get("screen").width;

export default function TodoModal(props) {
	return (
		<View style={styles.mainContainer}>
			<Text style={[styles.title, styles.text]}>{props.title}</Text>
			<View style={{ marginTop: "30%" }}>
				<Text style={[styles.textTitles, styles.text]}>To do:</Text>
				<TextInput
					style={styles.textInput}
					value={props.form.content ? props.form.content : ""}
					onChangeText={text => props.setForm({ ...props.form, content: text })}
				/>
			</View>
			<TouchableOpacity
				style={styles.submit}
				onPress={() => props.handleSubmit("to_do")}
			>
				<Text style={styles.buttonText}>Submit</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: "90%",
		marginTop: "10%",
		alignContent: "center"
	},
	textTitles: {
		fontSize: 15,
		width: "100%",
		marginTop: "5%"
	},
	text: {
		fontFamily: "Avenir"
	},
	close: {
		position: "absolute",
		right: 20,
		top: 20
	},
	textInput: {
		width: "100%",
		height: 40,
		borderColor: "#000",
		borderBottomWidth: 1,
		marginBottom: "2%"
	},
	title: {
		fontSize: 24,
		paddingBottom: "10%"
	},
	submit: {
		width: "100%",
		height: width / 8,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "black"
	},
	error: {
		backgroundColor: "red",
		padding: 10
	},
	buttonText: {
		fontSize: 15,
		fontFamily: "Avenir",
		color: "white"
	}
});
