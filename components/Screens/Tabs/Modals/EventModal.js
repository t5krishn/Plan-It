import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	TextInput,
	StyleSheet,
	ScrollView,
	AlertIOS
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import getCurrentTrip from "../../../../helpers/dateCovertFormat";
import { stringify } from "qs";
const width = Dimensions.get("screen").width;

export default function EventModal(props) {
	const { form, setForm, handleSubmit } = props;
	const [isDateTimePickerVisible, setDateTimeVisibility] = useState({
		start: false,
		end: false
	});

	const formatDate = date => {
		return new Date(date)
			.toLocaleDateString("en-GB", {
				day: "numeric",
				month: "short",
				year: "numeric"
			})
			.replace(/ /g, ", ");
	};

	const formatTime = date => {
		return (
			new Date(date).getHours() +
			":" +
			(new Date(date).getMinutes().length !== 1
				? new Date(date).getMinutes()
				: "0" + new Date(date).getMinutes())
		);
	};

	const handleDatePicked = (date, mode) => {
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
								is24Hour={true}
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
									Starts: {formatDate(form.starts_on)} at{" "}
									{formatTime(form.starts_on)}
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
								is24Hour={true}
								mode={"datetime"}
								datePickerContainerStyleIOS={{ borderRadius: 0 }}
								titleIOS={"Pick a start date"}
								isVisible={isDateTimePickerVisible.end}
								onConfirm={date => handleDatePicked(date, "endDate")}
								onCancel={() =>
									setDateTimeVisibility({
										...isDateTimePickerVisible,
										end: false
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
										end: true
									});
								}}
							>
								<Text style={styles.datePickerButtonText}>
									Ends: {formatDate(form.ends_on)} at {formatTime(form.ends_on)}
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
				<TouchableOpacity style={[styles.submit, styles.datePickerButtonText]}>
					<Text
						onPress={() => handleSubmit("event")}
						style={styles.datePickerButtonText}
					>
						{props.onDelete ? "Update" : "Submit"}
					</Text>
				</TouchableOpacity>
				{props.onDelete && (
					<TouchableOpacity
						style={styles.button}
						onPress={() => props.onDelete(form.id)}
					>
						<Text style={styles.datePickerButtonText}>Delete</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: "90%",
		marginTop: "10%",
		alignContent: "center",
		justifyContent: "center"
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
		height: width / 8,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "black"
	},
	text: {
		fontFamily: "Avenir"
	},
	button: {
		alignItems: "center",
		flex: 0.5,
		justifyContent: "center"
	},
	dateButton: {
		backgroundColor: "black",
		alignItems: "center",
		width: "100%",
		height: "100%",
		justifyContent: "center"
	},
	dateText: {
		fontFamily: "Avenir",
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
		height: width / 8
	},
	datePicker: {
		alignItems: "center",
		justifyContent: "center"
	}
});
