import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions,
	TextInput,
	Alert,
	StyleSheet,
	ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { CheckBox } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import { ScrollView } from "react-native-gesture-handler";

function TripSettingsModal(props) {
	const [updateInfo, setUpdateInfo] = useState(
		props.trip && {
			name: props.trip.name,
			location: props.trip.location,
			starts_on: props.trip.starts_on,
			ends_on: props.trip.ends_on,
			description: props.trip.description
		}
	);

	const [showStartsOn, setShowStartsOn] = useState(false);
	const [showEndsOn, setShowEndsOn] = useState(false);

	const tripUsers = {};
	props.tripUsers &&
		props.tripUsers.forEach(e => {
			tripUsers[e.id] = true;
		});

	const friends = {};
	props.friends &&
		props.friends.forEach(e => {
			if (!tripUsers[e.id]) {
				friends[e.id] = false;
			}
		});

	const filteredFriends = props.friends.filter(f => f.id in friends);

	const [checkedTripUsers, setCheckedTripUsers] = useState(tripUsers);
	const [checkedFriends, setCheckedFriends] = useState(friends);

	const handleDelete = () => {
		Alert.alert(
			"Confirm",
			"Are you sure you want to delete this trip? Make sure eveyone in your trip is aware you're deleting this trip",
			[
				{ text: "Cancel", onPress: () => {}, style: "cancel" },
				{
					text: "OK",
					onPress: () => {
						props.onDelete(props.user);
					}
				}
			],
			{ cancelable: false }
		);
	};
	// updateInfo => {
	//            name,
	//            location,
	//            starts_on,
	//            ends_on,
	//            description,
	//            added:[user_ids],
	//            removed:[user_ids] }

	const handleSubmit = () => {
		updateInfo.added = Object.keys(checkedFriends).filter(
			key => checkedFriends[key]
		);
		updateInfo.removed = Object.keys(checkedTripUsers).filter(
			key => !checkedTripUsers[key]
		);

		props.onSubmit(updateInfo);
	};

	return (
		<View style={{ marginTop: 22, alignItems: "center" }}>
			<Modal animationType="slide" transparent={true} visible={props.isVisible}>
				<ImageBackground
					source={require("../../../assets/plant2.jpg")}
					style={{
						marginTop: "5%",
						width: "100%",
						height: Dimensions.get("screen").height,
						alignItems: "center"
					}}
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
					<TouchableHighlight
						style={styles.close}
						onPress={() => {
							props.setVisibility(false);
						}}
					>
						<Icon name="close" size={30} />
					</TouchableHighlight>

					<Text style={styles.title}>Edit your trip below</Text>

					<View style={styles.inputContainer}>
						<Text style={styles.content}>Trip Name</Text>
						<TextInput
							style={styles.TextInput}
							value={updateInfo.name}
							onChangeText={text =>
								setUpdateInfo({ ...updateInfo, name: text })
							}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.content}>Trip Location</Text>
						<TextInput
							style={styles.TextInput}
							value={updateInfo.location}
							onChangeText={text =>
								setUpdateInfo({ ...updateInfo, location: text })
							}
						/>
					</View>

					<View style={{ width: "90%" }}>
						<Text
							style={{
								fontFamily: "Avenir-BookOblique",
								fontSize: 15,
								marginTop: "5%"
							}}
						>
							Press to update start and end date:
						</Text>
						<TouchableOpacity
							onPress={() => {
								setShowStartsOn(true);
							}}
							style={styles.button}
						>
							<Text style={styles.buttonText}>
								Starts: {new Date(updateInfo.starts_on).toDateString()}
							</Text>
						</TouchableOpacity>

						<DateTimePicker
							customCancelButtonIOS={
								<View style={styles.dateButton}>
									<Text style={styles.dateText}>Cancel</Text>
								</View>
							}
							customConfirmButtonIOS={
								<View style={styles.dateButton}>
									<Text style={styles.dateText}>Confirm</Text>
								</View>
							}
							datePickerContainerStyleIOS={{ borderRadius: 0 }}
							titleIOS={"Update Start Date"}
							isVisible={showStartsOn}
							date={new Date(updateInfo.starts_on)}
							onConfirm={date => {
								setUpdateInfo({ ...updateInfo, starts_on: date });
								setShowStartsOn(false);
							}}
							onCancel={() => {
								setShowStartsOn(false);
							}}
						/>

						<TouchableOpacity
							onPress={() => {
								setShowEndsOn(true);
							}}
							style={styles.button}
						>
							<Text style={styles.buttonText}>
								Ends on: {new Date(updateInfo.starts_on).toDateString()}
							</Text>
						</TouchableOpacity>
						<DateTimePicker
							customCancelButtonIOS={
								<View style={styles.dateButton}>
									<Text style={styles.dateText}>Cancel</Text>
								</View>
							}
							customConfirmButtonIOS={
								<View style={styles.dateButton}>
									<Text style={styles.dateText}>Confirm</Text>
								</View>
							}
							datePickerContainerStyleIOS={{ borderRadius: 0 }}
							titleIOS={"Update End date"}
							isVisible={showEndsOn}
							date={new Date(updateInfo.ends_on)}
							onConfirm={date => {
								setUpdateInfo({ ...updateInfo, ends_on: date });
								setShowEndsOn(false);
							}}
							onCancel={() => {
								setShowEndsOn(false);
							}}
						/>
					</View>

					<View style={{ flex: 6 }}>
						<Text style={[styles.content, { marginTop: "5%" }]}>
							Trip Attendees:
						</Text>
						<View style={styles.friendsContainer}>
							{!filteredFriends.length && !props.tripUsers.length ? (
								<Text style={styles.warning}>
									No people added to trip. Go to Find friends and add some
									friends to add to your trip
								</Text>
							) : null}
							{filteredFriends.length && !props.tripUsers.length ? (
								<Text style={styles.warning}>
									No people added to trip. Add some friends to your trip
								</Text>
							) : null}
							<ScrollView contentContainerStyle={styles.checkBox}>
								{props.tripUsers.map(tripUser => {
									return (
										<CheckBox
											textStyle={{
												fontFamily: "Avenir",
												fontSize: 15,
												fontWeight: "normal",
												color: "black"
											}}
											containerStyle={{
												borderRadius: 0,
												backgroundColor: "white",
												width: "100%",
												marginLeft: 0,
												height: 45,
												borderColor: "white"
											}}
											key={tripUser.id}
											title={tripUser.first_name + " " + tripUser.last_name}
											checked={checkedTripUsers[tripUser.id]}
											onPress={() => {
												setCheckedTripUsers({
													...checkedTripUsers,
													[tripUser.id]: !checkedTripUsers[tripUser.id]
												});
											}}
										/>
									);
								})}
								{filteredFriends.map(friend => {
									return (
										<CheckBox
											textStyle={{
												fontFamily: "Avenir",
												fontSize: 15,
												fontWeight: "normal",
												color: "black"
											}}
											containerStyle={{
												borderRadius: 0,
												backgroundColor: "white",
												width: "100%",
												marginLeft: 0,
												height: 45,
												borderColor: "white"
											}}
											key={friend.id}
											title={friend.first_name + " " + friend.last_name}
											checked={checkedFriends[friend.id]}
											onPress={() => {
												setCheckedFriends({
													...checkedFriends,
													[friend.id]: !checkedFriends[friend.id]
												});
											}}
										/>
									);
								})}
							</ScrollView>
						</View>
					</View>
					<View style={{ width: "90%" }}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => handleSubmit()}
						>
							<Text style={styles.buttonText}>Update Trip</Text>
						</TouchableOpacity>

						<View style={styles.deleteTrip}>
							<TouchableOpacity
								onPress={handleDelete}
								style={styles.deletebutton}
							>
								<Text style={styles.deleteButtonText}>Delete Trip</Text>
							</TouchableOpacity>
							<Text style={[styles.warning, { color: "black" }]}>
								Warning: Doing this will delete all the events, to-dos and
								expenses you have created for this trip
							</Text>
						</View>
					</View>
				</ImageBackground>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	close: {
		position: "absolute",
		right: 20,
		top: 20
	},
	checkBox: {
		width: "100%"
		// height: 200
	},
	inputContainer: {
		width: "90%"
	},
	friendsContainer: {
		height: "80%",
		width: "90%"
	},
	button: {
		backgroundColor: "black",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "5%",
		paddingBottom: "5%",
		height: 40
	},
	buttonText: {
		color: "white",
		fontSize: 15,
		fontFamily: "Avenir"
	},
	deletebutton: {
		borderColor: "black",
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: 40
	},
	deleteButtonText: {
		fontSize: 20,
		fontWeight: "bold"
	},
	deleteTrip: {
		paddingTop: "5%",
		alignItems: "center",
		justifyItem: "center",
		marginBottom: "10%"
	},
	title: {
		fontSize: 24,
		marginTop: "15%",
		fontFamily: "Avenir"
	},
	content: {
		fontSize: 15,
		width: "100%",
		fontFamily: "Avenir-BookOblique",
		marginBottom: "2%"
	},
	warning: {
		fontSize: 15,
		color: "red",
		fontFamily: "Avenir",
		textAlign: "center"
	},
	TextInput: {
		width: "100%",
		height: 40,
		borderColor: "#000",
		borderBottomWidth: 1,
		marginBottom: "2%",
		fontFamily: "Avenir",
		fontSize: 18
	},
	dateButton: {
		backgroundColor: "black",
		alignItems: "center",
		height: 40
	},
	dateText: {
		color: "white",
		fontFamily: "Avenir",
		fontSize: 16
	}
});

export default connect()(TripSettingsModal);
