import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TripItem from "./TripItem";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

export default function TripsList({ onPress, trips = [] }) {
	return (
		<View>
			{trips.map((trip, i) => (
				<TripItem
					onPress={onPress}
					trip={trip}
					key={trip.id}
					color={colors[i]}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({});
