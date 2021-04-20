import React, { useContext } from 'react';
import { View, Text } from "react-native";
import { DataContext } from "../../../context/dataContext.js";
import messaging from '@react-native-firebase/messaging';

const Chat = () => {
    const { user, messages, initializing } = useContext(DataContext);

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }

    requestUserPermission();

    return (
        <View>
            <Text>
                {messages.join("\n")}
            </Text>
        </View>
    )
}

export default Chat
