import React, { useState } from "react";
import {
	Text,
	Alert,
	TextInput,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	View,
	AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { selectUser, fetchUserData } from "../../store/actions/userAction";
import KeyboardShift from "../../helpers/keyboard";
import BackBtn from "../Buttons/Backbtn";

function RegisterForm(props) {
	const [state, setState] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: ""
	});

	const login = async function(id) {
		await AsyncStorage.setItem("isLoggedIn", JSON.stringify(id));
		props.navigation.navigate("Dashboard");
	};

	const handleSubmit = () => {
		const request = new Request("https://plan-it-api-1.herokuapp.com/user", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ user: state })
		});

		fetch(request)
			.then(res => res.json())
			.then(data => {
				if (data.status === "error") {
					Alert.alert("There was an error with creating your account");
				} else {
					props.dispatch(selectUser(data.id));
					props.dispatch(fetchUserData(data.id));

					login(data.id);
				}
			})
			.catch(err =>
				Alert.alert(
					"There was an error with your signup, did you fill in all the input fields?"
				)
			);
	};

	return (
		<ImageBackground
			source={require("../../assets/plant1.jpg")}
			style={{ width: "100%", height: "100%" }}
		>
			<View
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					opacity: 0.5,
					backgroundColor: "#FFF"
				}}
			/>
			<BackBtn onPress={() => props.navigation.navigate("Welcome")} />
			<View style={styles.topContainer}>
				<Text style={styles.title}>Sign Up</Text>
			</View>
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<View style={styles.input}>
						<Text style={styles.text}>First Name:</Text>
						<TextInput
							autoCorrect={false}
							autoCapitalize={"none"}
							style={styles.textInput}
							onChangeText={text => setState({ ...state, first_name: text })}
						/>
					</View>
					<View style={styles.input}>
						<Text style={styles.text}>Last Name:</Text>
						<TextInput
							autoCorrect={false}
							autoCapitalize={"none"}
							style={styles.textInput}
							onChangeText={text => setState({ ...state, last_name: text })}
						/>
					</View>
					<View style={styles.input}>
						<Text style={styles.text}>Username:</Text>
						<TextInput
							autoCorrect={false}
							autoCapitalize={"none"}
							style={styles.textInput}
							onChangeText={text => setState({ ...state, username: text })}
						/>
					</View>
					<View style={styles.input}>
						<Text style={styles.text}>Email:</Text>
						<TextInput
							autoCorrect={false}
							autoCapitalize={"none"}
							style={styles.textInput}
							onChangeText={text => setState({ ...state, email: text })}
							keyboardType="email-address"
						/>
					</View>
					<View style={styles.input}>
						<Text style={styles.text}>Password:</Text>
						<TextInput
							autoCorrect={false}
							autoCapitalize={"none"}
							style={styles.textInput}
							onChangeText={text => setState({ ...state, password: text })}
							keyboardType="email-address"
						/>
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleSubmit()}
					>
						<Text style={styles.buttonText}>Sign up</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	topContainer: {
		flex: 0.5
	},
	title: {
		fontFamily: "Avenir",
		fontSize: 45,
		marginTop: "20%",
		marginLeft: "6%"
	},
	textInput: {
		height: "50%",
		borderColor: "#000",
		borderBottomWidth: 1,
		width: "100%",
		fontSize: 18,
		fontFamily: "Avenir"
	},
	button: {
		backgroundColor: "black",
		height: "5%",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: 40,
		marginTop: "10%"
	},
	buttonText: {
		color: "#FFFFFF",
		fontFamily: "Avenir",
		fontSize: 20
	},
	input: {
		flex: 0.5
	},
	inputContainer: {
		width: "90%",
		flex: 1,
		marginBottom: "20%"
	},
	text: {
		fontFamily: "Avenir-BookOblique",
		fontSize: 15
	}
});

export default connect()(RegisterForm);
