import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions,
	TextInput,
	StyleSheet,
	ScrollView,
	AlertIOS
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

const width = Dimensions.get("screen").width;

export default function EventModal(props) {
	const { form, setForm, handleSubmit } = props;
	const [isDateTimePickerVisible, setDateTimeVisibility] = useState({
		start: false,
		end: false
	});

	const handleDatePicked = (date, mode) => {
		console.log(date);
		if (mode === "startDate") {
			setForm({ ...form, starts_on: date });
			setDateTimeVisibility({ ...isDateTimePickerVisible, start: false });
		} else {
			setForm({ ...form, ends_on: date });
			setDateTimeVisibility({ ...isDateTimePickerVisible, end: false });
		}
	};

	return (
		<View style={styles.mainContainer}>
			<Text style={[styles.title, styles.text]}>{props.title}</Text>
			<View style={styles.inputContainer}>
				<Text style={[styles.textTitles, styles.text]}>Name:</Text>
				<TextInput
					style={styles.textInput}
					value={form.name ? form.name : ""}
					onChangeText={text => setForm({ ...form, name: text })}
				/>
				<Text style={[styles.textTitles, styles.text]}>Address:</Text>
				<TextInput
					style={styles.textInput}
					value={form.address ? form.address : ""}
					onChangeText={text => setForm({ ...form, address: text })}
				/>

				<View style={styles.datePickerContainer}>
					{!form.starts_on ? (
						<View style={styles.datePicker}>
							<TouchableOpacity
								style={styles.datePickerButton}
								onPress={() =>
									setDateTimeVisibility({
										...isDateTimePickerVisible,
										start: true
									})
								}
							>
								<Text style={styles.datePickerButtonText}>Starts on</Text>
							</TouchableOpacity>
							<DateTimePicker
								customCancelButtonIOS={
									<View style={styles.dateButton}>
										<Text style={styles.dateText}>Cancel</Text>
									</View>
								}
								customConfirmButtonIOS={
									<View style={styles.dateButton}>
										<Text style={styles.dateText}>Confirm</Text>
									</View>
								}
								mode={"datetime"}
								datePickerContainerStyleIOS={{ borderRadius: 0 }}
								titleIOS={"Pick a start date"}
								isVisible={isDateTimePickerVisible.start}
								onConfirm={date => handleDatePicked(date, "startDate")}
								onCancel={() =>
									setDateTimeVisibility({
										...isDateTimePickerVisible,
										start: false
									})
								}
							/>
						</View>
					) : (
						<View style={styles.datePicker}>
							<TouchableOpacity
								style={styles.datePickerButton}
								onPress={() => {
									setForm({ ...form, starts_on: "" });
									setDateTimeVisibility({
										...isDateTimePickerVisible,
										start: true
									});
								}}
							>
								<Text style={styles.datePickerButtonText}>
									{form.starts_on.toISOString().split("T")[0]}
								</Text>
							</TouchableOpacity>
						</View>
					)}

					{!form.ends_on ? (
						<View style={styles.datePicker}>
							<TouchableOpacity
								style={styles.datePickerButton}
								onPress={() =>
									setDateTimeVisibility({
										...isDateTimePickerVisible,
										end: true
									})
								}
							>
								<Text style={styles.datePickerButtonText}>Ends on</Text>
							</TouchableOpacity>
							<DateTimePicker
								customCancelButtonIOS={
									<View style={styles.dateButton}>
										<Text style={styles.dateText}>Cancel</Text>
									</View>
								}
								customConfirmButtonIOS={
									<View style={styles.dateButton}>
										<Text style={styles.dateText}>Confirm</Text>
									</View>
								}
								mode={"datetime"}
								datePickerContainerStyleIOS={{ borderRadius: 0 }}
								titleIOS={"Pick a start date"}
								isVisible={isDateTimePickerVisible.start}
								onConfirm={date => handleDatePicked(date, "endDate")}
								onCancel={() =>
									setDateTimeVisibility({
										...isDateTimePickerVisible,
										start: false
									})
								}
							/>
						</View>
					) : (
						<View style={styles.datePicker}>
							<TouchableOpacity
								style={styles.datePickerButton}
								onPress={() => {
									setForm({ ...form, ends_on: "" });
									setDateTimeVisibility({
										...isDateTimePickerVisible,
										start: true
									});
								}}
							>
								<Text style={styles.datePickerButtonText}>
									{form.starts_on.toISOString().split("T")[0]}
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
				<Text style={[styles.textTitles, styles.text]}>Description:</Text>
				<TextInput
					style={styles.textInput}
					value={form.description ? form.description : ""}
					onChangeText={text => setForm({ ...form, description: text })}
				/>
			</View>
			<View style={styles.button}>
				<TouchableHighlight
					style={[styles.submit, styles.datePickerButtonText]}
				>
					<Text onPress={() => handleSubmit("event")}>
						{props.onDelete ? "Update" : "Submit"}
					</Text>
				</TouchableHighlight>
				{props.onDelete && (
					<TouchableHighlight
						style={[styles.button, styles.datePickerButtonText]}
						onPress={() => props.onDelete(form.id)}
					>
						<Text>Delete</Text>
					</TouchableHighlight>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: "90%",
		marginTop: "10%"
	},
	textTitles: {
		fontSize: 15,
		width: "100%",
		marginTop: "5%"
	},
	inputContainer: { width: "100%", flex: 2 },
	textInput: {
		width: "100%",
		height: 40,
		borderColor: "#000",
		borderBottomWidth: 1,
		marginBottom: "2%"
	},
	title: {
		fontSize: 24,
		paddingBottom: "10%"
	},
	submit: {
		width: "100%",
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "blue"
	},
	text: {
		fontFamily: "Avenir"
	},
	button: {
		alignItems: "center",
		flex: 0.5
	},
	dateButton: {
		backgroundColor: "black",
		alignItems: "center",
		width: "100%",
		justifyContent: "center"
	},
	dateText: {
		fontFamily: "Avenir",
		height: "100%",
		fontSize: 15,
		color: "white"
	},
	datePickerContainer: {
		width: "100%",
		height: "30%",
		justifyContent: "space-evenly",
		flexDirection: "column"
	},
	datePickerButtonText: {
		fontSize: 15,
		fontFamily: "Avenir",
		color: "white"
	},
	datePickerButton: {
		backgroundColor: "black",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		height: width / 10
	}
});
