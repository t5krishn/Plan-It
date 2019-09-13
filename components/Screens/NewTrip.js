import React, { useState, useEffect } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	View,
	Dimensions,
	ScrollView,
	ImageBackground
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { addNewUserTrip } from "../../store/actions/userAction";
import AddFriendsModal from "../Screens/Tabs/addFriendsModal";
import BackBtn from "../Buttons/Backbtn";
import getIds from "../../helpers/getIds";

const width = Dimensions.get("screen").width;

function NewTrip(props) {
	const [addFriendsVisible, setFriendVisibility] = useState(false);
	const [isDateTimePickerVisible, setDateTimeVisibility] = useState({
		start: false,
		end: false
	});
	// invited is an array of userIds: {userObject}
	const [invited, setInvited] = useState([]);

	const [state, setState] = useState({
		name: "",
		location: "",
		starts_on: "",
		ends_on: "",
		description: ""
	});

	const handleSubmit = () => {
		if (state.name && state.location && state.starts_on && state.ends_on) {
			props.dispatch(
				addNewUserTrip(props.selectedUser, {
					...state,
					trip_users: [...getIds(invited), props.selectedUser]
				})
			);
			props.navigation.navigate("Dashboard");
		} else {
			Alert.alert("You forgot to fill out an input field!");
		}
	};

	const handleDatePicked = (date, mode) => {
		if (mode === "startDate") {
			setState({ ...state, starts_on: date });
			setDateTimeVisibility({ ...isDateTimePickerVisible, start: false });
		} else {
			setState({ ...state, ends_on: date });
			setDateTimeVisibility({ ...isDateTimePickerVisible, end: false });
		}
	};

	return (
		<ImageBackground
			source={require("../../assets/plant1.jpg")}
			style={{
				width: "100%",
				height: "100%",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<View
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					opacity: 0.5,
					backgroundColor: "#FFF"
				}}
			/>
			<KeyboardAvoidingView
				style={styles.container}
				behaviour="padding"
				enabled
			>
				<BackBtn onPress={() => props.navigation.navigate("Dashboard")} />
				<View style={styles.title}>
					<Text style={styles.titleText}>Create a new trip</Text>
				</View>
				<View style={styles.inputContainer}>
					<View style={styles.textInputContainer}>
						<Text style={styles.inputTitle}>Name:</Text>
						<TextInput
							style={styles.textInput}
							value={state.firstName}
							onChangeText={text => setState({ ...state, name: text })}
						/>
					</View>
					<View style={styles.textInputContainer}>
						<Text style={styles.inputTitle}>Location:</Text>
						<TextInput
							style={styles.textInput}
							onChangeText={text => setState({ ...state, location: text })}
						/>
					</View>
					<View style={styles.textInputContainer}>
						<Text style={styles.inputTitle}>Description:</Text>
						<TextInput
							style={styles.textInput}
							onChangeText={text => setState({ ...state, description: text })}
						/>
					</View>
					<View style={styles.datePickerContainer}>
						{!state.starts_on ? (
							<View style={styles.datePicker}>
								<TouchableOpacity
									style={styles.datePickerButton}
									onPress={() =>
										setDateTimeVisibility({
											...isDateTimePickerVisible,
											start: true
										})
									}
								>
									<Text style={styles.datePickerButtonText}>Starts on</Text>
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
									titleIOS={"Pick a start date"}
									isVisible={isDateTimePickerVisible.start}
									onConfirm={date => handleDatePicked(date, "startDate")}
									onCancel={() =>
										setDateTimeVisibility({
											...isDateTimePickerVisible,
											start: false
										})
									}
								/>
							</View>
						) : (
							<View style={styles.datePicker}>
								<TouchableOpacity
									style={styles.datePickerButton}
									onPress={() => {
										setState({ ...state, starts_on: "" });
										setDateTimeVisibility({
											...isDateTimePickerVisible,
											start: true
										});
									}}
								>
									<Text style={styles.datePickerButtonText}>
										{state.starts_on.toISOString().split("T")[0]}
									</Text>
								</TouchableOpacity>
							</View>
						)}

						{!state.ends_on ? (
							<View style={styles.datePicker}>
								<TouchableOpacity
									style={styles.datePickerButton}
									onPress={() =>
										setDateTimeVisibility({
											...isDateTimePickerVisible,
											end: true
										})
									}
								>
									<Text style={styles.datePickerButtonText}>End date</Text>
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
									titleIOS={"Pick an end date"}
									isVisible={isDateTimePickerVisible.end}
									onConfirm={date => handleDatePicked(date, "endDate")}
									onCancel={() =>
										setDateTimeVisibility({
											...isDateTimePickerVisible,
											end: false
										})
									}
								/>
							</View>
						) : (
							<View style={styles.datePicker}>
								<TouchableOpacity
									style={styles.datePickerButton}
									onPress={() => {
										setState({ ...state, ends_on: "" });
										setDateTimeVisibility({
											...isDateTimePickerVisible,
											end: true
										});
									}}
								>
									<Text style={styles.datePickerButtonText}>
										{state.ends_on.toISOString().split("T")[0]}
									</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>

					{invited.length ? (
						<View style={styles.friendsList}>
							<Text
								style={[
									styles.inputTitle,
									{
										marginLeft: "35%",
										fontFamily: "Avenir-MediumOblique",
										paddingTop: "2%"
									}
								]}
							>
								{invited.length} Friends invited:
							</Text>
							<ScrollView showsVerticalScrollIndicator={true}>
								{invited.map((friend, i) => {
									return (
										<Text
											style={[
												styles.text,
												{ paddingLeft: "10%", paddingRight: "10%" }
											]}
											key={i}
										>
											{friend.first_name} {friend.last_name} (@{friend.username}
											)
										</Text>
									);
								})}
							</ScrollView>
						</View>
					) : (
						<View />
					)}

					{invited.length ? (
						<TouchableOpacity
							style={styles.button}
							onPress={() => setFriendVisibility(true)}
						>
							<Text style={styles.datePickerButtonText}>Edit Friends</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.button}
							onPress={() => setFriendVisibility(true)}
						>
							<Text style={styles.buttonText}>Invite Friends</Text>
						</TouchableOpacity>
					)}

					<TouchableOpacity
						style={[styles.button]}
						onPress={() => handleSubmit()}
					>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</View>

				<AddFriendsModal
					setInvited={setInvited}
					setFriendVisibility={setFriendVisibility}
					addFriendsVisible={addFriendsVisible}
					friends={props.user_friends}
				/>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 80,
		width: "95%"
	},
	text: {
		fontFamily: "Avenir"
	},
	title: {
		paddingLeft: 20
	},
	titleText: {
		fontFamily: "Avenir",
		fontSize: 24
	},
	inputTitle: {
		width: "100%",
		fontSize: 15
	},
	inputContainer: {
		paddingLeft: "5%",
		paddingRight: "5%",
		alignItems: "center"
	},
	textInput: {
		height: width / 10,
		borderColor: "#000",
		borderBottomWidth: 1,
		width: "100%"
	},
	button: {
		marginTop: "5%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "black",
		width: "100%",
		height: width / 9
	},
	buttonText: {
		color: "white",
		fontSize: 15
	},
	friendsList: {
		marginTop: "4%",
		backgroundColor: "#72AA98",
		width: "100%",
		height: "25%"
	},
	textInputContainer: {
		width: "100%",
		margin: 10
	},
	dateButton: {
		backgroundColor: "black",
		alignItems: "center",
		width: "100%",
		height: "100%",
		justifyContent: "center"
	},
	dateText: {
		fontFamily: "Avenir",
		fontSize: 15,
		color: "white"
	},
	datePickerContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 2,
		height: width / 9
	},
	datePickerButtonText: {
		fontSize: 15,
		fontFamily: "Avenir",
		color: "white"
	},
	datePickerButton: {
		flex: 1,
		backgroundColor: "black",
		width: width / 2.4,
		alignItems: "center",
		justifyContent: "center"
	}
});

function mapStateToProps(state) {
	const {
		selectedUser,
		gettingUserData,
		selectedTrip,
		gettingTripData
	} = state;

	const {
		isFetchingUser,
		user,
		user_trips,
		user_expenses,
		user_friends
	} = gettingUserData[selectedUser] || {
		isFetchingUser: true,
		user: {},
		user_trips: [],
		user_expenses: [],
		user_friends: []
	};

	const { tripUsers } = gettingTripData[selectedTrip] || {
		isFetchingTrip: true,
		tripUsers: []
	};

	return {
		selectedUser,
		isFetchingUser,
		user,
		user_trips,
		user_expenses,
		user_friends,
		selectedTrip,
		tripUsers
	};
}

export default connect(mapStateToProps)(NewTrip);
