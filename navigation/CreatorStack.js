import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import ProfileCreator from "../components/account_creation/profile_creator.js";
import PicUpload from "../components/account_creation/pic_upload.js"

//AuthStack should be used for authentication of the user

const CreateStack = createStackNavigator()
export default function ConnectStacker() {
    return (
        <CreateStack.Navigator
            initialRouteName="picUpload"
            screenOptions={{ headerShown: false }}>
            <CreateStack.Screen name="picUpload" component={PicUpload}
                options={{
                    gestureEnabled: false
                }} />
            <CreateStack.Screen name="profileCreator" component={ProfileCreator}
                options={{
                    gestureEnabled: false
                }} />
        </CreateStack.Navigator>
    )
}