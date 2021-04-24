import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { DataContext } from "../../../context/dataContext.js";
import messaging from '@react-native-firebase/messaging';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';

const dbRef = database().ref("/messaging")

const Chat = () => {
    const { user, messages } = useContext(DataContext);
    const getUser = () => {
        return {
            name: user.displayName,
            avatar: user.photoURL,
            _id: user.uid
        }
    }

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }

    requestUserPermission();

    return (
        <GiftedChat
            messages={messages}
            onSend={(message) => {
                const theMsg = message[0]
                console.log(theMsg)
                const msg = {
                    _id: theMsg._id,
                    text: theMsg.text,
                    createdAt: theMsg.createdAt.toString(),
                    user: {
                        _id: theMsg.user._id,
                        name: theMsg.user.name,
                        avatar: ""
                    }
                }
                const newRef = dbRef.push()
                newRef.set(msg)
            }}
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