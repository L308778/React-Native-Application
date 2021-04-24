import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { DataContext } from "../../../context/dataContext.js";
import messaging from '@react-native-firebase/messaging';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route }) => {
    const { user, messages, setMessages, sendMsg } = useContext(DataContext);
    const getUser = () => {
        return {
            name: user.displayName,
            avatar: user.photoURL,
            _id: user.uid
        }
    }
    const otherUID = route.params.otherUID

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }

    requestUserPermission();

    return (
        <GiftedChat
            messages={messages[otherUID]}
            onSend={(message) => sendMsg(message, otherUID)}
            user={getUser()}
            inverted={false}
        />
    )
}

export default Chat

const styles = StyleSheet.create({
    confirmbutton: {
        backgroundColor: "turquoise",
        borderWidth: 0,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    confirmbuttontext: {
        fontSize: 20,
        fontWeight: "400",
        color: "white"
    },
    map: {
        height: 300,
        width: 350,
        borderRadius: 30
    }
});