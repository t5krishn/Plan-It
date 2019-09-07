import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default function EventCards({ items }) {
	return (
		<ScrollView contentContainerStyle={styles.friendContainer}>
			{items.map((e, i) => {
				return (
					<Card key={i} wrapperStyle={styles.friendCard}>
						<View style={styles.friendInfo}>
						{!e.is_accepted && <Text style={{fontWeight:"bold"}}>New Friend Request!</Text>}
							<Text>{e.first_name + ' ' + e.last_name}</Text>
							<Text>{e.username}</Text>
							<Text>{e.email}</Text>
						</View>
							{!e.is_accepted && 
								<View style={styles.friendRequestContainer}>
									<TouchableOpacity onPress={()=>{}}>
										{/* <Text>Accept</Text> */}
										<Image style={styles.friendRequestButtons} source={require("../../../assets/accept.png")}/>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>{}}>
										{/* <Text>Decline</Text> */}
										<Image style={styles.friendRequestButtons} source={require("../../../assets/cancel.png")}/>
									</TouchableOpacity>
								</View>
							}
					</Card>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	friendContainer: {
		flex: 1,
		width: "100%"
	},
	friendCard: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		// alig
	},
	friendInfo: {
		flex: 1
	},
	friendRequestContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	},
	friendRequestButtons: {
		width:50,
		height:50
	}
})