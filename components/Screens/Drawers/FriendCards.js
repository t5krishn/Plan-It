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
				<View key={i}>
					{!friend.is_accepted && friend.type === "follower" && (
						<Text style={styles.newRequestText}>New Friend Request!</Text>
					)}
					<View style={styles.friendCard}>
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
								<Text style={[styles.friendInfoTex, styles.email]}>
									{friend.email}
								</Text>
							</View>
						</View>
						{/* {!friend.is_accepted && friend.type === "follower" && (
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

       
          <TouchableOpacity
            style={styles.friendDelete}
            onPress={()=> onHandlePress(friend)}
          >
            <Text style={styles.friendDeleteText}>Remove friend</Text>
          </TouchableOpacity> */}
					</View>

					<View style={styles.bottomContainer}>
						<Text>Hello</Text>
					</View>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// marginTop: "2%"
	},
	upperContainer: {
		flexDirection: "row",
		flex: 3
		// height:
	},
	bottomContainer: {
		flexDirection: "row",
		flex: 1
	},
	friendCard: {
		flex: 4,
		flexDirection: "column",
		backgroundColor: "white",
		width: 330,
		height: 100,
		margin: 10,
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
		flex: 1,
		overflow: "hidden",
		backgroundColor: "yellow"
	},
	friendText: {
		flex: 3,
		padding: 10,
		flexDirection: "column",
		backgroundColor: "blue"
	},
	friendInfoText: {
		fontFamily: "Avenir-Light",
		flexWrap: "wrap"
	},
	name: {
		fontSize: 25
	},
	username: {
		fontSize: 18
	},
	email: {
		fontSize: 18
	},
	friendRequestContainer: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center"
	},
	newRequestText: {
		color: "red",
		fontFamily: "Avenir-Medium",
		fontSize: 15,
		fontWeight: "bold",
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
