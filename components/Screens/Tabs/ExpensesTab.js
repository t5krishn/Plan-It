import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import ExpenseCards from "./ExpenseCards";
import AddBtn from "../../Buttons/Addbtn";
import EditModal from "./editModal";
import TripSettingsBtn from "../../Buttons/TripSettingsbtn";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";

function ExpensesTab(props) {
	const [edit, setEdit] = useState(false);
	const [form, setForm] = useState({});
	const [invited, setInvited] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (invited.length) {
			setError(false);
		}
	}, [invited]);

	const onPress = expense => {
		setForm(expense);
		setEdit(true);
	};

	const trip = props.trip;

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
								{props.expenses.length} total events
							</Text>
						</View>
					</View>
				</View>
			</View>
			<ScrollView contentContainerStyle={styles.lower}>
				<ExpenseCards
					items={props.expenses}
					onPress={onPress}
					userId={props.selectedUser}
					tripUsers={props.tripUsers}
				/>
				<View style={{ height: 100 }} />
			</ScrollView>
			{/* {edit && (
				<EditModal
					isVisible={edit}
					onClose={() => setEdit(false)}
					mode={"expenses"}
					form={form}
					setForm={setForm}
				/>
			)} */}
			<AddBtn
				navigation={props.navigation}
				tripId={props.selectedTrip}
				userId={props.selectedUser}
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
		width: "100%",
		alignItems: "center",
		paddingTop: "20%"
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
		fontSize: 20,
		fontFamily: "Avenir"
	},
	text: {
		fontFamily: "Avenir"
	},
	lower: {
		flex: 6,
		width: "100%",
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
	const { expenses, tripUsers, isFetchingTrip } = gettingTripData[
		selectedTrip
	] || {
		expenses: [],
		tripUsers: []
	};
	const trip = gettingUserData[selectedUser].user_trips.find(
		e => e.id === selectedTrip
	);
	const { user_friends } = gettingUserData[selectedUser] || {
		user_friends: []
	};
	return {
		selectedTrip,
		selectedUser,
		expenses,
		trip,
		tripUsers,
		isFetchingTrip,
		user_friends
	};
}

export default connect(mapStateToProps)(ExpensesTab);
