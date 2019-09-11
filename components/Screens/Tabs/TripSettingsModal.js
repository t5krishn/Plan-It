import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  StyleSheet,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { CheckBox } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import { ScrollView } from "react-native-gesture-handler";

function TripSettingsModal(props) {
  const [updateInfo, setUpdateInfo] = useState(
    (props.trip && {
      name: props.trip.name,
      location: props.trip.location,
      starts_on: props.trip.starts_on,
      ends_on: props.trip.ends_on,
      description: props.trip.description
    })
  );

  const [showStartsOn, setShowStartsOn] = useState(false);
  const [showEndsOn, setShowEndsOn] = useState(false);

  const tripUsers = {};
  props.tripUsers &&
    props.tripUsers.forEach(e => {
      tripUsers[e.id] = true;
    });

  const friends = {};
  props.friends &&
    props.friends.forEach(e => {
      if (!tripUsers[e.id]) {
        friends[e.id] = false;
      }
    });

  const filteredFriends = props.friends.filter(f => f.id in friends);

  const [checkedTripUsers, setCheckedTripUsers] = useState(tripUsers);
  const [checkedFriends, setCheckedFriends] = useState(friends);

  const handleDelete = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete this trip? Make sure eveyone in your trip is aware you're deleting this trip",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            props.onDelete(props.user);
          }
        }
      ],
      { cancelable: false }
    );
  };
  // updateInfo => {
  //            name,
  //            location,
  //            starts_on,
  //            ends_on,
  //            description,
  //            added:[user_ids],
  //            removed:[user_ids] }

  const handleSubmit = () => {

		updateInfo.added = Object.keys(checkedFriends).filter(key => checkedFriends[key]);
		updateInfo.removed = Object.keys(checkedTripUsers).filter(key => !checkedTripUsers[key]);

    props.onSubmit(updateInfo);
  };


  return (
    <View
      style={{
        backgroundColor: "yellow"
      }}
    >
      <Modal animationType="slide" transparent={true} visible={props.isVisible}>
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
              props.setVisibility(false);
            }}
          >
            <Icon name="close" size={30} />
          </TouchableHighlight>

          <Text style={styles.title}>
            Edit your trip below
          </Text>

          <Text style={styles.content}>Trip Name</Text>
          <TextInput
						style={styles.TextInput}
						value={updateInfo.name}
						onChangeText={text=> setUpdateInfo({...updateInfo, name: text})}/>

          <Text style={styles.content}>Trip Location</Text>
					<TextInput
						style={styles.TextInput}
						value={updateInfo.location}
						onChangeText={text=> setUpdateInfo({...updateInfo, location: text})}/>

          <View style={styles.dateEdit}>
            <Text style={styles.content}>
              Trip Starts On: {new Date(updateInfo.starts_on).toDateString()}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowStartsOn(true);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            customCancelButtonIOS={
              <View style={styles.dateButton}>
                <Text style={styles.dateText}>Cancel</Text>
              </View>
            }
            customConfirmButtonIOS={
              <View style={styles.dateButton}>
                <Text style={styles.dateText}>Confirm</Text>
              </View>
            }
            datePickerContainerStyleIOS={{ borderRadius: 0 }}
            titleIOS={"Pick a start date"}
            isVisible={showStartsOn}
            date={new Date(updateInfo.starts_on)}
            onConfirm={date => {
              setUpdateInfo({ ...updateInfo, starts_on: date });
              setShowStartsOn(false);
            }}
            onCancel={() => {
              setShowStartsOn(false);
            }}
          />

          <View style={styles.dateEdit}>
            <Text style={styles.content}>
              Trip Ends On: {new Date(updateInfo.ends_on).toDateString()}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowEndsOn(true);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            customCancelButtonIOS={
              <View style={styles.dateButton}>
                <Text style={styles.dateText}>Cancel</Text>
              </View>
            }
            customConfirmButtonIOS={
              <View style={styles.dateButton}>
                <Text style={styles.dateText}>Confirm</Text>
              </View>
            }
            datePickerContainerStyleIOS={{ borderRadius: 0 }}
            titleIOS={"Pick an end date"}
            isVisible={showEndsOn}
            date={new Date(updateInfo.ends_on)}
            onConfirm={date => {
              setUpdateInfo({ ...updateInfo, ends_on: date });
              setShowEndsOn(false);
            }}
            onCancel={() => {
              setShowEndsOn(false);
            }}
          />


					<Text style={styles.content}>Trip Attendees:</Text>
          <View style={styles.friendsContainer}>
            <ScrollView contentContainerStyle={styles.checkBox}>
							{(!filteredFriends.length && !props.tripUsers.length)?  (
								<Text style={styles.warning}>
									No people added to trip. Go to Find friends and add some friends to add to your trip
								</Text>
							) : null}
							{(filteredFriends.length && !props.tripUsers.length)? (
								<Text style={styles.warning}>
									No people added to trip. Add some friends to your trip
								</Text>
							) : null}

              {props.tripUsers.map(tripUser => {
                return (
                  <CheckBox
                    key={tripUser.id}
                    title={tripUser.first_name + " " + tripUser.last_name}
                    checked={checkedTripUsers[tripUser.id]}
                    onPress={() => {
                      setCheckedTripUsers({
                        ...checkedTripUsers,
                        [tripUser.id]: !checkedTripUsers[tripUser.id]
                      });
                    }}
                  />
                );
              })}
              {filteredFriends.map(friend => {
                return (
                  <CheckBox
                    key={friend.id}
                    title={friend.first_name + " " + friend.last_name}
                    checked={checkedFriends[friend.id]}
                    onPress={() => {
                      setCheckedFriends({
                        ...checkedFriends,
                        [friend.id]: !checkedFriends[friend.id]
                      });
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Update Trip</Text>
          </TouchableOpacity>

          <View style={styles.deleteTrip}>
            <Text style={styles.title}>Delete your trip</Text>
            <Text style={styles.warning}>
              Warning: Doing this will delete all the events, to-dos and
              expenses you have created for this trip
            </Text>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.deletebutton}
            >
              <Text style={styles.deleteButtonText}>Delete Trip</Text>
            </TouchableOpacity>
          </View>
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
  checkBox: {
		width: "100%",
		// height: 200
  },
  friendsContainer: {
		// flex: 1,
    backgroundColor: "yellow",
    width: "90%%",
    alignItems: "center"
  },
  button: {
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  deletebutton: {
    borderColor: "black",
    borderWidth: 2,
    padding: 8,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  deleteButtonText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  deleteTrip: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 30
  },
  content: {
    fontSize: 20,
    color: "black",
    textAlign: "left",
    marginTop: 5,
    marginRight: 10,
    // fontWeight: "bold",
    fontFamily: "Avenir-Light"
  },
  warning: {
    fontSize: 20,
    color: "orange",
    textAlign: "center"
  },
  TextInput: {
    borderColor: "#000",
    borderBottomWidth: 1,
    height: 40,
    width: "80%",
    fontSize: 18,
    fontFamily: "Avenir",
    color: "#000"
  },
  dateButton: {
    backgroundColor: "black",
    alignItems: "center",
    padding: 10
  },
  dateText: {
    color: "white",
    fontFamily: "Avenir",
    height: "100%",
    fontSize: 16
  },
  dateEdit: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    // padding: 10,
    marginTop: 10,
    width: 350
	}
});

export default connect()(TripSettingsModal);
