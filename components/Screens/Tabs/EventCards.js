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
						<View style={styles.info}>
							<View>
								<Text style={styles.title}>{e.name}</Text>
							</View>
							<Text style={{ fontSize: 10 }}>{e.address}</Text>
							<Text>{e.description}</Text>
						</View>
						<View style={styles.dates}>
							<View style={styles.dates}>
								<Text style={styles.time}>{formatTime(e.starts_on)}</Text>
								<Text style={styles.date}>
									{dateConvertFormat(e.starts_on)}
								</Text>
							</View>
							<View style={styles.dates}>
								<Text style={styles.time}>{formatTime(e.ends_on)}</Text>
								<Text style={styles.date}>{dateConvertFormat(e.ends_on)}</Text>
							</View>
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
	dates: {
		flex: 1,
		width: "100%",
		alignItems: "center"
	},
	info: {
		flex: 4,
		width: "100%",
		marginTop: "2%",
		marginLeft: "5%"
	},
	time: {
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
