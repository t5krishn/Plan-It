import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import AddBtn from "../../Buttons/Addbtn";
import ExpensesCards from "./ExpensesCards";

import { connect } from "react-redux";

function MyExpensesScreen(props) {
	let test = [
		{
			transaction_id: 1,
			amount_owed_in_cents: 1231,
			paid_off: false,
			lender_id: 1,
			borrower_id: 2,
			expense_id: 1,
			lender_first_name: "John",
			lender_last_name: "Doe",
			borrower_first_name: "Josh",
			borrower_last_name: "Colen",
			trip_name: "6ix turnup"
		}
	]
	return (
		<View>
			<MenuBtn navigation={props.navigation} />
			<View style={styles.container}>
				<Text>ExpensesScreen</Text>
			</View>
			{console.log(props.user_expenses)}
			<ScrollView>
				<ExpensesCards items={test} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 200,
		alignItems: "center"
	},
	TextInput: {
		borderColor: "black",
		borderWidth: 1,
		width: 100
	}
});
function mapStateToProps(state) {
	const { selectedUser, gettingUserData } = state;
	const { isFetchingUser, user_expenses } = gettingUserData[
		selectedUser
	] || {
		isFetchingUser: true,
		user_expenses: []
	}

	return {
		selectedUser,
		isFetchingUser,
		user_expenses
	}
}

export default connect(mapStateToProps)(MyExpensesScreen);