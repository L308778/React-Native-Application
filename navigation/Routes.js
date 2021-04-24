import React, { useState, useEffect, useContext } from 'react';
import MainStack from "./mainnav.js";
import AuthStack from "./AuthStack.js";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DataContext } from "../context/dataContext.js";
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

const Routes = () => {
    const [initializing, setInitializing] = useState(true);
    const { user, setUser, messages, setMessages } = useContext(DataContext);

    // Handle user state changes
    const onAuthStateChanged = (user) => {
        setUser(user);
        setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        setMessages({})
        const dbRef = database().ref("/messaging/" + user.uid)
        dbRef.on("child_added", (message, lastID) => {
            console.log(message)
            const newMsg = message.val()
            newMsg.createdAt = Date.parse(newMsg.createdAt)
            setMessages(messages => {
                if (lastID == newMsg._id) {
                    return messages
                } else {
                    const copyMsg = Object.create(messages)
                    copyMsg[newMsg.sentTo] ? copyMsg[newMsg.sentTo].push(newMsg) : copyMsg[newMsg.sentTo] = [newMsg]
                    return copyMsg
                }
            })
        })
        return () => dbRef.off("child_added")
    }, [user]);

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