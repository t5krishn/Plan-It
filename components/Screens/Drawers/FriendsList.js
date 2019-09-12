import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ScrollView
} from "react-native";
import FriendCard from "./FriendCards";
export default function FriendsList({
	items,
	onAccept,
	onDecline,
	selectedUser
}) {
	return (
		<View>
			{items.map((e, i) => (
				<FriendCard
					key={i}
					friend={e}
					onAccept={onAccept}
					onDecline={onDecline}
				/>
			))}
		</View>
	);
}
