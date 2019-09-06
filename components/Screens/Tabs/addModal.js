import React, { useState } from "react";
import {
	Modal,
	View,
	Text,
	TouchableHighlight,
	Dimensions,
	TextInput,
	StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function AddModal() {
	const [modalState, setModalState] = useState({ modalVisible: false });

	return (
		<View
			style={{
				marginTop: 22,
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalState.modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
				}}
			>
				<View
					style={{
						position: "absolute",
						width: Dimensions.get("screen").width,
						height: Dimensions.get("screen").height,
						backgroundColor: "rgba(0,0,0,0.5)",
						alignItems: "center",
						justifyContent: "center",
						opacity: 0.5
					}}
				/>
				<View
					style={{
						borderRadius: 20,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 5
						},
						shadowOpacity: 0.5,
						shadowRadius: 6.27,
						marginTop: 80,
						zIndex: 9,
						position: "absolute",
						left: 25,
						backgroundColor: "green",
						width: Dimensions.get("screen").width - 50,
						height: Dimensions.get("screen").height - 200,
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<TouchableHighlight
						style={styles.close}
						onPress={() => {
							setModalState({ modalVisible: false });
						}}
					>
						<Icon name="close" size={30} />
					</TouchableHighlight>
				</View>
			</Modal>

			<TouchableHighlight
				onPress={() => {
					setModalState({ modalVisible: true });
				}}
			>
				<Text>Show Modal</Text>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	close: {
		position: "absolute",
		right: 20,
		top: 20
	}
});
