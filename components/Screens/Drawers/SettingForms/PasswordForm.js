import React, { useState } from "react";
import { 
	View,
	Text,
	Button,
	StyleSheet,
    TextInput,
    Alert
} from "react-native";

export default function PasswordForm(props) {

    const [curPWInput, onCurPWChange] = useState('**************');
    const [newPWInput, onNewPWChange] = useState('**************');
    const [confirmPWInput, onConfirmPWChange] = useState('**************');

    const handleSubmit = () => {
        if(newPWInput === confirmPWInput) {
            props.onSubmit(props.user_id, {
                currentPassword: curPWInput,
                newPassword: newPWInput
            });
        } else {
            Alert.alert("New passwords don't match!")
        }
    }

    return (
    <View style={styles.formContainer}>
        <Text style={styles.userNameFormTitle}> Update Password </Text>
		<Text>Current Password</Text>
        <TextInput
			secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={text => onCurPWChange(text)}
            style={styles.TextInput}
            value={curPWInput}
            clearTextOnFocus = {true}
        />
		<Text>New Password</Text>
		<TextInput
			secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={text => onNewPWChange(text)}
            style={styles.TextInput}
            value={newPWInput}
            clearTextOnFocus = {true}
        />
		<Text>Confirm New Password</Text>
		<TextInput
			secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={text => onConfirmPWChange(text)}
            style={styles.TextInput}
            value={confirmPWInput}
            clearTextOnFocus = {true}
        />
        <Button 
            title="Update"
            onPress={handleSubmit}/>
    </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
		width: "100%",
		padding: 10,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	TextInput: {
		borderColor: "black",
		borderWidth: 1,
		width: "80%",
		padding: 10,
		marginBottom: 10
	},
	userNameFormTitle: {
		fontSize: 18
	}
});