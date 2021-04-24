import React, { useState, useEffect, useContext } from 'react';
import MainStack from "./mainnav.js";
import AuthStack from "./AuthStack.js";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DataContext } from "../context/dataContext.js";
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

const dbRef = database().ref("/messaging")

const Routes = () => {
    const [initializing, setInitializing] = useState(true);
    const { user, setUser, messages, setMessages } = useContext(DataContext);

    // Handle user state changes
    const onAuthStateChanged = (user) => {
        console.log(user)
        setUser(user);
        setInitializing(false)
    }

    const onReceiveMessage = (remoteMessage) => {
        //setMessages([...messages, remoteMessage.notification.body]);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(onReceiveMessage);
        return unsubscribe;
    }, [messages]);

    useEffect(() => {
        dbRef.on("child_added", (message, lastID) => {
            console.log(message)
            const newMsg = message.val()
            newMsg.createdAt = Date.parse(newMsg.createdAt)
            setMessages(messages => lastID === newMsg._id ? messages : [...messages, newMsg])
        })
        return () => dbRef.off("child_added")
    }, []);

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