import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableHighlight,
	Dimensions,
	TextInput,
	StyleSheet,
	ScrollView,
	TouchableOpacity
} from "react-native";
import getFriends from "../../../../helpers/getFriends";

const width = Dimensions.get("screen").width;

export default function ExpenseModal(props) {
	const {
		title,
		form,
		setForm,
		handleSubmit,
		invited,
		setInvited,
		setFriendVisibility
	} = props;

	if (form.name) {
		setInvited(form.borrowers);
	}

	return (
		<View style={styles.mainContainer}>
			<View>
				<Text style={[styles.title, styles.text]}>{props.title}</Text>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.textTitles}>Name:</Text>
				<TextInput
					style={styles.textInput}
					value={form && form.name ? form.name : ""}
					onChangeText={text => setForm({ ...form, name: text })}
				/>
				<Text style={styles.textTitles}>Expense date:</Text>
				<TextInput
					style={styles.textInput}
					value={form && form.expense_date ? form.expense_date : ""}
					onChangeText={text => setForm({ ...form, expense_date: text })}
				/>
				<Text style={styles.textTitles}>Amount:</Text>
				<TextInput
					style={styles.textInput}
					value={form && form.amount_in_cents ? form.amount_in_cents : ""}
					onChangeText={text => setForm({ ...form, amount_in_cents: text })}
				/>
			</View>
			<View style={styles.buttonContainer}>
				{invited && invited.length > 0 ? (
					<View style={styles.friendsList}>
						<TouchableHighlight style={styles.submit}>
							<Text onPress={() => setFriendVisibility(true)}>
								Edit friends
							</Text>
						</TouchableHighlight>

						<Text>Friends added:</Text>
						<ScrollView>
							{invited.map(friend => {
								return (
									<Text>
										{friend.first_name} {friend.last_name} (@
										{friend.username})
									</Text>
								);
							})}
						</ScrollView>
					</View>
				) : (
					<TouchableOpacity
						style={styles.button}
						onPress={() => setFriendVisibility(true)}
					>
						<Text style={styles.buttonText}>Split the cost with:</Text>
					</TouchableOpacity>
				)}

				{props.onDelete && (
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							props.onDelete(form.id);
						}}
					>
						<Text style={styles.buttonText}>Delete</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity style={styles.button}>
					<Text
						style={styles.buttonText}
						onPress={() => handleSubmit("expense")}
					>
						Submit
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: "90%",
		marginTop: "10%",
		alignContent: "center",
		justifyContent: "center"
	},
	textTitles: {
		fontSize: 15,
		width: "100%",
		marginTop: "5%"
	},
	inputContainer: {
		width: "100%",
		flex: 1,
		justifyContent: "space-evenly"
	},
	textTitles: {
		fontSize: 15,
		width: "100%"
	},
	close: {
		position: "absolute",
		right: 20,
		top: 20
	},
	button: {
		width: "100%",
		height: width / 8,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "black",
		marginBottom: "5%"
	},
	buttonText: {
		fontSize: 15,
		fontFamily: "Avenir",
		color: "white"
	},
	buttonContainer: {
		flex: 1
	},
	title: {
		fontSize: 24,
		paddingBottom: "10%"
	},
	textInput: {
		width: "100%",
		height: 40,
		borderColor: "#000",
		borderBottomWidth: 1,
		marginBottom: "2%"
	},
	text: {
		fontFamily: "Avenir"
	},
	error: {
		backgrondColor: "red",
		padding: 10
	},
	friendsList: {
		backgroundColor: "yellow",
		height: "30%"
	}
});
