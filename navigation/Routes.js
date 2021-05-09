import React, { useState, useEffect, useContext } from 'react';
import MainStack from "./mainnav.js";
import AuthStack from "./AuthStack.js";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DataContext } from "../context/dataContext.js";
import auth from '@react-native-firebase/auth';
import { database } from '../assets/config/firebase.js';
import MMKVStorage from 'react-native-mmkv-storage';
import NetInfo from '@react-native-community/netinfo';

let internetReachable = false
let currentlySubscribedUser = false

const Routes = () => {
    const [initializing, setInitializing] = useState(true);
    const { user, setUser, messages, setMessages, chats, setChats, mmkvInstances, giftedChat } = useContext(DataContext);

    // Handle user state changes
    const onAuthStateChanged = async (user) => {
        setUser(user);
        if (user && !mmkvInstances.current.hasOwnProperty(user.uid)) {
            //If MMKV instance for user not present, create new instance
            mmkvInstances.current[user.uid] = new MMKVStorage.Loader()
                .withInstanceID(user.uid)
                .withEncryption()
                .initialize()
        }
        if (user) {
            let msgs = mmkvInstances.current[user.uid].getMap("messages")
            if (!msgs) msgs = {}
            setMessages(msgs)
            //mmkvInstances.current[user.uid].setMap("messages", {})
            //setMessages({})
        }
        setInitializing(false)

        //console.log("Auth state changed", user)
        setChatListeners(user, "auth")
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const subscribeToChat = (dbRef, element, user) => {
        dbRef.child(element).on("child_added", async (message) => {
            const newKey = message.key
            const newMsg = message.val()
            const sth = new Date()
            newMsg.createdAt = new Date(newMsg.createdAt) - sth.getTimezoneOffset() * 60000
            newMsg.key = newKey
            let newMsgReceived = false
            await setMessages(messages => {
                if ((!messages[element] || (newKey > messages[element][messages[element].length - 1].key))) {
                    messages[element] ? messages[element].push(newMsg) : messages[element] = [newMsg]
                    mmkvInstances.current[user.uid].setMap("messages", messages)
                    newMsgReceived = true
                }
                return messages
            })
            if (newMsgReceived && giftedChat.current) giftedChat.current.scrollToBottom()
        })
    }

    const subscribeToAllChats = async (dbRef, chats, user) => {
        //console.log(chats)
        chats.forEach(element => {
            //console.log("Initial subscribe to", element)
            subscribeToChat(dbRef, element, user)
        });
    }

    const unsubscribeFromAllChats = (dbRef) => {
        if (!dbRef) return
        chats.forEach(element => {
            dbRef.child(element).off("child_added")
            //console.log("Unsubscribed from", element)
        });
        setChats(new Set())
    }

    const setChatListeners = (user) => {
        //console.log("Subscribe to chat for", user, currentlySubscribedUser)
        if ((user !== currentlySubscribedUser && (!user || !currentlySubscribedUser)) || user.uid !== currentlySubscribedUser.uid) {
            if (!user) {
                setChats(new Set())
                setMessages({})
            }

            if (currentlySubscribedUser) {
                //console.log("Unsubscribed from current user", currentlySubscribedUser)
                unsetChatListeners(currentlySubscribedUser)
            }

            if (user) {
                let dbRef = database.ref("/messaging/" + user.uid)
                dbRef.once("value", async (snapshot) => {
                    const newChats = new Set(snapshot.exists() ? Object.keys(snapshot.val()) : [])
                    setChats(newChats)
                    await subscribeToAllChats(dbRef, newChats, user)

                    dbRef.on("child_added", newUser => {
                        setChats(chats => {
                            //console.log("Chats is", chats)
                            const needsUpdate = !chats.has(newUser.key)
                            const newChats = !needsUpdate ? chats : new Set([...chats, newUser.key])
                            if (needsUpdate) {
                                subscribeToChat(dbRef, newUser.key)
                                //console.log("Incremental subscribe to", newUser.key)
                            }
                            return newChats
                        })
                    })
                })
                currentlySubscribedUser = user
            }
        }
    }

    const unsetChatListeners = (user) => {
        //console.log("Unsubscribe from chat for", user)
        if (user) {
            let dbRef = database.ref("/messaging/" + user.uid)
            //console.log("Unsubscribed from child add")
            dbRef.off("child_added")
            unsubscribeFromAllChats(dbRef)
            currentlySubscribedUser = false
        }
    }

    useEffect(() => {
        const unsubscribeNetInfo = NetInfo.addEventListener(state => {
            if (state.isInternetReachable !== internetReachable) {
                //Network state changed, set (or unset) listeners
                internetReachable = state.isInternetReachable
                //console.log("Network state changed", internetReachable)
                let times = 0 //I have no idea why this is running twice, so I'll just use a counter to keep track
                setUser(user => {
                    times += 1
                    //console.log("Network ran!", times)
                    if (times <= 1) {
                        if (internetReachable) {
                            setChatListeners(user, "network")
                        } else {
                            unsetChatListeners(user)
                        }
                    }
                    return user
                })
            }
        });

        return () => {
            unsubscribeNetInfo()
            setUser(user => {
                //console.log("Unsubscribe from useEffect")
                unsetChatListeners(user)
                return user
            })
        }
    }, [])

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