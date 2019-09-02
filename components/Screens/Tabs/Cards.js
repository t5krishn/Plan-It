import React from "react";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-elements";

export default function EventCards({ events }) {
	return (
		<View containerStyle={{ padding: 0 }}>
			{events.map((e, i) => {
				return (
					<Card>
						<View>
							<Text>Location: {e.location}</Text>
							<Text>Description: {e.description}</Text>
							<Text>Starts on: {e.starts_on}</Text>
							<Text>Ends on: {e.ends_on}</Text>
						</View>
					</Card>
				);
			})}
		</View>
	);
}
