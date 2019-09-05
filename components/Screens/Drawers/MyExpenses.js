import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
				<AddBtn />
			</View>
			<ScrollView>
				<ExpensesCards items={props.user_expenses} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
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