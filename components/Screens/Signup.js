import React, { useState, useEffect } from "react";
import {
	Text,
	Alert,
	TextInput,
	StyleSheet,
	KeyboardAvoidingView,
	Button,
	Image,
	ImageBackground,
	TouchableOpacity,
	View,
	AsyncStorage
} from "react-native";
import getPermissionAsync from "../../helpers/getPermissions";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";

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
		password: "",
		profile_picture: ""
	});

	const [isUploading, setIsUploading] = useState(false);

	useEffect(() => {
		console.log(state);
	}, [state]);
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

	const uploadImage = async (uri, imageName) => {
		const response = await fetch(uri);
		const blob = await response.blob();

		let ref = firebase
			.storage()
			.ref()
			.child(`test/${imageName}`);
		return ref.put(blob);
	};

	const randStr = () =>
		Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.substr(0, 5);

	const handlePress = async () => {
		getPermissionAsync();
		let result = await ImagePicker.launchImageLibraryAsync();

		if (!result.cancelled) {
			setIsUploading(true);
			uploadImage(result.uri, state.username || randStr())
				.then(response => {
					response.ref.getDownloadURL().then(downloadURL => {
						setState({ ...state, profile_picture: downloadURL });
						setIsUploading(false);
					});
				})
				.catch(error => {
					Alert.alert("There was an error with uploading your profile picture");
				});
		}
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
					<TouchableOpacity style={styles.profilePicBtn} onPress={handlePress}>
						<Text style={styles.profilePicBtnText}>
							Select a profile picture from your device
						</Text>
					</TouchableOpacity>
					{isUploading && <Text>Uploading your image, please wait...</Text>}
					{state.profile_picture ? (
						<Image
							source={{ uri: state.profile_picture }}
							// style={{ width: 50, height: 50 }}
						/>
					) : null}
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
	},
	profilePicBtn: {
		marginTop: 15,
		backgroundColor: "black",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		height: 50
	},
	profilePicBtnText: {
		color: "white"
	}
});

export default connect()(RegisterForm);
