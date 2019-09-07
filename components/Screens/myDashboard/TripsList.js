import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TripItem from "./TripItem";

export default function TripsList({ onPress, trips = [] }) {
	return (
		<View>
			{trips.map(trip => (
				<TripItem onPress={onPress} trip={trip} key={trip.id} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({});
