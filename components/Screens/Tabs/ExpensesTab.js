import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";

export default function ExpensesTab({ navigation }) {
	return (
		<View style={styles.container}>
			<MenuBtn navigation={navigation} />
			<Text>TabExpensesScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});
