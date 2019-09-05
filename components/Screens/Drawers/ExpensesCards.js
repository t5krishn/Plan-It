import React from "react";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-elements";

export default function ExpenseCards({ items }) {
	return (
		<View containerStyle={{ padding: 0 }}>
			{items.map((e, i) => {
				return (
					<Card>
						<View>
							<Text>{e.first_name}</Text>
							<Text>{e.last_name}</Text>
							<Text>{e.username}</Text>
						</View>
					</Card>
				);
			})}
		</View>
	);
}
