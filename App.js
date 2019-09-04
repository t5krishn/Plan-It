import React, { useState } from "react";
import {
	createSwitchNavigator,
	createAppContainer,
	createDrawerNavigator,
	createBottomTabNavigator,
	createStackNavigator,
	DrawerItems
} from "react-navigation";
import {
	StyleSheet,
	View,
	Image,
	Text,
	Button,
	TextInput,
	SafeAreaView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Provider } from 'react-redux';
import configureStore from './store/configureStore'

const store = configureStore();

// IMPORT COMPONENTS
import Login from "./components/Screens/Login";
import Signup from "./components/Screens/Signup";
import Dashboard from "./components/Screens/myDashboard/MyDashboard";
import EventsTab from "./components/Screens/Tabs/EventsTab";
import ExpensesTab from "./components/Screens/Tabs/ExpensesTab";
import TodoTab from "./components/Screens/Tabs/TodoTab";
import MyExpenses from "./components/Screens/MyExpenses";
import MyFriends from "./components/Screens/MyFriends.js";
import MySettings from "./components/Screens/MySettings";
import NewTrip from "./components/Screens/NewTrip";

/*
  NAVIGATION:

  -AppSwitchNavigator:
    -Login Screen 
      -Sign Up Screen (automatically logs you in after)
    -AppDrawerNavigator: (everything below needs a menu button)
        -MyExpenses
        -MyFriends
        -MySettings
        -MyTrips (Dashboard)
          -TabNavigator:
            -Tab 1: Events
            -Tab 2: Todo
            -Tab 3: Expenses
*/


export default function App() {
	return ( 
	<Provider store={store} >
		<AppContainer />
	</Provider>
	);
}

const TabNavigator = createBottomTabNavigator({
	TripEvents: {
		screen: EventsTab
	},
	TripTodo: {
		screen: TodoTab
	},
	TripExpenses: {
		screen: ExpensesTab
	}
});

const StackNavigator = createStackNavigator(
	{
		Dashboard: {
			screen: Dashboard
		},
		TabNavigator: {
			screen: TabNavigator
		},
		NewTrip: {
			screen: NewTrip
		}
	},
	{
		headerMode: "none",
		navigationOptions: {
			headerVisible: false
		}
	}
);

const CustomDrawerComponent = props => (
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
				source={require("./assets/icon.png")}
				style={{ height: 120, width: 120 }}
			/>
		</View>
		<ScrollView>
			<DrawerItems {...props} />
		</ScrollView>
	</SafeAreaView>
);

const AppDrawerNavigator = createDrawerNavigator(
	{
		Dashboard: {
			screen: StackNavigator
		},
		Expenses: {
			screen: MyExpenses
		},
		Friends: {
			screen: MyFriends
		},
		Settings: {
			screen: MySettings
		}
	},
	{
		contentComponent: CustomDrawerComponent
	}
);

const AppSwitchNavigator = createSwitchNavigator({
	Login: { screen: Login },
	Dashboard: { screen: AppDrawerNavigator },
	Signup: { screen: Signup }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	TextInput: {
		borderColor: "black",
		borderWidth: 1,
		width: 100
	}
});
