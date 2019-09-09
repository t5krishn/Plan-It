import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import FriendCard from "./FriendCard";
export default function FriendsList({ items, onAccept, onDecline, selectedUser }) {
  return (
    <View contentContainerStyle={styles.friendContainer}>
      {items.map((e, i) => (

        <FriendCard
        key={i}
        friend={e}
        onAccept={onAccept}
        onDecline={onDecline}
        />
        
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  friendContainer: {
    flex: 1,
    width: "100%"
  }
});
