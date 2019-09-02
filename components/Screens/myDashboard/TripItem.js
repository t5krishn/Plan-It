import React from "react";
import { StyleSheet, View, TouchableOpacity, Text} from "react-native";

export default function TripItem({ navigation }) {
    return (
        <TouchableOpacity
        onPress={() => navigation.navigate("TabNavigator")}
        style={styles.tripContentItem}>
                <Text style={styles.tripNameText}>San Diego Trip</Text>
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
    }
});