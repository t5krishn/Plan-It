import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native";
import { CheckBox } from "react-native-elements";
// import getFriends from "../../../../helpers/getFriends";

export default function ExpenseModal(props) {
  const {
    title,
    form,
    setForm,
    handleSubmit,
    tripUsers: propsTripUsers
  } = props;
  const tripUsers = {};
  form.users = form.users || [];

  propsTripUsers &&
    propsTripUsers.forEach(e => {
      tripUsers[e.id] = false;
    });
  const [checkedTripUsers, setCheckedTripUsers] = useState(tripUsers);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text>Name:</Text>
      <TextInput
        style={styles.textInput}
        value={form && form.name ? form.name : ""}
        onChangeText={text => setForm({ ...form, name: text })}
      />
      <Text>Expense date:</Text>
      <TextInput
        style={styles.textInput}
        value={form && form.expense_date ? form.expense_date : ""}
        onChangeText={text => setForm({ ...form, expense_date: text })}
      />
      <Text>Amount:</Text>
      <TextInput
        style={styles.textInput}
        value={form && form.amount_in_cents}
        onChangeText={text => setForm({ ...form, amount_in_cents: text })}
        keyboardType="decimal-pad"
      />
      {propsTripUsers && propsTripUsers.length > 0 ? (
        <View style={styles.friendsContainer}>
          <ScrollView contentContainerStyle={styles.checkBox}>
            {propsTripUsers.map(usr => {
              return (
                <CheckBox
                  key={usr.id}
                  title={usr.first_name + " " + usr.last_name}
                  checked={checkedTripUsers[usr.id]}
                  onPress={() => {
                    if (checkedTripUsers[usr.id]) {
                      console.log("in if true", form.users);
                      setForm({
                        ...form,
                        users: form.users.filter(
                          tripUserId => tripUserId !== usr.id
                        )
                      });
                    } else {
                      console.log("in if false", form.users);
                      if (form.users && form.users.length) {
                        let newUsers = [usr.id, ...form.users];
                        setForm({ ...form, users: newUsers });
                      } else {
                        setForm({ ...form, users: [usr.id] });
                      }
                    }

                    setCheckedTripUsers({
                      ...checkedTripUsers,
                      [usr.id]: !checkedTripUsers[usr.id]
                    });
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <Text>No trip users to add to expense</Text>
      )}

      <TouchableHighlight style={styles.submit}>
        <Text
          onPress={() => {
            // setForm({...form, amount_in_cents: Math.round((parseFloat(form.amount_in_cents) * 100))})
            handleSubmit("expense");
          }}
        >
          Submit
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 22,
    alignItems: "center",
    width: "100%"
  },
  close: {
    position: "absolute",
    right: 20,
    top: 20
  },
  content: {
    width: "85%"
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: "#000",
    borderWidth: 1
  },
  title: {
    fontSize: 20
  },
  submit: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "black"
  },
  friendsList: {
    backgroundColor: "yellow",
    height: "30%"
  },
  checkBox: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white"
    // height: 200
  },
  friendsContainer: {
    // flex: 1,
    backgroundColor: "yellow",
    width: "90%%",
    // alignItems: "center",
    height: 200
  }
});
