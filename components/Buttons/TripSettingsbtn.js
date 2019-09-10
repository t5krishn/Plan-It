import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
	Modal,
	View,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions,
	TextInput,
	StyleSheet
} from "react-native";
import TripSettingsModal from "../Screens/Tabs/TripSettingsModal";
import { connect } from "react-redux";
import { deleteTrip, updateTrip } from "../../store/actions/userAction"

function TripSettingsbtn({ tripUsers, navigation, user, trip, dispatch, friends }) {
	const [isVisible, setVisibility] = useState(false);

	const handleDeleteTrip = () => {
		navigation.navigate("Dashboard");
		dispatch(deleteTrip(user, trip.id));
	}
	// updateInfo => { 
	//            name,
	//            location,
	//            starts_on,
	//            ends_on,
	//            description,
	//            added:[user_ids],
	//            removed:[user_ids] }
	const handleSubmitTrip = updateInfo => dispatch(updateTrip(user, trip.id, updateInfo));

	return (
		<View
			style={{
				height: 40,
				width: 30,
				position: "absolute",
				zIndex: 900,
				right: 30,
				top: 43
			}}
		>
			<Ionicons
				name="md-settings"
				style={styles.settingsBtn}
				color="#000000"
				size={32}
				onPress={() => {
					setVisibility(true);
				}}
			/>
			<TripSettingsModal
				tripUsers={tripUsers}
				friends={friends}
				isVisible={isVisible}
				setVisibility={setVisibility}
				user={user}
				trip={trip}
				onDelete={handleDeleteTrip}
				onSubmit={handleSubmitTrip}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	menubtn: {
		zIndex: 9,
		padding: 2
	}
});

export default connect()(TripSettingsbtn)
