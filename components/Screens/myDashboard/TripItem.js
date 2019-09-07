import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import dateConvertFormat from "../../../helpers/dateCovertFormat";
import Icon from "react-native-vector-icons/FontAwesome";

export default function TripItem(props) {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					props.onPress(props.trip.id);
				}}
				style={styles.tripContentItem}
			>
				<View
					style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
				>
					<Text style={styles.tripTimeText}>
						{dateConvertFormat(props.trip.starts_on)}
					</Text>
					<Text style={{ fontSize: 20 }}>-</Text>
					<Text style={styles.tripTimeText}>
						{dateConvertFormat(props.trip.ends_on)}
					</Text>
				</View>
				<View style={{ flex: 3 }}>
					<Text style={styles.tripNameText}>{props.trip.name}</Text>

					<Text style={styles.tripLocationText}>{props.trip.location}</Text>

					<Text style={styles.tripDescText}>{props.trip.description}</Text>
				</View>
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
		flexDirection: "row",
		justifyContent: "center",
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
		fontFamily: "Avenir",
		fontSize: 20,
		color: "black"
	},
	tripTimeText: {
		fontFamily: "Avenir",
		fontSize: 20,
		color: "black"
	},
	tripLocationText: {
		fontFamily: "Avenir",
		fontSize: 10,
		color: "black"
	}
});
