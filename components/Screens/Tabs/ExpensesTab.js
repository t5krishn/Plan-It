import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import ExpenseCards from "./ExpenseCards";
import AddBtn from "../../Buttons/Addbtn";
import EditModal from "./editModal";

import { connect } from "react-redux";

function ExpensesTab(props) {
	const [edit, setEdit] = useState(false);
	const [form, setForm] = useState({});
	const [invited, setInvited] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (invited.length) {
			setError(false);
		}
	}, [invited]);

	const onPress = expense => {
		console.log(expense);
		setForm(expense);
		setEdit(true);
	};

	return (
		<View style={styles.container}>
			<MenuBtn navigation={props.navigation} />
			<View style={styles.upper}>
				<Text>San Diego Trip!</Text>
				<Text>{props.expenses.length} Expenses</Text>
				<Text>You owe $800 total</Text>
			</View>
			<ScrollView style={styles.lower}>
				<ExpenseCards items={props.expenses} onPress={onPress} />
				<View style={{ height: 100 }} />
			</ScrollView>
			{edit && (
				<EditModal
					isVisible={edit}
					onClose={() => setEdit(false)}
					mode={"expenses"}
					form={form}
					setForm={setForm}
				/>
			)}
			<AddBtn
				navigation={props.navigation}
				tripId={props.selectedTrip}
				userId={props.selectedUser}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		width: Dimensions.get("screen").width,
		height: Dimensions.get("screen").height
	},
	upper: {
		flex: 0.5,
		backgroundColor: "purple",
		justifyContent: "center",
		alignItems: "center"
	},
	lower: {
		flex: 2,
		backgroundColor: "blue"
	}
});

function mapStateToProps(state) {
	const { selectedTrip, gettingTripData } = state;
	const { expenses } = gettingTripData[selectedTrip] || {
		expenses: []
	};

	return {
		selectedTrip,
		expenses
	};
}

export default connect(mapStateToProps)(ExpensesTab);
