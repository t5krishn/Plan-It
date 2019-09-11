import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { formatTime } from "../../../helpers/formatDateTime";
import dateConvertFormat from "../../../helpers/dateCovertFormat";

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
						<View style={styles.dates}>
							<View>
								<Text style={styles.date}>
									{dateConvertFormat(e.starts_on)}
								</Text>
								<Text style={styles.time}>{formatTime(e.starts_on)}</Text>
							</View>
							<View>
								<Text style={styles.date}>{dateConvertFormat(e.ends_on)}</Text>
								<Text style={styles.time}>{formatTime(e.ends_on)}</Text>
							</View>
						</View>
						<View style={styles.info}>
							<Text>Name: {e.name}</Text>
							<Text>Location: {e.address}</Text>
							<Text>Description: {e.description}</Text>
						</View>
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
		backgroundColor: "gray",
		alignItems: "center",
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
	cards: {
		backgroundColor: "blue",
		margin: 10,
		height: 100,
		width: "100%",
		flexDirection: "row"
	},
	dates: {
		flex: 1
	},
	info: {
		flex: 4
	},
	date: {
		fontSize: 18
	}
});
