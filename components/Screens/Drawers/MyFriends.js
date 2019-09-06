import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} from "react-native";
import MenuBtn from "../../Buttons/Menubtn";
import FriendsCards from "../Drawers/FriendsCards";

export default function FriendsScreen({ navigation }) {
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		const request = new Request("http://localhost:5422/user/1/friend", {
			method: "GET",
			headers: {
				"Content-type": "application/json"
			}
		});
		fetch(request)
			.then(response => {
				return response.json();
			})
			.then(json => {
				setFriends(json);
			});
	}, []);

	return (
		<View>
			<MenuBtn navigation={navigation} />
			<View style={styles.container}>
				<Text>FriendsScreen</Text>
				<TouchableOpacity onPress={() => navigation.navigate("FindFriend")}>
					<Text>Find friends</Text>
				</TouchableOpacity>
			</View>
			<ScrollView>
				<FriendsCards items={friends} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 200,
		alignItems: "center"
	},
	TextInput: {
		borderColor: "black",
		borderWidth: 1,
		width: 100
	}
});

function mapStateToProps(state) {
	const { selectedUser, gettingUserData } = state;
	const { isFetchingUser, user_friends } = gettingUserData[
		selectedUser
	] || {
		isFetchingUser: true,
		user_friends: []
	}

	return {
		selectedUser,
		isFetchingUser,
		user_friends
	}
}

export default connect(mapStateToProps)(MyExpensesScreen);