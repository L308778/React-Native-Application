import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from "react-native";
import { DataContext } from "../../../context/dataContext.js";
import messaging from '@react-native-firebase/messaging';
import { GiftedChat } from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';

const Chat = () => {
    const { user } = useContext(DataContext);
    const [messages, setMessages] = useState([])
    const [thisUser, setThisUser] = useState({
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        _id: user.uid
    })

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }

    requestUserPermission();

    useEffect(() => {
        database().ref().on("child_added", message => setMessages([...messages, message]))
        return () => database().ref().off("child_added")
    }, [messages]);

    return (
        <GiftedChat
            messages={messages}
            onSend={(message) => database().ref().push(message.text, () => {})}
            user={user}
        />
    )
}

export default Chat
