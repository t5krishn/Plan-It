import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import AddBtn from "../../Buttons/Addbtn";
import ExpensesCards from "./ExpensesCards";

import { connect } from "react-redux";

function MyExpensesScreen(props) {
	return (
		<View>
			<MenuBtn navigation={props.navigation} />
			<View style={styles.container}>
				<Text>ExpensesScreen</Text>
			</View>
			<ScrollView>
				<ExpensesCards items={props.user_expenses} />
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
	const { isFetchingUser, user_expenses } = gettingUserData[selectedUser] || {
		isFetchingUser: true,
		user_expenses: []
	};

	return {
		selectedUser,
		isFetchingUser,
		user_expenses
	};
}

export default connect(mapStateToProps)(MyExpensesScreen);
