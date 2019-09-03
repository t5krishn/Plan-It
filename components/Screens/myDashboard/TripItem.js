import React from "react";
import { StyleSheet, View, TouchableOpacity, Text} from "react-native";

export default function TripItem({ navigation, trip }) {
    return (
        <TouchableOpacity
        onPress={() => navigation.navigate("TabNavigator", { trip_id: 1 })}
        style={styles.tripContentItem}>
                <Text style={styles.tripNameText}>
                    {trip.name}
                </Text>

                <Text style={styles.tripLocationText}>
                    {trip.location}
                </Text>

                <Text style={styles.dateText}>
                    {trip.starts_on}
                </Text>

                <Text style={styles.dateText}>
                    {trip.ends_on}
                </Text>
                
                <Text style={styles.tripDescText}>
                    {trip.description}
                </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tripContentItem : {
        backgroundColor: "blue",
        height: 150,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    tripNameText : {
        fontSize: 20,
        color: "yellow"
    },
    tripLocationText : {
        fontSize: 12,
        color: "lightgreen"
    }
});