import React from "react";
import { StyleSheet, View, TouchableOpacity, Text} from "react-native";
import TripItem from "./TripItem"

export default function TripsList({ navigation, trips }) {
    return (
        <View>
            {trips.map((trip, index) => 
                <TripItem
                navigation={navigation}
                trip={trip}
                key={trip.id}/>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    
});