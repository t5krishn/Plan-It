import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";

export default function EventCards({ items, onPress }) {
	return items.length > 0 ? (
		<View style={styles.containerStyle}>
			{items.map((e, i) => {
				return (
					<TouchableOpacity
						key={e.id}
						style={styles.cards}
						onPress={() => onPress(e)}
					>
						<Text>Location: {e.name}</Text>
						<Text>Location: {e.address}</Text>
						<Text>Description: {e.description}</Text>
						<Text>Starts on: {e.starts_on}</Text>
						<Text>Ends on: {e.ends_on}</Text>
					</TouchableOpacity>
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
		shadowRadius: 3.84
	}
});
