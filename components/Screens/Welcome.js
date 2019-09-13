import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
	Dimensions,
	AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { selectUser, fetchUserData } from "../../store/actions/userAction";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Welcome(props) {
	return (
		<ImageBackground
			source={require("../../assets/plant1.jpg")}
			style={{
				height: Dimensions.get("screen").height,
				width: Dimensions.get("screen").width
			}}
		>
			<View style={styles.opacity} />
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<ImageBackground
						source={require("../../assets/logoTransparent.png")}
						style={{ width: (width / 1.8) * 1.035, height: width / 1.8 }}
					/>
					<Text style={styles.slogan}>Welcome to</Text>
					<Text style={styles.title}>Plan It</Text>
					<Text
						style={{
							fontFamily: "Avenir",
							fontSize: 18,
							marginTop: 40,
							color: "#000"
						}}
					>
						Got a trip to plan? We can help!
					</Text>
				</View>
				<View style={styles.bottomContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => props.navigation.navigate("Login")}
					>
						<Text style={styles.buttonText}>Sign In</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, { marginTop: "3%" }]}
						onPress={() => props.navigation.navigate("Signup")}
					>
						<Text style={styles.buttonText}>Create Account</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, width: "100%", height: "100%" },
	topContainer: {
		flex: 2,
		marginTop: height / 8,
		alignItems: "center"
	},
	slogan: {
		marginTop: height / 20,
		fontFamily: "Avenir",
		fontSize: 20
	},
	title: {
		fontFamily: "Avenir-Light",
		fontSize: 65
	},
	bottomContainer: {
		flex: 1,
		marginTop: height / 5,
		alignItems: "center",
		width: "100%"
	},
	button: {
		backgroundColor: "#000",
		width: "80%",
		height: height / 18,
		alignItems: "center",
		justifyContent: "center"
	},
	buttonText: {
		color: "#FFF",
		fontFamily: "Avenir",
		fontSize: 18
	},
	opacity: {
		position: "absolute",
		height: "100%",
		width: "100%",
		backgroundColor: "#FFF",
		opacity: 0.5
	}
});
