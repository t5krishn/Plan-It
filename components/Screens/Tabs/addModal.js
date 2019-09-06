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
  Depending on the mode (event/ to_do/ expense) the form is different:
    - Event form : 
    { 
      name, 
      address, 
      starts_on, 
      ends_on, 
      description, 
      trip_id  
          }
    - Todo form : 
    { 
      content,
      boolean,
      trip_id  
          }
    - Expense form : 
    { 
      name, 
      amount_in_cents,
      expense_date, 
      trip_id 
          }
*/

export default function AddModal(props) {
	const [form, setForm] = useState({});

	const handleSubmit = () => {
		const request = new Request(
			`http://localhost:3000/user/${props.selectedUser}/trip/${
				props.tripId
			}/${mode}`,
			{
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({ form })
			}
		);

		fetch(request)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				// if (data.status === "ok") {
				// 	props.dispatch(addNewUserTrip(data.trip, props.selectedUser));
				// 	props.navigation.navigate("Dashboard");
				// } else {
				// 	Alert.alert("There was an issue with saving your trip");
				// }
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
					{props.mode === "event" && (
						<View style={styles.event}>
							<Text style={styles.title}>Create a new event</Text>
							<Text>Name:</Text>
							<TextInput
								style={styles.textInput}
								value={form.name}
								onChangeText={text => setForm({ ...form, name: text })}
							/>
							<Text>Address:</Text>
							<TextInput
								style={styles.textInput}
								value={form.address}
								onChangeText={text => setForm({ ...form, address: text })}
							/>
							<Text>Starts on:</Text>
							<TextInput
								style={styles.textInput}
								value={form.starts_on}
								onChangeText={text => setForm({ ...form, starts_on: text })}
							/>
							<Text>Ends on:</Text>
							<TextInput
								style={styles.textInput}
								value={form.ends_on}
								onChangeText={text => setForm({ ...form, ends_on: text })}
							/>
							<Text>Description:</Text>
							<TextInput
								style={styles.textInput}
								value={form.description}
								onChangeText={text => setForm({ ...form, description: text })}
							/>
						</View>
					)}
					{props.mode === "to_do" && (
						<View style={styles.todo}>
							<Text style={styles.title}>Create a new to do item</Text>
							<TextInput
								style={styles.textInput}
								value={form.content}
								onChangeText={text => setForm({ ...form, content: text })}
							/>
						</View>
					)}
					{props.mode === "expense" && (
						<View style={styles.expense}>
							<Text style={styles.title}>Create a new expense</Text>
							<Text>Name:</Text>
							<TextInput
								style={styles.textInput}
								value={form.name}
								onChangeText={text => setForm({ ...form, name: text })}
							/>
							<Text>Amount:</Text>
							<TextInput
								style={styles.textInput}
								value={form.amount_in_cents}
								onChangeText={text =>
									setForm({ ...form, amount_in_cents: text })
								}
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
	},
	textInput: {
		width: 200,
		height: 40,
		borderColor: "#000",
		borderWidth: 1
	},
	title: {
		fontSize: 20
	}
});
