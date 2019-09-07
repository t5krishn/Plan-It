import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { selectUser, fetchUserData } from "../../store/actions/userAction";

export default function Welcome(props) {
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<ImageBackground
					source={require("../../assets/logo.png")}
					style={{ width: 210, height: 200 }}
				/>
				<Text style={{ marginTop: 60, fontFamily: "Avenir", fontSize: 20 }}>
					Welcome to
				</Text>
				<Text style={{ fontFamily: "Avenir-Light", fontSize: 60 }}>PlanIt</Text>
				<Text style={{ fontFamily: "Avenir", fontSize: 15, marginTop: 40 }}>
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
					<Text>Create Account</Text>
				</TouchableOpacity>
			</View>
		</View>
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
		flex: 1,
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		width: "100%"
	},
	button: {
		backgroundColor: "black",
		width: "80%",
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10
	},
	buttonText: {
		color: "#FFFFFF",
		fontFamily: "Avenir"
	}
});
