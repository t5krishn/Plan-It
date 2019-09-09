import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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
import tripSettingsModal from "../Screens/Tabs/TripSettingsModal";

export default function TripSettingsbtn({ navigation }) {
  const [isVisible, setVisibility] = useState(false);
  return (
    <View style={styles.container}>
			<Ionicons
        name="md-settings"
        style={styles.settingsBtn}
        color="#000000"
        size={32}
        onPress={() => {
          console.log("pull up modal"); /*  */
        }}
      />

      {/* {isVisible && <Modal />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
		flexDirection: "column",
		width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    position: "absolute"
	},
  settingsBtn: {
    zIndex: 9,
    padding: 2,
    position: "absolute",
    right: 20,
    top: 40
  }
});
