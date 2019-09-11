import React from "react";
import { View, Text, TouchableHighlight } from "react-native";

export default function ExpenseCards({ items, onPress }) {
	return (
		<View containerStyle={{ padding: 0 }}>
			{items.map((e, i) => {
				console.log(e);
				return (
					<TouchableHighlight key={e.id} onPress={() => onPress(e)}>
						<View>
							<Text>Name:{e.name}</Text>
							<Text>Lender:{e.lender}</Text>
							<Text>Borrower: {e.borrowers}</Text>
							<Text>Expense amount: {e.amount_in_cents * 100}</Text>
							<Text>Date: {e.expense_date}</Text>
						</View>
					</TouchableHighlight>
				);
			})}
		</View>
	);
}
