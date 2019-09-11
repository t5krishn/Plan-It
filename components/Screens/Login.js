import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	AsyncStorage,
	Image,
	ImageBackground
} from "react-native";
import Backbtn from "../Buttons/Backbtn";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { selectUser, fetchUserData } from "../../store/actions/userAction";

function LoginScreen(props) {
	const [state, setState] = useState({ email: "", password: "" });

	const login = async id => {
		await AsyncStorage.setItem("isLoggedIn", JSON.stringify(id));
		props.navigation.navigate("Dashboard");
	};

	const handleSubmit = () => {
		const request = new Request("https://plan-it-api-1.herokuapp.com/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ ...state })
		});

		fetch(request)
			.then(res => res.json())
			.then(data => {
				if (data.status === "error") {
					Alert.alert("Your password or username is incorrect");
				} else {
					props.dispatch(selectUser(data.id));
					props.dispatch(fetchUserData(data.id));

					login(data.id);
				}
			})
			.catch(err =>
				Alert.alert("There was an error in your login request: ", err)
			);
	};

	return (
		<ImageBackground
			source={require("../../assets/plant1.jpg")}
			style={{
				width: "100%",
				height: "100%",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<View
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					opacity: 0.5,
					backgroundColor: "#FFF"
				}}
			/>
			<View style={styles.container}>
				<Backbtn onPress={() => props.navigation.navigate("Welcome")} />
				<Text style={styles.title}>Sign In</Text>
				<View style={{ flex: 1 }} />
				<View style={styles.inputContainer}>
					<View style={styles.input}>
						<Icon
							name="envelope"
							size={26}
							color={"#000"}
							style={styles.icon}
						/>
						<TextInput
							autoCapitalize="none"
							style={styles.TextInput}
							onChangeText={text => setState({ ...state, email: text })}
							placeholder={"Email"}
						/>
					</View>
					<View style={styles.input}>
						<Icon
							name="lock"
							size={32}
							color={"#000"}
							style={[styles.icon, { paddingLeft: 14 }]}
						/>
						<TextInput
							autoCapitalize="none"
							style={styles.TextInput}
							onChangeText={text => setState({ ...state, password: text })}
							placeholder={"Password"}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={() => handleSubmit()}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Login</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								width: "95%",
								flexDirection: "row"
							}}
							onPress={() => props.navigation.navigate("Signup")}
						>
							<Text style={styles.text}>Don't have an account? </Text>
							<Text style={[styles.text, styles.signup]}>Signup</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		width: "100%",
		height: "100%"
	},
	title: {
		fontFamily: "Avenir",
		fontSize: 45,
		marginTop: 90,
		marginRight: 200,
		marginBottom: 50
	},
	inputContainer: {
		width: "90%",
		flex: 1
	},
	TextInput: {
		borderColor: "#000",
		borderBottomWidth: 1,
		height: 40,
		width: "80%",
		fontSize: 18,
		fontFamily: "Avenir",
		color: "#000"
	},
	input: { flexDirection: "row", flex: 0.3 },
	buttonContainer: {
		marginTop: 50,
		flex: 1,
		alignItems: "center"
	},
	icon: { padding: 10 },
	button: {
		backgroundColor: "#000",
		height: 40,
		width: "95%%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10
	},
	buttonText: {
		color: "#FFFFFF",
		fontFamily: "Avenir",
		fontSize: 20
	},
	text: {
		color: "#000",
		fontFamily: "Avenir",
		fontSize: 15
	},
	signup: { color: "blue", fontWeight: "bold" }
});

// function mapStateToProps(state) {
// 	const { selectedUser, gettingUserData } = state;
// 	const {
// 		isFetchingUser,
// 		user,
// 		user_trips,
// 		user_expenses,
// 		user_friends
// 	} = gettingUserData[selectedUser] || {
// 		isFetchingUser: true,
// 		user: {},
// 		user_trips: [],
// 		user_expenses: [],
// 		user_friends: []
// 	};

// 	return {
// 		selectedUser,
// 		isFetchingUser,
// 		user,
// 		user_trips,
// 		user_expenses,
// 		user_friends
// 	};
// }

export default connect()(LoginScreen);
