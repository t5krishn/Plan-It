import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	ImageBackground
} from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import FriendCards from "./FriendCards";

import { connect } from "react-redux";
import { acceptInvite, declineInvite } from "../../../store/actions/userAction";

function FriendsScreen(props) {
	const onAccept = friendId => {
		props.dispatch(acceptInvite(props.selectedUser, friendId));
	};
	const onDecline = friendId => {
		props.dispatch(declineInvite(props.selectedUser, friendId));
	};

	return (
		<ImageBackground
			source={require("../../../assets/plant1.jpg")}
			style={{ width: "100%", height: "100%" }}
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
			<View style={styles.container}>
				<MenuBtn navigation={props.navigation} />
				<View style={styles.innerContainer}>
					<Text style={styles.title}>Friends</Text>
					<TouchableOpacity
						onPress={() => props.navigation.navigate("FindFriend")}
						style={styles.findFriendBtn}
					>
						<Text style={styles.findFriendBtnTxt}>Find friends</Text>
					</TouchableOpacity>
				</View>
				<ScrollView contentContainerStyle={styles.friendsList}>
					<FriendCards
						items={props.user_friends}
						selectedUser={props.selectedUser}
						onAccept={onAccept}
						onDecline={onDecline}
						isFetching={props.isFetchingUser}
					/>
				</ScrollView>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		height: Dimensions.get("screen").height
	},
	innerContainer: {
		marginTop: 100,
		width: "85%",
		alignItems: "center"
	},
	friendsListContainer: {
		flex: 4,
		width: "100%",
		alignItems: "center"
	},
	title: {
		fontFamily: "Avenir-Light",
		fontSize: 25,
		textAlign: "center"
		// marginTop: "10%"
	},
	findFriendBtn: {
		backgroundColor: "black",
		width: "100%",
		height: 40,
		justifyContent: "center",
		alignItems: "center"
	},
	findFriendBtnTxt: {
		color: "#FFFFFF",
		fontFamily: "Avenir",
		fontSize: 15
	},
	friendsList: {
		height: "95%",
		width: "100%"
	}
});

function mapStateToProps(state) {
	const { selectedUser, gettingUserData } = state;
	const { isFetchingUser, user_friends } = gettingUserData[selectedUser] || {
		isFetchingUser: true,
		user_friends: []
	};

	return {
		selectedUser,
		isFetchingUser,
		user_friends
	};
}

export default connect(mapStateToProps)(FriendsScreen);
