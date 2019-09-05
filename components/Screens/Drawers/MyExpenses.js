import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import AddBtn from "../../Buttons/Addbtn";

export default function MyExpensesScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<MenuBtn navigation={navigation} />
			<Text>ExpensesScreen</Text>
			<AddBtn />
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
