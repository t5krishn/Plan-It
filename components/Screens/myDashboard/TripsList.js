import React from "react";
import { StyleSheet, View, TouchableOpacity, Text} from "react-native";
import TripItem from "./TripItem"

export default function TripsList({ navigation }) {
    return (
        <View>
            
            <TripItem navigation={navigation}/>
            <TripItem navigation={navigation}/>
            <TripItem navigation={navigation}/>
            <TripItem navigation={navigation}/>
            <TripItem navigation={navigation}/>
            <TripItem navigation={navigation}/>
            <TripItem navigation={navigation}/>
            <TripItem navigation={navigation}/>
            <TripItem navigation={navigation}/>
            <TripItem navigation={navigation}/>
            <TripItem navigation={navigation}/>
            <TripItem navigation={navigation}/>
            
        </View>
    );
}

const styles = StyleSheet.create({
    
});