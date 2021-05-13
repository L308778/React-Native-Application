import messaging from '@react-native-firebase/messaging';
import firestore from "@react-native-firebase/firestore";

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        let fcmToken = await messaging().getToken()
        console.log('Token:', fcmToken)
        return fcmToken
    }
}

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