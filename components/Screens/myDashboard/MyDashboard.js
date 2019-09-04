import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import CalendarMonth from "./CalendarMonth";
import TripsList from "./TripsList";

import { connect } from "react-redux";

import { selectTrip, fetchTripData } from "../../../store/actions/tripActions"


function Dashboard(props) {
  let [trips, setTrips] = useState([]);

  const getAllTrips = () => {
    fetch("http://localhost:5422/trip")
      .then(res => res.json())
      .then(data => {
        setTrips(data);
      });
  };

  const onPressTripHandler = (trip_id) => {
	props.dispatch(selectTrip(trip_id))
	props.dispatch(fetchTripData(trip_id))
	props.navigation.navigate("TabNavigator")
  }

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <View style={styles.mainScreenContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>DashboardScreen (Trips Overview):</Text>

        <View style={styles.calendarContainer}>
          <CalendarMonth />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <ScrollView
          style={styles.tripsScrollContainer}
          contentContainerStyle={styles.tripsContent}
        >
          <TripsList onPress={onPressTripHandler} trips={trips} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue"
  },
  topContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
    width: "100%"
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    width: "100%"
  },
  titleText: {
    fontSize: 20,
    marginTop: "12%"
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: "lightgrey",
    marginTop: "2%"
  },
  tripsScrollContainer: {
    width: "100%"
  },
  tripsContent: {
    paddingBottom: 10
    // backgroundColor: "yellow"
  }
});

function mapStateToProps(state) {
  const { selectedTrip, gettingTripData } = state;
  const { isFetchingTrip, events, toDos, expenses } = gettingTripData[
    selectedTrip
  ] || {
    isFetchingTrip: true,
	events: [],
	toDos: [],
	expenses: []
  }

  return {
	selectedTrip,
	isFetchingTrip,
	events,
	toDos,
	expenses
  };
}

export default connect(mapStateToProps)(Dashboard);
