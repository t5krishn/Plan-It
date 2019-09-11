import React from "react";
import { DrawerItems } from "react-navigation";
import { View, Image, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
const CustomDrawerComponent = props => {
  const { profile_picture } = props;
  return (
    <SafeAreaView>
      <View
        style={{
          height: 150,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={{ uri: profile_picture }}
          style={{ height: 120, width: 120 }}
        />
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { selectedUser, gettingUserData } = state;
  const { profile_picture } = gettingUserData[selectedUser].user || "./assets/icon.png";

  return { profile_picture };
};

export default connect(mapStateToProps)(CustomDrawerComponent);
