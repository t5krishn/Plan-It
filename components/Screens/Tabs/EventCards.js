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
						<View
							style={{
								flex: 1,
								flexDirection: "column",
								justifyContent: "space-around",
								margin: "2%"
							}}
						>
							<View style={styles.info}>
								<Text style={styles.title}>{e.name}</Text>
								<Text style={{ fontSize: 10 }}>{e.address}</Text>
								<Text>{e.description}</Text>
							</View>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									width: "100%"
								}}
							>
								<Text style={styles.time}>
									{dateConvertFormat(e.starts_on)}
								</Text>
								<Text style={styles.date}>{formatTime(e.starts_on)} </Text>
								<Text> - </Text>
								<Text style={styles.time}>{dateConvertFormat(e.ends_on)}</Text>
								<Text style={styles.date}>{formatTime(e.ends_on)} </Text>
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
		marginBottom: "5%",
		paddingBottom: "2%"
	},
	info: {
		flex: 2,
		width: "100%"
	},
	time: {
		fontSize: 15,
		fontFamily: "Avenir",
		color: "black"
	},
	title: {
		fontFamily: "Avenir",
		fontSize: 18,
		color: "black"
	},
	date: { fontSize: 12, fontFamily: "Avenir", color: "black" }
});
