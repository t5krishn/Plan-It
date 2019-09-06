import React from "react";
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";

import { connect } from "react-redux";
import { resetStore } from "../../../store/actions/resetStoreAction";

function SettingsScreen(props) {
	const handleSubmit = async () => {
		await AsyncStorage.clear();
		props.dispatch(resetStore());
		props.navigation.navigate("Login");
	};

	return (
		// <View style={styles.container}>
		// 	<MenuBtn navigation={props.navigation} />
		// 	<Text>SettingsScreen</Text>
		// 	<Button title="Logout" onPress={() => handleSubmit()} />
		// </View>
		<View style={styles.container} />
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	TextInput: {
		borderColor: "black",
		borderWidth: 1,
		width: 100
	}
});

export default connect()(SettingsScreen);
