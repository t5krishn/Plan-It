import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

export default function FriendsCards({ items, onAccept, onDecline }) {
	return (
		<View style={styles.friendContainer}>
			{items.map((e, i) => (
				<Card key={i} wrapperStyle={styles.friendCard}>
					<View style={styles.friendInfo}>
						{!e.is_accepted && e.type === "follower" && (
							<Text style={{ fontWeight: "bold" }}>New Friend Request!</Text>
						)}
						<Text>{e.first_name + " " + e.last_name}</Text>
						<Text>{e.username}</Text>
						<Text>{e.email}</Text>
					</View>
					{!e.is_accepted && e.type === "follower" && (
						<View style={styles.friendRequestContainer}>
							<TouchableOpacity
								onPress={() => {
									onAccept(e.friend_id);
								}}
							>
								<Image
									style={styles.friendRequestButtons}
									source={require("../../../assets/accept.png")}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									onDecline(e.friend_id);
								}}
							>
								<Image
									style={styles.friendRequestButtons}
									source={require("../../../assets/cancel.png")}
								/>
							</TouchableOpacity>
						</View>
					)}
					{!e.is_accepted && e.type === "followee" && (
						<View style={styles.friendRequestContainer}>
							<Text>Friend Request Pending</Text>
						</View>
					)}
				</Card>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	friendContainer: {
		flex: 1,
		width: "100%"
	},
	friendCard: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between"
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
	friendRequestButtons: {
		width: 50,
		height: 50
	}
});
