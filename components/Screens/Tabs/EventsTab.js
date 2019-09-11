import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MenuBtn from "../../Buttons/Menubtn";
import EventCards from "./EventCards";
import AddBtn from "../../Buttons/Addbtn";
import TripSettingsBtn from "../../Buttons/TripSettingsbtn";
import CalendarMonth from "../myDashboard/CalendarMonth";
import { connect } from "react-redux";
import EditModal from "./editModal";
import getCurrentTrip from "../../../helpers/getCurrentTrip";

//event update form should look like this { id:eventId, name, address, start_on, ends_on, description }

function EventsTab(props) {
	const [edit, setEdit] = useState(false);
	const [form, setForm] = useState({});

	const onPress = event => {
		setForm(event);
		setEdit(true);
	};

	const trip = getCurrentTrip(props.user_trips, props.selectedTrip);

	return (
		<View style={styles.container}>
			<MenuBtn navigation={props.navigation} />

			{!props.isFetchingTrip && (
				<TripSettingsBtn
					tripUsers={props.tripUsers.filter(user => {
						return user.id !== parseInt(props.selectedUser);
					})}
					user={props.selectedUser}
					trip={props.trip}
					dispatch={props.dispatch}
					navigation={props.navigation}
					friends={props.user_friends}
				/>
			)}

			<View style={styles.upper}>
				<View style={styles.title}>
					<Text style={[styles.title, styles.text]}>{trip.name}</Text>
					<View style={styles.tripInfoContainer}>
						<View style={styles.iconContainer}>
							<Icon name="map-pin" size={20} style={styles.icon} />
							<Icon name="user" size={20} style={styles.icon} />
							<Icon name="calendar-o" size={18} style={styles.icon} />
						</View>
						<View style={styles.tripinfo}>
							<Text style={[styles.upperText, styles.text]}>
								{trip.location}
							</Text>
							<Text style={[styles.upperText, styles.text]}>
								{props.tripUsers.length} people going
							</Text>
							<Text style={[styles.upperText, styles.text]}>
								{props.events.length} Events Total
							</Text>
						</View>
					</View>
				</View>
			</View>
			<ScrollView contentContainerStyle={styles.lower}>
				{props.isFetchingTrip ? (
					<Text>Loading!</Text>
				) : (
					<EventCards items={props.events} onPress={onPress} />
				)}
				<View style={{ height: 100 }} />
			</ScrollView>
			{edit && (
				<EditModal
					isVisible={edit}
					onClose={() => setEdit(false)}
					mode={"events"}
					form={form}
					setForm={setForm}
				/>
			)}
			<AddBtn
				tripId={props.selectedTrip}
				userId={props.selectedUser}
				navigation={props.navigation}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	upper: {
		flex: 0.3,
		backgroundColor: "#FFFFFF",
		width: "100%",
		alignItems: "center",
		paddingTop: "20%"
	},
	upperText: {
		fontSize: 16
	},
	tripInfoContainer: {
		flexDirection: "row",
		height: "70%"
	},
	iconContainer: {
		height: "100%",
		justifyContent: "space-between",
		alignItems: "center"
	},
	tripinfo: {
		height: "100%",
		justifyContent: "space-between",
		paddingLeft: "5%"
	},
	title: {
		fontSize: 25
	},
	text: {
		fontFamily: "Avenir"
	},
	lower: {
		flex: 3,
		width: "100%",
		backgroundColor: "#FFF",
		alignItems: "center"
	}
});

function mapStateToProps(state) {
	const {
		selectedTrip,
		gettingTripData,
		selectedUser,
		gettingUserData
	} = state;
	const { events, tripUsers, isFetchingTrip } = gettingTripData[
		selectedTrip
	] || {
		events: [],
		tripUsers: []
	};

	const { user_friends, user_trips } = gettingUserData[selectedUser] || {
		user_friends: [],
		user_trips: []
	};
	const trip = gettingUserData[selectedUser].user_trips.find(
		e => e.id === selectedTrip
	);

	return {
		selectedTrip,
		events,
		trip,
		tripUsers,
		selectedUser,
		isFetchingTrip,
		user_friends,
		user_trips
	};
}

export default connect(mapStateToProps)(EventsTab);
