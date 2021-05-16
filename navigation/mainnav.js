import React, { useRef, useContext } from "react";
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { DataContext } from '../context/dataContext.js';

// Import all Screens for navigation
import Location from "../components/location.js";
import Budget from "../components/custom/budget";
import Time from "../components/custom/time.js";
import People from "../components/custom/people.js";
import Feeling from "../components/custom/feeling.js";
import Main from "../components/main_page/main_page.js";
import Settings from "../components/main_page/settings.js";
import Profile from "../components/main_page/profile.js";
import Activity_info from "../components/main_page/activity_info.js";
import Saved from "../components/main_page/saved_activity/saved.js";
import Welcome from "../components/welcome.js";
import EditProfile from "../components/account_creation/edit_profile.js"
import ConnectStack from "./ConnectStack.js";
import { screensEnabled } from "react-native-screens";
import CreatorStack from "./CreatorStack.js"
import EditInterim from "../components/account_creation/editInterim.js"
import EditProfilePic from "../components/account_creation/edit_ProfilePic.js"
import EditPersonalInfo from "../components/account_creation/editPersonalInfo.js"


/*
Here all the main screens of the application are listed. The MainStack are screens which
are navigated through a Stack Navigator. Basically that means the screens are switched on
an event. The Tab navigator is the one on the mainpage where you swipe. This navigator is
positioned at the bottom of the screen. The config is used to customize the navigator, which
is used when you swipe upwards the card will appear from the bottom instead of the side. 
The DataContextProvider comes from the context, where the data flow is centralized.
*/

const MainStack = createStackNavigator();
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
          gestureEnabled: false
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
            <Icon name="user" type="evilicon" color="turquoise" size={43} />
          ),
        }}
      />
      <Tab.Screen
        name="saved"
        component={Saved}
        options={{
          tabBarLabel: "STORED",
          tabBarIcon: () => (
            <Icon name="like" type="evilicon" color="turquoise" size={43} />
          ),
        }}
      />
      <Tab.Screen
        name="connect"
        component={ConnectStack}
        options={{
          tabBarLabel: "CONNECT",
          tabBarIcon: () => (
            <Icon name="comment" type="evilicon" color="turquoise" size={43} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{

          tabBarLabel: "SETTINGS",
          tabBarIcon: () => (
            <Icon name="gear" type="evilicon" color="turquoise" size={43} />
          ),
          gestureEnabled: false
        }}
      />
    </Tab.Navigator>
  );
}

profile_checker = () => {
  const { user } = useContext(DataContext)
  if (user.displayName) {
    return "welcome"
  }
  else {
    return "creator"
  }
}


const MainStacker = () => {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={profile_checker()}
      options={{
        gestureEnabled: false
      }}
    >
      <MainStack.Screen name="welcome" component={Welcome} />
      <MainStack.Screen name="location" component={Location} />
      <MainStack.Screen name="edit" component={EditProfile}/>
      <MainStack.Screen name="budget" component={Budget} />
      <MainStack.Screen name="time" component={Time} />
      <MainStack.Screen name="people" component={People} />
      <MainStack.Screen name="feeling" component={Feeling} />
      <MainStack.Screen name="activity_info"
        component={Activity_info}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid
        }} />
      <MainStack.Screen name="tab" component={Mainfunc} />
      <MainStack.Screen name="creator" component = {CreatorStack}/>
      <MainStack.Screen name="editInterim" component = {EditInterim}/>
      <MainStack.Screen name="editProfilePic" component = {EditProfilePic}/>
      <MainStack.Screen name="editPersonalInfo" component = {EditPersonalInfo}/>
    </MainStack.Navigator>
  );
}

export default MainStacker;
