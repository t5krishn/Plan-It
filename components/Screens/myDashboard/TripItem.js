import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default function TripItem({ onPress, trip }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					onPress(trip.id);
				}}
				style={styles.tripContentItem}
			>
				<Text style={styles.tripNameText}>{trip.name}</Text>

				<Text style={styles.tripLocationText}>{trip.location}</Text>

				<Text style={styles.tripLocationText}>
					{trip.starts_on} - {trip.ends_on}
				</Text>

				<Text style={styles.tripDescText}>{trip.description}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	tripContentItem: {
		backgroundColor: "#FFFFFF",
		height: 100,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 5,
		width: "95%",
		marginLeft: "2.5%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84
	},
	tripNameText: {
		fontSize: 20,
		color: "black"
	},
	tripLocationText: {
		fontSize: 10,
		color: "black"
	}
});
