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
							<View>
								<Text style={styles.title}>Name: {e.name}</Text>
							</View>
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
		backgroundColor: "white",
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
		width: "90%",
		flexDirection: "row",
		margin: "2%"
	},
	dates: {
		flex: 1,
		justifyContent: "center"
	},
	info: {
		flex: 4,
		justifyContent: "center"
	},
	date: {
		fontFamily: "Avenir",
		fontSize: 18,
		color: "black"
	},
	title: {
		fontFamily: "Avenir",
		fontSize: 18,
		color: "black"
	}
});
