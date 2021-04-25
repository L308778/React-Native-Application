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

    const subscribeToChat = (dbRef, element) => {
        dbRef.child(element).limitToLast(MSG_LOAD_LIMIT).on("child_added", (message, lastID) => {
            const newMsg = message.val()
            newMsg.createdAt = Date.parse(newMsg.createdAt)
            setMessages(messages => {
                if (lastID == newMsg._id) {
                    return messages
                } else {
                    const copyMsg = Object.create(messages)
                    copyMsg[element] ? copyMsg[element].push(newMsg) : copyMsg[element] = [newMsg]
                    return copyMsg
                }
            })
        })
    }

    const subscribeToAllChats = async (dbRef, chats) => {
        //console.log(chats)
        chats.forEach(element => {
            console.log("Initial subscribe to", element)
            subscribeToChat(dbRef, element)
        });
    }

    const unsubscribeFromAllChats = (dbRef) => {
        if (!dbRef) return
        chats.forEach(element => {
            dbRef.child(element).off("child_added")
            console.log("Unsubscribed from", element)
        });
        setChats([])
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
                dbRef.once("value", async (snapshot) => {
                    const newChats = snapshot.exists() ? Object.keys(snapshot.val()) : []
                    setChats(newChats)
                    await subscribeToAllChats(dbRef, newChats)

                    dbRef.on("child_added", newUser => {
                        setChats(chats => {
                            console.log("Chats is", chats)
                            const needsUpdate = !chats.includes(newUser.key)
                            const newChats = !needsUpdate ? chats : [...chats, newUser.key]
                            if (needsUpdate) {
                                subscribeToChat(dbRef, newUser.key)
                                console.log("Incremental subscribe to", newUser.key)
                            }
                            return newChats
                        })
                    })
                })
                userLoaded = true
            }
        }

        return () => {
            if (dbRef) {
                console.log("Unsubscribed from child add")
                dbRef.off("child_added")
                unsubscribeFromAllChats(dbRef)
            }
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