import React from "react";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-elements";

export default function EventCards({ items }) {
	return (
		<View containerStyle={{ padding: 0 }}>
			{items.map((e, i) => {
				return (
					<Card key={e.id}>
						<View>
							<Text>{e.name}</Text>
							<Text>Expense amount: {e.amount_in_cents / 100}</Text>
							<Text>Date: {e.expense_date}</Text>
						</View>
					</Card>
				);
			})}
		</View>
	);
}
