import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Alert
} from "react-native";

export default function FriendCard({ friend, onAccept, onDecline }) {
	const [isVisible, setVisibility] = useState(false);

	const onHandlePress = () => {
		onDecline(friend.friend_id);
		Alert.alert(
			"Confirm",
			`Are you sure you want to remove ${friend.first_name} ${
				friend.last_name
			} from your friends?`,
			[
				{ text: "Cancel", onPress: () => {}, style: "cancel" },
				{
					text: "OK",
					// onDecline is used again here to remove a friend, deletes friend record
					onPress: () => {
						onDecline(friend.friend_id);
					}
				}
			],
			{ cancelable: false }
		);
	};

	return (
		<TouchableOpacity
			style={styles.friendCard}
			disabled={!friend.is_accepted}
			onPress={() => {
				setVisibility(!isVisible);
			}}
		>
			<View style={styles.friendInfo}>
				{!friend.is_accepted && friend.type === "follower" && (
					<Text style={{ fontWeight: "bold" }}>New Friend Request!</Text>
				)}
				<Text>{friend.first_name + " " + friend.last_name}HI</Text>
				<Text>{friend.username}</Text>
				<Text>{friend.email}</Text>
			</View>
			{!friend.is_accepted && friend.type === "follower" && (
				<View style={styles.friendRequestContainer}>
					<TouchableOpacity
						onPress={() => {
							onAccept(friend.friend_id);
						}}
					>
						<Image
							style={styles.friendRequestButtons}
							source={require("../../../assets/accept.png")}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							onDecline(friend.friend_id);
						}}
					>
						<Image
							style={styles.friendRequestButtons}
							source={require("../../../assets/cancel.png")}
						/>
					</TouchableOpacity>
				</View>
			)}
			{!friend.is_accepted && friend.type === "followee" && (
				<View style={styles.friendRequestContainer}>
					<Text>Friend Request Pending</Text>
				</View>
			)}
			{isVisible && (
				<TouchableOpacity style={styles.friendDelete} onPress={onHandlePress}>
					<Text style={styles.friendDeleteText}>Remove friend</Text>
				</TouchableOpacity>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	friendCard: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		margin: 10,
		padding: 10,
		borderColor: "black",
		borderWidth: 1,
		height: 200,
		backgroundColor: "yellow"
	},
	friendInfo: {
		flex: 1
	},
	friendRequestContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	},
	friendDelete: {
		flex: 1,
		padding: 10,
		// backgroundImage: linear-gradient(to top, #ff0844 0%, #ffb199 100%),
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		shadowColor: "black",
		shadowRadius: 5
	},
	friendDeleteText: {
		color: "white",
		fontWeight: "bold",
		textShadowColor: "black",
		textShadowRadius: 2
	},
	friendRequestButtons: {
		width: 50,
		height: 50
	}
});
