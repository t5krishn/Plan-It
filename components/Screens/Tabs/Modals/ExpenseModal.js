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
import getFriends from "../../../../helpers/getFriends";

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
		<View style={styles.content}>
			<Text style={styles.title}>{title}</Text>
			<Text>Name:</Text>
			<TextInput
				style={styles.textInput}
				value={form && form.name ? form.name : ""}
				onChangeText={text => setForm({ ...form, name: text })}
			/>
			<Text>Expense date:</Text>
			<TextInput
				style={styles.textInput}
				value={form && form.expense_date ? form.expense_date : ""}
				onChangeText={text => setForm({ ...form, expense_date: text })}
			/>
			<Text>Amount:</Text>
			<TextInput
				style={styles.textInput}
				value={form && form.amount_in_cents ? form.amount_in_cents : ""}
				onChangeText={text => setForm({ ...form, amount_in_cents: text })}
			/>
			{invited && invited.length > 0 ? (
				<View style={styles.friendsList}>
					<TouchableHighlight style={styles.submit}>
						<Text onPress={() => setFriendVisibility(true)}>Edit friends</Text>
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
				<TouchableHighlight style={styles.submit}>
					<Text onPress={() => setFriendVisibility(true)}>
						Split the cost with:
					</Text>
				</TouchableHighlight>
			)}
			{props.onDelete && (
				<TouchableHighlight
					style={styles.button}
					onPress={() => {
						console.log("EXPENSE MODAL", form);
						props.onDelete(form.id);
					}}
				>
					<Text>Delete</Text>
				</TouchableHighlight>
			)}
			<TouchableHighlight style={styles.submit}>
				<Text onPress={() => handleSubmit("expense")}>Submit</Text>
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
