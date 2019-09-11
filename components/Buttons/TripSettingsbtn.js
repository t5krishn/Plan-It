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
import { deleteTrip, updateTrip } from "../../store/actions/userAction";

const width = Dimensions.get("screen").width;

function TripSettingsbtn({
	tripUsers,
	navigation,
	user,
	trip,
	dispatch,
	friends
}) {
	const [isVisible, setVisibility] = useState(false);

	const handleDeleteTrip = () => {
		navigation.navigate("Dashboard");
		dispatch(deleteTrip(user, trip.id));
	};
	// updateInfo => {
	//            name,
	//            location,
	//            starts_on,
	//            ends_on,
	//            description,
	//            added:[user_ids],
	//            removed:[user_ids] }
	const handleSubmitTrip = updateInfo =>
		dispatch(updateTrip(user, trip.id, updateInfo));

	return (
		<View
			style={{
				zIndex: 9,
				padding: 2,
				position: "absolute",
				right: "5%",
				top: "5%"
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
		padding: 3
	}
});

export default connect()(TripSettingsbtn);
