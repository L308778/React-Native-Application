import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from "react-native";
import { DataContext } from "../../../context/dataContext.js";
import messaging from '@react-native-firebase/messaging';
import { GiftedChat } from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';

const dbRef = database().ref("/messaging")

const Chat = () => {
    const { user } = useContext(DataContext);
    const [messages, setMessages] = useState([])
    const thisUser = {
        name: user.displayName,
        avatar: user.photoURL,
        _id: user.uid
    }
    const [lastID, setLastID] = useState("")

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }

    requestUserPermission();

    useEffect(() => {
        dbRef.on("child_added", (message) => {
            console.log("-------------- New msg added ---------------")
            console.log(message)
            console.log(lastID)
            console.log(lastID === message.val()._id)
            //setMessages(lastID === message.val()._id ? messages : [...messages, message.val()])
            setLastID(message.val()._id)
        })
        return () => dbRef.off("child_added")
    }, [messages, lastID]);

    return (
        <GiftedChat
            messages={messages}
            onSend={(message) => {
                const theMsg = message[0]
                const msg = {
                    _id: theMsg._id,
                    text: theMsg.text,
                    createdAt: theMsg.createdAt,
                    user: {
                        _id: theMsg.user.uid,
                        name: theMsg.user.displayName,
                        avatar: ""
                    }
                }
                const newRef = dbRef.push()
                newRef.set(msg)
            }}
            user={thisUser}
        />
    )
}

export default Chat
