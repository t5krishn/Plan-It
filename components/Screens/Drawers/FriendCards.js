import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Alert
} from "react-native";

export default function FriendCard({ isFetching, items, onAccept, onDecline }) {
	const [isVisible, setVisibility] = useState(false);

	const onHandlePress = friend => {
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
		<View style={styles.container}>
			{items.map((friend, i) => (
				<View key={i} style={styles.friendContainer}>
					{!friend.is_accepted && friend.type === "followee" && (
						<Text style={{ color: "blue" }}>Friend Request Pending</Text>
					)}
					{!friend.is_accepted && friend.type === "follower" && (
						<Text style={styles.newRequestText}>New Friend Request!</Text>
					)}
					<View
						style={[
							styles.friendCard,
							friend.is_accepted ? { height: 90 } : { height: 120 }
						]}
					>
						<View style={styles.upperContainer}>
							<Image
								source={{
									uri:
										friend.profile_picture ||
										`https://api.adorable.io/avatars/111/${friend.id}`
								}}
								style={{ width: 80, height: 80, flex: 1 }}
							/>
							<View style={styles.friendText}>
								<Text style={[styles.friendInfoText, styles.name]}>
									{friend.first_name} {friend.last_name}
								</Text>
								<Text style={[styles.friendInfoText, styles.username]}>
									@{friend.username}
								</Text>
							</View>
						</View>

						{!friend.is_accepted && (
							<View style={styles.bottomContainer}>
								{/**friend.is_accepted show either accept or decline */}
								{!friend.is_accepted && friend.type === "follower" && (
									<View style={styles.friendRequestContainer}>
										<TouchableOpacity
											style={styles.buttomContainerbutton}
											onPress={() => {
												onAccept(friend.friend_id);
											}}
										>
											<Text style={styles.buttomText}>Confirm</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={[styles.buttomContainerbutton, styles.decline]}
											onPress={() => {
												onDecline(friend.friend_id);
											}}
										>
											<Text style={styles.buttomText}>Decline</Text>
										</TouchableOpacity>
									</View>
								)}
								{!friend.is_accepted && friend.type === "followee" && (
									<View style={styles.friendRequestContainer}>
										<TouchableOpacity
											style={[
												styles.buttomContainerbutton,
												{ backgroundColor: "blue" }
											]}
											onPress={() => onHandlePress(friend)}
										>
											<Text style={styles.buttomText}>
												Delete Friend Request
											</Text>
										</TouchableOpacity>
									</View>
								)}
							</View>
						)}
					</View>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: 120
	},
	friendContainer: { padding: "2%", alignItems: "center" },
	upperContainer: {
		flexDirection: "row",
		flex: 3
	},
	bottomContainer: {
		flexDirection: "row",
		flex: 1,
		backgroundColor: "green"
	},
	buttomContainerbutton: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	buttomText: {
		fontFamily: "Avenir",
		fontSize: 16,
		color: "white"
	},
	decline: { backgroundColor: "red" },
	friendCard: {
		flexDirection: "column",
		backgroundColor: "white",
		width: 350,
		padding: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84
	},
	friendInfo: {
		overflow: "hidden"
	},
	friendText: {
		flex: 3,
		padding: 10,
		flexDirection: "column",
		height: 80
	},
	friendInfoText: {
		fontFamily: "Avenir-Light",
		flexWrap: "wrap"
	},
	name: {
		fontSize: 20
	},
	username: {
		fontSize: 15
	},
	email: {
		fontSize: 15
	},
	friendRequestContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	newRequestText: {
		color: "red",
		fontFamily: "Avenir-Medium",
		fontSize: 15,
		paddingLeft: 10
	},
	friendDelete: {
		// flex: 1,
		// padding: 10,
		// backgroundImage: linear-gradient(to top, #ff0844 0%, #ffb199 100%),
		// justifyContent: "center",
		// alignItems: "center",
		// borderRadius: 10,
		// shadowColor: "black",
		// shadowRadius: 5
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
