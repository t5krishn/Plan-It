import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

export default function EventCards({ items }) {
	return items.length > 0 ? (
		<View style={styles.containerStyle}>
			{items.map((e, i) => {
				return (
					<View key={e.id} style={styles.cards}>
						<Text>Location: {e.address}</Text>
						<Text>Description: {e.description}</Text>
						<Text>Starts on: {e.starts_on}</Text>
						<Text>Ends on: {e.ends_on}</Text>
					</View>
				);
			})}
		</View>
	) : (
		<View>
			<Text>You have no events yet!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: "lightgray",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.5,
		shadowRadius: 3.84,
		height: 130,
		width: 330
	}
});
