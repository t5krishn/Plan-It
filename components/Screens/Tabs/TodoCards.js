import React from "react";
import { View, Text, TouchableHighlight } from "react-native";

export default function EventCards({ items, onPress }) {
	return (
		<View containerStyle={{ padding: 0 }}>
			{items.map((e, i) => {
				return (
					<TouchableHighlight key={e.id} onPress={() => onPress(e)}>
						<View>
							<Text>Content: {e.content}</Text>
							<Text>Completed?: {e.completed}</Text>
							<Text>Created at: {e.created_at}</Text>
							<Text>Updated at: {e.updated_at}</Text>
						</View>
					</TouchableHighlight>
				);
			})}
		</View>
	);
}
