import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
	Dimensions
} from "react-native";
import { connect } from "react-redux";
import { selectUser, fetchUserData } from "../../store/actions/userAction";

export default function Welcome(props) {
	return (
		<ImageBackground
			source={require("../../assets/plant1.png")}
			style={{ height: Dimensions.get("screen").height + 100 }}
		>
			<View style={styles.opacity} />
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<ImageBackground
						source={require("../../assets/logoTransparent.png")}
						style={{ width: 210, height: 200 }}
					/>
					<Text
						style={{
							marginTop: 60,
							fontFamily: "Avenir",
							fontSize: 22
						}}
					>
						Welcome to
					</Text>
					<Text style={{ fontFamily: "Avenir-Light", fontSize: 65 }}>
						PlanIt
					</Text>
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
					<TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
						<Text style={{ fontFamily: "Avenir", color: "#000", fontSize: 20 }}>
							Create Account
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	topContainer: {
		flex: 3,
		marginTop: 180,
		alignItems: "center"
	},
	bottomContainer: {
		flex: 2,
		marginTop: "30%",
		alignItems: "center",
		width: "100%"
	},
	button: {
		backgroundColor: "#000",
		width: "80%",
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10
	},
	buttonText: {
		color: "#FFFFFF",
		fontFamily: "Avenir",
		fontSize: 20
	},
	opacity: {
		position: "absolute",
		height: "100%",
		width: "100%",
		backgroundColor: "#FFF",
		opacity: 0.5
	}
});
