import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	StyleSheet,
	ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { CheckBox } from "react-native-elements";

function AddFriendsModal(props) {
	const [state, setState] = useState({});

	const handlePress = id => {
		setState({ ...state, [id]: !state[id] });
	};

	const handleSubmit = () => {
		const invited = [];
		props.friends.map(friend => {
			if (state[friend.id]) {
				invited.push(friend);
			}
		});
		props.setInvited(invited);
		props.setFriendVisibility(false);
	};

	return (
		<View style={styles.mainContainer}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={props.addFriendsVisible}
			>
				<ImageBackground
					source={require("../../../assets/plant1.jpg")}
					style={styles.modalContainer}
				>
					<View
						style={{
							position: "absolute",
							backgroundColor: "white",
							opacity: 0.5,
							width: "100%",
							height: Dimensions.get("screen").height
						}}
					/>
					<TouchableOpacity
						style={styles.close}
						onPress={() => {
							props.setFriendVisibility(false);
						}}
					>
						<Icon name="close" size={30} />
					</TouchableOpacity>
					<Text style={styles.title}>Friends:</Text>
					{props.friends.length > 0 ? (
						<View style={{ flex: 1, width: "100%", alignItems: "center" }}>
							<View style={styles.friendsContainer}>
								<View style={styles.checkBox}>
									{props.friends.map(friend => {
										return (
											<CheckBox
												textStyle={{
													fontFamily: "Avenir",
													fontSize: 16,
													fontWeight: "normal",
													color: "black"
												}}
												key={friend.id}
												title={friend.first_name + " " + friend.last_name}
												checked={state[friend.id]}
												onPress={() => {
													handlePress(friend.id);
												}}
												containerStyle={{
													borderRadius: 0,
													backgroundColor: "white",
													width: "100%",
													marginLeft: 0,
													height: 45,
													borderColor: "white"
												}}
											/>
										);
									})}
								</View>
								<TouchableOpacity
									style={styles.button}
									onPress={() => handleSubmit()}
								>
									<Text style={[styles.text, { color: "white" }]}>Submit</Text>
								</TouchableOpacity>
							</View>
						</View>
					) : (
						<View style={{ marginTop: "30%" }}>
							<Text style={styles.text}>
								You have no friends added to this trip! Press on trip settings
								to invite friends!
							</Text>
						</View>
					)}
				</ImageBackground>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		width: "100%",
		marginTop: "10%",
		alignContent: "center",
		justifyContent: "center",
		backgroundColor: "purple"
	},
	modalContainer: {
		zIndex: 100,
		alignItems: "center",
		marginTop: "10%",
		width: "100%",
		height: "100%"
	},
	close: {
		position: "absolute",
		right: 20,
		top: 20,
		zIndex: 300
	},
	checkBox: {
		width: "100%"
	},
	friendsContainer: {
		flex: 1,
		width: "90%",
		height: "50%",
		alignItems: "center",
		backgroundColor: "white"
	},
	button: {
		borderColor: "black",
		height: 40,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "black"
	},
	text: { fontFamily: "Avenir", fontSize: 16 },
	title: {
		fontSize: 24,
		paddingBottom: "5%",
		paddingTop: "10%",
		fontFamily: "Avenir"
	},
	buttonView: {
		flex: 1,
		width: "90%",
		alignItems: "center"
	}
});

export default connect()(AddFriendsModal);
