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

import { connect } from "react-redux";
import { acceptInvite, declineInvite } from "../../../store/actions/userAction";

function FriendsScreen(props) {

	const onAccept = (friendId) => {
		props.dispatch(acceptInvite(props.selectedUser, friendId))
	};
	const onDecline = (friendId) => {
		props.dispatch(declineInvite(props.selectedUser, friendId))
	};

	const test = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/asdasd2eddasd",
      created_at: "2019-09-07T12:52:34.896Z",
      updated_at: "2019-09-07T12:52:34.896Z",
      is_accepted: false,
      type: "follower",
      friend_id: 4
    },
    {
      id: 3,
      first_name: "Colin",
      last_name: "Fetus",
      email: "colinfetus@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/4rbecrh24dfs",
      created_at: "2019-09-07T12:52:34.903Z",
      updated_at: "2019-09-07T12:52:34.903Z",
      is_accepted: false,
	  type: "followee",
	  friend_id: 4
    },
    {
      id: 4,
      first_name: "Bail",
      last_name: "Linman",
      email: "baillinman@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/b2kju3gjfbdkb",
      created_at: "2019-09-07T12:52:34.907Z",
      updated_at: "2019-09-07T12:52:34.907Z",
      is_accepted: false,
	  type: "follower",
	  friend_id: 4
    },
    {
      id: 3,
      first_name: "Colin",
      last_name: "Fetus",
      email: "colinfetus@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/4rbecrh24dfs",
      created_at: "2019-09-07T12:52:34.903Z",
      updated_at: "2019-09-07T12:52:34.903Z",
      is_accepted: true,
      type: "follower"
    },
    {
      id: 4,
      first_name: "Bail",
      last_name: "Linman",
      email: "baillinman@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/b2kju3gjfbdkb",
      created_at: "2019-09-07T12:52:34.907Z",
      updated_at: "2019-09-07T12:52:34.907Z",
      is_accepted: false,
      type: "follower"
    },
    {
      id: 3,
      first_name: "Colin",
      last_name: "Fetus",
      email: "colinfetus@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/4rbecrh24dfs",
      created_at: "2019-09-07T12:52:34.903Z",
      updated_at: "2019-09-07T12:52:34.903Z",
      is_accepted: true,
      type: "follower"
    },
    {
      id: 4,
      first_name: "Bail",
      last_name: "Linman",
      email: "baillinman@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/b2kju3gjfbdkb",
      created_at: "2019-09-07T12:52:34.907Z",
      updated_at: "2019-09-07T12:52:34.907Z",
      is_accepted: false,
      type: "follower"
    },
    {
      id: 3,
      first_name: "Colin",
      last_name: "Fetus",
      email: "colinfetus@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/4rbecrh24dfs",
      created_at: "2019-09-07T12:52:34.903Z",
      updated_at: "2019-09-07T12:52:34.903Z",
      is_accepted: true,
      type: "follower"
    },
    {
      id: 4,
      first_name: "Bail",
      last_name: "Linman",
      email: "baillinman@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/b2kju3gjfbdkb",
      created_at: "2019-09-07T12:52:34.907Z",
      updated_at: "2019-09-07T12:52:34.907Z",
      is_accepted: false,
      type: "follower"
    },
    {
      id: 3,
      first_name: "Colin",
      last_name: "Fetus",
      email: "colinfetus@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/4rbecrh24dfs",
      created_at: "2019-09-07T12:52:34.903Z",
      updated_at: "2019-09-07T12:52:34.903Z",
      is_accepted: true,
      type: "follower"
    },
    {
      id: 4,
      first_name: "Bail",
      last_name: "Linman",
      email: "baillinman@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/b2kju3gjfbdkb",
      created_at: "2019-09-07T12:52:34.907Z",
      updated_at: "2019-09-07T12:52:34.907Z",
      is_accepted: false,
      type: "followee"
    },
    {
      id: 3,
      first_name: "Colin",
      last_name: "Fetus",
      email: "colinfetus@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/4rbecrh24dfs",
      created_at: "2019-09-07T12:52:34.903Z",
      updated_at: "2019-09-07T12:52:34.903Z",
      is_accepted: true,
      type: "follower"
    },
    {
      id: 4,
      first_name: "Bail",
      last_name: "Linman",
      email: "baillinman@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/b2kju3gjfbdkb",
      created_at: "2019-09-07T12:52:34.907Z",
      updated_at: "2019-09-07T12:52:34.907Z",
      is_accepted: false,
      type: "followee"
    },
    {
      id: 3,
      first_name: "Colin",
      last_name: "Fetus",
      email: "colinfetus@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/4rbecrh24dfs",
      created_at: "2019-09-07T12:52:34.903Z",
      updated_at: "2019-09-07T12:52:34.903Z",
      is_accepted: true,
      type: "follower"
    },
    {
      id: 4,
      first_name: "Bail",
      last_name: "Linman",
      email: "baillinman@gmail.com",
      username: null,
      password_digest: "password",
      profile_picture: "someprofilepicture.com/b2kju3gjfbdkb",
      created_at: "2019-09-07T12:52:34.907Z",
      updated_at: "2019-09-07T12:52:34.907Z",
      is_accepted: false,
      type: "follower"
    }
  ];
	return (
		<View>
			<MenuBtn navigation={props.navigation} />
			<View style={styles.container}>
				<Text>FriendsScreen</Text>
				<TouchableOpacity
					onPress={() => props.navigation.navigate("FindFriend")}
				>
					<Text>Find friends</Text>
				</TouchableOpacity>
			</View>
      <ScrollView>
        <FriendsCards 
          items={props.user_friends /* test */}
          user_id={props.selectedUser}
          onAccept={onAccept}
          onDecline={onDecline}
          isFetching={props.isFetchingUser}/>
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
	const { isFetchingUser, user_friends } = gettingUserData[selectedUser] || {
		isFetchingUser: true,
		user_friends: []
	};

	return {
		selectedUser,
		isFetchingUser,
		user_friends
	};
}

export default connect(mapStateToProps)(FriendsScreen);
