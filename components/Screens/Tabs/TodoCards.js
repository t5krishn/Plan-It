import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function EventCards({ items, onPress }) {
	return items.length > 0 ? (
		<View style={styles.containerStyle}>
			{items.map((e, i) => {
				return (
					<TouchableOpacity key={e.id} onPress={() => onPress(e)}>
						<View>
							<Text>Content: {e.content}</Text>
							<Text>Completed?: {e.completed}</Text>
							<Text>Created at: {e.created_at}</Text>
							<Text>Updated at: {e.updated_at}</Text>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	) : (
		<View style={{ alignItems: "center" }}>
			<Text>You have no to do items yet!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		alignItems: "center",
		width: "90%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84
	},
	cards: {
		height: 100,
		width: "100%",
		flexDirection: "row",
		backgroundColor: "white",
		marginTop: "2%",
		marginBottom: "2%"
	},
	title: {
		fontFamily: "Avenir",
		fontSize: 18,
		color: "black"
	}
});
