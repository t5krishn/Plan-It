import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import EventCards from "./EventCards";

import { connect } from "react-redux";


function EventsTab(props) {

  return (
    <View style={styles.container}>
      <MenuBtn navigation={props.navigation} />
      <View style={styles.upper}>
        <Text>San Diego Trip!</Text>
        <Text>{props.events.length} Events Total {console.log(props)}</Text>
		
        <Text>Calendar View</Text>
      </View>
      <ScrollView style={styles.lower}>
        <EventCards items={props.events} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  },
  upper: {
    flex: 0.5,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center"
  },
  lower: {
    flex: 2,
    backgroundColor: "red"
  }
});

function mapStateToProps(state) {
  const { selectedTrip, gettingTripData } = state;
  const { events } = gettingTripData[
    selectedTrip
  ] || {
    events: []
  };

  return {
    selectedTrip,
    events,
  };
}

export default connect(mapStateToProps)(EventsTab);