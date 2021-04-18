import React from 'react';
import { View } from "react-native";
import messaging from '@react-native-firebase/messaging';

const Chat = () => {
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    requestUserPermission();

    return (
        <View>

        </View>
    )
}

export default Chat
