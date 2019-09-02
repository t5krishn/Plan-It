import React from "react";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-elements";

export default function EventCards({ items }) {
	return (
		<View containerStyle={{ padding: 0 }}>
			{items.map((e, i) => {
				return (
					<Card>
						<View>
							<Text>Content: {e.content}</Text>
							<Text>Completed?: {e.completed}</Text>
							<Text>Created at: {e.created_at}</Text>
							<Text>Updated at: {e.updated_at}</Text>
						</View>
					</Card>
				);
			})}
		</View>
	);
}
