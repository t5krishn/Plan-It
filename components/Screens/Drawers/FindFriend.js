import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import MenuBtn from "../../Buttons/Menubtn";

import { connect } from "react-redux";
import { sendFriendRequest } from "../../../store/actions/userAction";

function FindFriend({ navigation, selectedUser, userFriendIDs, dispatch }) {
  const [searchQuery, changeSearchQuery] = useState("");

  const [queryResult, changeQueryResult] = useState({ match: false });

  useEffect(() => {
    let query = searchQuery.trim();
    if (query) {
      fetch(`https://plan-it-api-1.herokuapp.com/user/${selectedUser}/search/${query}`)
        .then(res => res.json())
        .then(data => {
          if (!userFriendIDs.includes(data.id)){
            changeQueryResult(data);
          }
        });
    }
  }, [searchQuery]);

  let onHandlePress = result => {
    if (result.match) {
      dispatch(sendFriendRequest(selectedUser, result.id));
        Alert.alert(
          "Confirm",
          `Are you sure you want to send a friend request to ${result.first_name} ${result.last_name}`,
          [
            { text: "Cancel", onPress: () => {}, style: "cancel" },
            {
              text: "OK",
              onPress: () => {
                dispatch(sendFriendRequest(selectedUser, result.id));
              }
            }
          ],
          { cancelable: false }
        );
    }
  };
 

  return (
    <View style={styles.container}>
      <MenuBtn navigation={navigation} />
      <View style={styles.topContainer}>
        <Text style={styles.title}>Find Friends</Text>
        <Text style={styles.subTitle}>Search with their username or email</Text>
        <TextInput
          style={styles.TextInput}
          value={searchQuery}
          onChangeText={query => {
            changeSearchQuery(query);
          }}
          clearTextOnFocus={true}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View>
          <TouchableOpacity
            style={styles.resultContainer}
            onPress={()=>{onHandlePress(queryResult)}}
          >
            <Text style={styles.searchResult}>
              {"Search query: " + searchQuery}
            </Text>
            <Text style={styles.searchResult}>
              {"Result: " + queryResult.username}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 20
  },
  subTitle: {
    fontFamily: "Avenir",
    fontSize: 15,
    marginBottom: 10
  },
  TextInput: {
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    padding: 10
  },
  topContainer: {
    flex: 1,
    backgroundColor: "yellow",
    width: "100%",
    marginTop: 50,
    // paddingTop: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "red",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  searchResult: {
    fontFamily: "Avenir",
    fontSize: 20
  },
  resultContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 9
  }
});

function mapStateToProps(state) {
  
  const { selectedUser, gettingUserData } = state;
  const { user_friends } = gettingUserData[selectedUser] || {
		user_friends: []
  };
  
  const userFriendIDs = user_friends.map(e => e.id)
  return { selectedUser, userFriendIDs };
}
export default connect(mapStateToProps)(FindFriend);
