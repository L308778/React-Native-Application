import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, Route } from "@react-navigation/native";
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

// Import all Screens for navigation
import WelcomeScreen from "./components/welcome.js";
import Account_Creator from "./components/account_creation/create_account.js";
import Email_Sign_Up from "./components/account_creation/email_sign_up.js";
import Email_Verification from "./components/account_creation/email_verification.js";
import Basic_Setup from "./components/account_creation/basic_setup.js";
import Congrats from "./components/account_creation/congrats.js";
import Location from "./components/location.js";
import Login from "./components/login/email_login.js";
import Suggestion from "./components/suggestion.js";
import Budget from "./components/custom/budget";
import Time from "./components/custom/time.js";
import People from "./components/custom/people.js";
import Feeling from "./components/custom/feeling.js";
import Main from "./components/main_page/main_page.js";
import Settings from "./components/main_page/settings.js";
import Profile from "./components/main_page/profile.js";
import Activity_info from "./components/main_page/activity_info.js";
import Saved from "./components/main_page/saved_activity/saved.js";
import PhoneAuthScreen from "./components/account_creation/phone_verification.js"
import { screensEnabled } from "react-native-screens";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const config = {
  animation: 'timing',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function Mainfunc() {
  return (
    <Tab.Navigator
      initialRouteName="main"
      tabBarOptions={{
        style: {
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="main"
        options={{
          tabBarButton: () => null,
          tabBarButtonComponent: () => null,
          tabBarLabel: () => null,
          gestureEnabled:false
        }}
        component={Main}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "PROFILE",
          tabBarVisible: false,
          tabBarIcon: () => (
            <Icon name="user" type="evilicon" color="turquoise" size={50} />
          ),
        }}
      />
      <Tab.Screen
        name="saved"
        component={Saved}
        options={{
          tabBarLabel: "STORED",
          tabBarIcon: () => (
            <Icon name="like" type="evilicon" color="turquoise" size={50} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: "SETTINGS",
          tabBarIcon: () => (
            <Icon name="gear" type="evilicon" color="turquoise" size={50} />
          ),
          gestureEnabled:false
        }}
      />
    </Tab.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="welcome"
        options={{
          gestureEnabled:false
        }}
      >
        <Stack.Screen name="welcome" component={WelcomeScreen} 
        options={{
          gestureEnabled:false
        }}/>
        <Stack.Screen name="login" component={Login}
        options={{
          gestureEnabled:false
        }} />
        <Stack.Screen name="phone-verification" component={PhoneAuthScreen}
        options={{
          gestureEnabled:false
        }} />
        <Stack.Screen name="account_creator" component={Account_Creator}
        options={{
          gestureEnabled:false
        }} />
        <Stack.Screen name="email_sign_up" component={Email_Sign_Up}
        options={{
          gestureEnabled:false
        }} />
        <Stack.Screen
          name="email_verification"
          component={Email_Verification}
        />
        <Stack.Screen name="basic_setup" component={Basic_Setup}
        options={{
          gestureEnabled:false
        }} />
        <Stack.Screen name="congrats" component={Congrats} />
        <Stack.Screen name="location" component={Location} />
        <Stack.Screen name="suggestion" component={Suggestion} />
        <Stack.Screen name="budget" component={Budget} />
        <Stack.Screen name="time" component={Time} />
        <Stack.Screen name="people" component={People} />
        <Stack.Screen name="feeling" component={Feeling} />
        <Stack.Screen name="activity_info" 
        component={Activity_info} 
        options={{
          gestureEnabled:false,
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid
        }}/>
        <Stack.Screen name="tab" component={Mainfunc} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
