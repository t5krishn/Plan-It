import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

export default function EventCards({ items, onChecked, onPress }) {
	return items.length > 0 ? (
		<View style={styles.containerStyle}>
			{items.map((e, i) => {
				return (
					<CheckBox
						checkedIcon="dot-circle-o"
						uncheckedIcon="circle-o"
						textStyle={{
							fontFamily: "Avenir-Light",
							fontSize: 16,
							color: "black"
						}}
						key={e.id}
						title={e.content}
						checked={e.completed}
						onIconPress={() => {
							onChecked(e);
						}}
						onPress={() => onPress(e)}
						containerStyle={{
							borderRadius: 0,
							backgroundColor: "white",
							width: "90%",
							height: 45,
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 2
							},
							shadowOpacity: 0.25,
							shadowRadius: 3.84
						}}
					/>
				);
			})}
		</View>
	) : (
		<View style={{ alignItems: "center" }}>
			<Text>You have no to do items!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		alignItems: "center",
		width: "100%"
	}
});
