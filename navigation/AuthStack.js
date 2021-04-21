import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'

import SplashScreen from "../components/splashscreen.js";
import Login from "../components/login/email_login.js";
import Email_Sign_Up from "../components/account_creation/email_sign_up.js";

//AuthStack should be used for authentication of the user

const AuthStack = createStackNavigator()
export default function AuthStacker() {
  return (
    <AuthStack.Navigator
      initialRouteName="splash"
      screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="splash" component={SplashScreen}
        options={{
          gestureEnabled: false
        }} />
      <AuthStack.Screen name="login" component={Login}
        options={{
          gestureEnabled: false
        }} />
      <AuthStack.Screen name="email_sign_up" component={Email_Sign_Up}
        options={{
          gestureEnabled: false
        }} />
    </AuthStack.Navigator>
  )
}