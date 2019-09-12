import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Image } from "react-native";
import { Button } from "react-native-elements";
import getPermissionAsync from "../../../../helpers/getPermissions";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ProfilePicForm(props) {
	const [profilePicInput, setProfilePic] = useState("");

	const [isUploading, setIsUploading] = useState(false);

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
			uploadImage(result.uri, randStr())
				.then(response => {
					response.ref.getDownloadURL().then(downloadURL => {
						setProfilePic(downloadURL);
						setIsUploading(false);
					});
				})
				.catch(error => {
					Alert.alert("There was an error with uploading your profile picture");
					console.log("Image upload error >> ", error);
					setIsUploading(false);
				});
		}
	};

	return (
		<View style={styles.formContainer}>
			<Text style={styles.userNameFormTitle}> Update Profile Picture </Text>
			{/* <TextInput
				autoCapitalize="none"
				onChangeText={text => onChangeProfilePic(text)}
				style={styles.TextInput}
				value={profilePicInput}
				clearTextOnFocus={true}
			/> */}
			{!isUploading && !profilePicInput && (
				<TouchableOpacity style={styles.imageUploadBtn} onPress={handlePress}>
					<Text style={styles.imgBtnText}>
						Select a profile picture from your device
					</Text>
				</TouchableOpacity>
			)}
			{profilePicInput ? (
				<View>
					<Text>Upload Complete</Text>
					<Button
						title="Save"
						buttonStyle={{ backgroundColor: "black" }}
						onPress={() => {
							props.onSubmit(props.user_id, profilePicInput);
							setProfilePic("");
						}}
					/>
				</View>
			) : null}
			{isUploading && (
				<View>
					<Text>Uploading</Text>
					<Image
						source={require("../../../../assets/loading.gif")}
						style={styles.loading}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		padding: 10,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	TextInput: {
		borderColor: "black",
		borderBottomWidth: 1,
		width: "80%",
		padding: 10,
		marginBottom: 10
	},
	userNameFormTitle: {
		fontSize: 18
	},
	imageUploadBtn: {
		padding: 10,
		backgroundColor: "black"
	},
	imgBtnText: {
		fontFamily: "Avenir-Light",
		fontSize: 18,
		color: "white"
	},
	loading: {
		alignSelf: "center",
		marginTop: 50
	}
});
