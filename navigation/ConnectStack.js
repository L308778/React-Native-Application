import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import Chat from "../components/main_page/connect/chat.js";
import Friends from "../components/main_page/connect/friends.js";

//AuthStack should be used for authentication of the user

const ConnectStack = createStackNavigator()
export default function ConnectStacker() {
    return (
        <ConnectStack.Navigator
            initialRouteName="friends"
            screenOptions={{ headerShown: false }}>
            <ConnectStack.Screen name="friends" component={Friends}
                options={{
                    gestureEnabled: false
                }} />
            <ConnectStack.Screen name="chat" component={Chat}
                options={{
                    gestureEnabled: false
                }} />
        </ConnectStack.Navigator>
    )
}