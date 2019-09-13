import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, ImageBackground } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import TodoCards from "./TodoCards";
import AddBtn from "../../Buttons/Addbtn";
import TripSettingsBtn from "../../Buttons/TripSettingsbtn";
import Icon from "react-native-vector-icons/FontAwesome";
import { deleteTripItem } from "../../../store/actions/tripActions";
import EditModal from "./editModal";
import { connect } from "react-redux";

function TodoTab(props) {
	const [edit, setEdit] = useState(false);
	const [form, setForm] = useState({});

	//Pressing a todo item deletes (completes) it
	const onChecked = todo => {
		props.dispatch(
			deleteTripItem(props.selectedUser, props.selectedTrip, "toDos", todo.id)
		);
	};

	const onPress = todo => {
		setForm(todo);
		setEdit(true);
	};

	const trip = props.trip;

	return (
		<ImageBackground
		source={require("../../../assets/plant2.jpg")}
		style={{ width: "100%", height: "100%" }}
	  >
		<View
		  style={{
			position: "absolute",
			backgroundColor: "white",
			opacity: 0.5,
			width: "100%",
			height: Dimensions.get("screen").height
		  }}
		/>
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
				<View>
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
								{props.toDos.length} to do items
							</Text>
						</View>
					</View>
				</View>
			</View>
			<ScrollView style={styles.lower}>
				<TodoCards
					items={props.toDos}
					onChecked={onChecked}
					onPress={onPress}
				/>
				<View style={{ height: 100 }} />
			</ScrollView>
			{edit && (
				<EditModal
					isVisible={edit}
					onClose={() => setEdit(false)}
					mode={"toDos"}
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
		</ImageBackground>
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
		justifyContent: "center",
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
		fontSize: 20
	},
	text: {
		fontFamily: "Avenir"
	},
	lower: {
		flex: 6
	}
});

function mapStateToProps(state) {
	const {
		selectedTrip,
		gettingTripData,
		selectedUser,
		gettingUserData
	} = state;
	const { toDos, isFetchingTrip, tripUsers } = gettingTripData[
		selectedTrip
	] || {
		toDos: [],
		tripUsers: []
	};
	const { user_friends } = gettingUserData[selectedUser] || {
		user_friends: []
	};
	const trip = gettingUserData[selectedUser].user_trips.find(
		e => e.id === selectedTrip
	);
	return {
		selectedUser,
		selectedTrip,
		toDos,
		isFetchingTrip,
		trip,
		tripUsers,
		user_friends
	};
}

export default connect(mapStateToProps)(TodoTab);
