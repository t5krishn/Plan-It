import React, { useState, useEffect } from "react";
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
import { setRecoveryProps } from "expo/build/ErrorRecovery/ErrorRecovery";

/*
  Depending on the mode (EVENT/ TODO/ EXPENSE) the form is different:
    - Event form : 
    { 
      name, 
      address, 
      starts_on, 
      ends_on, 
      description, 
      trip_id  
          }
*/

export default function AddModal(props) {
	const mode = props.mode;
	const [form, setFrom] = useState({});

	const handleSubmit = () => {
		const request = new Request(
			`http://localhost:3000/user/${props.selectedUser}/trip`,
			{
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({ trip: state })
			}
		);

		fetch(request)
			.then(response => response.json())
			.then(data => {
				if (data.status === "ok") {
					props.dispatch(addNewUserTrip(data.trip, props.selectedUser));
					props.navigation.navigate("Dashboard");
				} else {
					Alert.alert("There was an issue with saving your trip");
				}
			});
	};

	return (
		<View
			style={{
				marginTop: 22,
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<Modal animationType="fade" transparent={true} visible={props.isVisible}>
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
							props.setVisibility(false);
						}}
					>
						<Icon name="close" size={30} />
					</TouchableHighlight>

					{mode === "EVENT" && (
						<View style={styles.event}>
							<TextInput
								value={form.firstName}
								onChangeText={text => setForm({ ...form, name: text })}
							/>
						</View>
					)}

					{mode === "TODO" && (
						<View style={styles.event}>
							<TextInput
								value={form.firstName}
								onChangeText={text => setForm({ ...form, name: text })}
							/>
						</View>
					)}

					{mode === "EXPENSE" && (
						<View style={styles.event}>
							<TextInput
								value={form.firstName}
								onChangeText={text => setForm({ ...form, name: text })}
							/>
						</View>
					)}
				</View>
			</Modal>
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
