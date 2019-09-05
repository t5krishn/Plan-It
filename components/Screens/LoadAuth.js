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

function LoadAuthScreen(props) {
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

export default connect()(LoadAuthScreen);
