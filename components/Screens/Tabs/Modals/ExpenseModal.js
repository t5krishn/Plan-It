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

export default function ExpenseModal({
	form,
	setForm,
	handleSubmit,
	invited,
	setFriendVisibility
}) {
	return (
		<View style={styles.content}>
			<Text style={styles.title}>Create a new expense</Text>
			<Text>Name:</Text>
			<TextInput
				style={styles.textInput}
				value={form.name}
				onChangeText={text => setForm({ ...form, name: text })}
			/>
			<Text>Expense date:</Text>
			<TextInput
				style={styles.textInput}
				value={form.expense_date}
				onChangeText={text => setForm({ ...form, expense_date: text })}
			/>
			<Text>Amount:</Text>
			<TextInput
				style={styles.textInput}
				value={form.amount_in_cents}
				onChangeText={text => setForm({ ...form, amount_in_cents: text })}
			/>
			{invited.length > 0 ? (
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
