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

export default function TripSettingsbtn({ friends, navigation }) {
	const [isVisible, setVisibility] = useState(false);
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
				friends={friends}
				isVisible={isVisible}
				setVisibility={setVisibility}
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
