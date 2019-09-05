import React, { useState } from "react";
import {
	View,
	ActivityIndicator,
	StyleSheet,
	Alert,
	AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { selectUser, fetchUserData } from "../../store/actions/userAction";

function LoginScreen(props) {
	const loadData = async () => {
		const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
		if (isLoggedIn) {
			props.dispatch(selectUser(isLoggedIn));
			props.dispatch(fetchUserData(isLoggedIn));
			props.navigation.navigate("Dashboard");
		} else {
			props.navigation.navigate("Login");
		}
	};

	loadData();

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="black" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "gray"
	}
});

function mapStateToProps(state) {
	const { selectedUser, gettingUserData } = state;
	const {
		isFetchingUser,
		user,
		user_trips,
		user_expenses,
		user_friends
	} = gettingUserData[selectedUser] || {
		isFetchingUser: true,
		user: {},
		user_trips: [],
		user_expenses: [],
		user_friends: []
	};

	return {
		selectedUser,
		isFetchingUser,
		user,
		user_trips,
		user_expenses,
		user_friends
	};
}

export default connect(mapStateToProps)(LoginScreen);
