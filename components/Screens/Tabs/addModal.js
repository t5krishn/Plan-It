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
import {
	postNewEvent,
	postNewTodo,
	postNewExpense
} from "../../../store/actions/tripActions";
import { connect } from "react-redux";

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

function AddModal(props) {
	const [form, setForm] = useState({
		trip_id: props.tripId
	});

	const handleSubmit = () => {
		props.setVisibility(false);
		switch (props.mode) {
			case "event":
				props.dispatch(postNewEvent(form, props.userId, props.tripId));
				break;
			case "to_do":
				props.dispatch(
					postNewTodo({ ...form, completed: false }, props.userId, props.tripId)
				);
				break;
			case "expense":
				props.dispatch(postNewExpense(form, props.userId, props.tripId));
				break;
		}
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
							<TouchableHighlight style={styles.submit}>
								<Text onPress={() => handleSubmit()}>Submit</Text>
							</TouchableHighlight>
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
							<TouchableHighlight style={styles.submit}>
								<Text onPress={() => handleSubmit()}>Submit</Text>
							</TouchableHighlight>
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
							<TouchableHighlight style={styles.submit}>
								<Text onPress={() => handleSubmit()}>Submit</Text>
							</TouchableHighlight>
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
	},
	submit: {
		marginTop: 10,
		borderWidth: 2,
		borderColor: "black"
	}
});

export default connect()(AddModal);
