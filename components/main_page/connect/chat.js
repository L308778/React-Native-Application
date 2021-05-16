import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { DataContext } from "../../../context/dataContext.js";
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from "@react-native-firebase/firestore";
import database from "@react-native-firebase/database";
import { sendFcmChatMsg } from "../../../backend/fcm_manager.js";

const Chat = ({ route }) => {
    const { user, messages, giftedChat } = useContext(DataContext);
    const tokens = useRef([])
    const getUser = () => {
        return {
            name: user.displayName,
            avatar: null,
            _id: user.uid
        }
    }
    const otherUID = route.params.otherUID

    useEffect(() => {
        firestore().collection("Users").doc(otherUID).get().then((doc) => {
            let tokenData = doc.data().tokens
            if (tokenData) {
                tokens.current = tokenData
            }
        })
    }, [])

    const sendMsg = (message, otherUID) => {
        const theMsg = message[0]
        const msg = {
            _id: theMsg._id,
            text: theMsg.text,
            createdAt: theMsg.createdAt.getTime(),
            user: {
                _id: theMsg.user._id,
                name: theMsg.user.name
            }
        }
        sendFcmChatMsg(theMsg.text, theMsg.user.name, tokens.current)
        database().ref("/messaging/" + otherUID + "/" + user.uid).push(msg)
        database().ref("/messaging/" + user.uid + "/" + otherUID).push(msg)
    }


    return (
        <GiftedChat
            messages={messages[otherUID]}
            onSend={(message) => sendMsg(message, otherUID)}
            user={getUser()}
            inverted={false}
            ref={giftedChat}
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