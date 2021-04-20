import React, { useState, useEffect, useContext } from 'react';
import MainStack from "./mainnav.js";
import AuthStack from "./AuthStack.js";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DataContext } from "./context/dataContext.js";
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const Routes = () => {
    const [initializing, setInitializing] = useState(true);
    const { user, setUser, messages, setMessages } = useContext(DataContext);

    // Handle user state changes
    const onAuthStateChanged = async (user) => {
        setUser(user);
        setInitializing(false)
    }

    const onReceiveMessage = (remoteMessage) => {
        setMessages([...messages, remoteMessage.notification.body]);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(onReceiveMessage);
        return unsubscribe;
    }, [messages]);

    if (initializing) {
        return (
            <View>
            </View>
        )
    };

    return (
        <NavigationContainer>
            {user ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Routes;