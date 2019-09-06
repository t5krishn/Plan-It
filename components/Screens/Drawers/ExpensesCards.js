import React from "react";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-elements";

export default function ExpenseCards({ items }) {
	return (
		<View containerStyle={{ padding: 0 }}>
			{items.map((e, i) => {
				return (
					<Card key={i}>
						<View>
							<Text>{e.transaction_id}</Text>
							<Text>{e.amount_owed_in_cents}</Text>
							<Text>{e.paid_off}</Text>
							<Text>{e.lender_id}</Text>
							<Text>{e.borrower_id}</Text>
							<Text>{e.expense_id}</Text>
							<Text>{e.lender_first_name}</Text>
							<Text>{e.lender_last_name}</Text>
							<Text>{e.borrower_first_name}</Text>
							<Text>{e.borrower_last_name}</Text>
							<Text>{e.trip_name}</Text>

						</View>
					</Card>
				);
			})}
		</View>
	);
}
