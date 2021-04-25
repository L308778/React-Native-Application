import React, { useState, useEffect, useContext } from 'react';
import MainStack from "./mainnav.js";
import AuthStack from "./AuthStack.js";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DataContext } from "../context/dataContext.js";
import auth from '@react-native-firebase/auth';
import { database } from '../assets/config/firebase.js';

const MSG_LOAD_LIMIT = 20
let userLoaded = false

const Routes = () => {
    const [initializing, setInitializing] = useState(true);
    const { user, setUser, messages, setMessages, chats, setChats } = useContext(DataContext);

    // Handle user state changes
    const onAuthStateChanged = (user) => {
        setUser(user);
        setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const subscribeToAllChats = (dbRef, chats) => {
        console.log(chats)
        chats.forEach(element => {
            dbRef.child(element).limitToLast(MSG_LOAD_LIMIT).on("child_added", (message, lastID) => {
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
        });
    }

    const unsubscribeFromAllChats = (dbRef) => {
        if (!dbRef) return
        chats.forEach(element => {
            dbRef.child(element).off("child_added")
        });
    }

    useEffect(() => {
        let dbRef = null
        setMessages({})
        if (!user) {
            setChats([])
            setMessages({})
            userLoaded = false
        } else {
            if (!userLoaded) {
                dbRef = database.ref("/messaging/" + user.uid)
                dbRef.once("value", snapshot => {
                    console.log(snapshot)
                    const newChats = Object.keys(snapshot.val())
                    setChats(newChats)
                    subscribeToAllChats(dbRef, newChats)
                })
                userLoaded = true
            } else {
                setChats(chats)
            }
        }
        return () => {
            unsubscribeFromAllChats(dbRef)
        }
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