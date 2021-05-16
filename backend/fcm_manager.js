import messaging from '@react-native-firebase/messaging';
import firestore from "@react-native-firebase/firestore";

/*
    Requests an iOS user's permission to display notifications even when the app is not running
    Will have no effect on Android
    This function should be run on app startup
*/
export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        let fcmToken = await messaging().getToken()
        //console.log('Token:', fcmToken)
        return fcmToken
    }
}

/*
    Checks whether this device's FCM/APN token is stored in a user's firestore token database
    If not present, adds the token to the array in firestore
    This function should be run on app startup, only if a user is logged in
*/
export const checkAndUpdateFirebaseTokens = async (userID, token) => {
    if (!token || !userID) return
    let userDoc = firestore().collection("Users").doc(userID)
    userDoc.get().then((doc) => {
        let tokenData = doc.data().tokens
        if (tokenData && !tokenData.includes(token)) {
            // Token not stored in firebase, update
            userDoc.update({
                tokens: [...tokenData, token]
            })
        }
    })
}

/*
    Removes the FCM/APN token from a user's firestore token database if present
    This function should be run on user logout
*/
export const removeFirebaseTokenForUser = async (userID) => {
    if (!userID) return
    let fcmToken = await messaging().getToken()
    let userDoc = firestore().collection("Users").doc(userID)
    userDoc.get().then((doc) => {
        let tokenData = doc.data().tokens
        let index = tokenData.indexOf(fcmToken)
        if (tokenData && index > -1) {
            tokenData.splice(index, 1)
            userDoc.update({
                tokens: tokenData
            })
        }
    })
}

/*
    Listener for new FCM messages when app is running in foreground
*/
export const fcmListener = () => {
    return messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
}

/*
    Sends data for chat message to FCM
*/
export const sendFcmChatMsg = (msg, friendName, tokens) => {
    messaging().sendMessage({
        data: {
            type: "chat",
            chatName: friendName,
            text: msg,
            token: JSON.stringify(tokens)
        }
    })
}

/*
    Sends data for friend request to FCM
*/
export const sendFriendRequestMsg = async (friend) => {
    let tokens = []
    let doc = await firestore().collection("Users").doc(friend.uid).get()
    if (doc.data().tokens) tokens = doc.data().tokens
    messaging().sendMessage({
        data: {
            type: "friendRequest",
            friendName: friend.name,
            token: JSON.stringify(tokens)
        }
    })
}