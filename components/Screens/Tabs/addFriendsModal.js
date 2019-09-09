import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions,
	TextInput,
	StyleSheet
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
		const friends = Object.keys(state);
		const invited = [];
		friends.map(friend => {
			if (state[friend]) {
				invited.push(friend);
			}
		});
		props.setInvited(invited);
		props.setFriendVisibility(false);
	};

	return (
		<View
			style={{
				marginTop: 22,
				alignItems: "center"
			}}
		>
			<Modal
				animationType="slide"
				transparent={true}
				visible={props.addFriendsVisible}
			>
				<View
					style={{
						borderRadius: 20,
						marginTop: 100,
						paddingTop: 50,
						zIndex: 9,
						backgroundColor: "gray",
						width: Dimensions.get("screen").width,
						height: Dimensions.get("screen").height,
						alignItems: "center"
					}}
				>
					<TouchableHighlight
						style={styles.close}
						onPress={() => {
							props.setFriendVisibility(false);
						}}
					>
						<Icon name="close" size={30} />
					</TouchableHighlight>
					<Text>Friends:</Text>
					{props.friends.length > 0 ? (
						<View style={styles.friendsContainer}>
							<View>
								{props.friends.map(friend => {
									return (
										<CheckBox
											key={friend.id}
											title={friend.first_name + " " + friend.last_name}
											checked={state[friend.id]}
											onPress={() => handlePress(friend.id)}
										/>
									);
								})}
							</View>
							<TouchableOpacity
								style={styles.button}
								onPress={() => handleSubmit()}
							>
								<Text>Submit</Text>
							</TouchableOpacity>
						</View>
					) : (
						<Text>
							You have no friends added to this trip! Press on trip settings to
							invite friends!
						</Text>
					)}
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	close: {
		position: "absolute",
		right: 20,
		top: 20
	},
	textInput: {
		width: "80%",
		height: 40,
		borderColor: "#000",
		borderWidth: 1,
		marginTop: 20
	},
	friendsContainer: {
		flex: 1,
		backgroundColor: "yellow",
		width: "80%",
		alignItems: "center"
	},
	button: {
		borderColor: "black",
		borderWidth: 2,
		width: 50,
		height: 20
	}
});

export default connect()(AddFriendsModal);
