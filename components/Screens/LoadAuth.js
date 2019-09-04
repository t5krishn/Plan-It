import React, { useState } from "react";
import {
	View,
	ActivityIndicator,
	StyleSheet,
	Alert,
	AsyncStorage
} from "react-native";
import MenuBtn from "../Buttons/Menubtn";

export default function LoginScreen({ navigation }) {
	const loadData = async () => {
		const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
		navigation.navigate(isLoggedIn ? "Dashboard" : "Login");
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
