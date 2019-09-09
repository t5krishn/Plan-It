import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Dimensions
} from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import FriendsList from "./FriendsList";

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
		<View style={styles.container}>
			<MenuBtn navigation={props.navigation} />
			<View style={styles.container}>
				<Text>FriendsScreen</Text>
				<TouchableOpacity
					onPress={() => props.navigation.navigate("FindFriend")}
				>
					<Text>Find friends</Text>
				</TouchableOpacity>
			</View>
			<View style={{ backgroundColor: "blue" }}>
				<FriendsList
					items={props.user_friends}
					selectedUser={props.selectedUser}
					onAccept={onAccept}
					onDecline={onDecline}
					isFetching={props.isFetchingUser}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "purple",
		height: Dimensions.get("screen").height,
		paddingTop: 40
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
