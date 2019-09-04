import React from "react";
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";

export default function SettingsScreen({ navigation }) {
	const handleSubmit = async () => {
		await AsyncStorage.clear();
		navigation.navigate("Login");
	};

	return (
		<View style={styles.container}>
			<MenuBtn navigation={navigation} />
			<Text>SettingsScreen</Text>
			<Button title="Logout" onPress={() => handleSubmit()} />
		</View>
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
