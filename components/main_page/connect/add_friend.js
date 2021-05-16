import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { Icon } from "react-native-elements";
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import firestore from "@react-native-firebase/firestore"
import { DataContext } from '../../../context/dataContext'
import Constants from "expo-constants"
import { sendFriendRequestMsg } from '../../../backend/fcm_manager.js'

const addFriends = ({ navigation, route }) => {
    const [friendList, setFriendList] = useState([])
    const [addUserList, setAddUserList] = useState([])
    const [searchUser, setSearchUser] = useState("")
    const [requestList, setRequestList] = useState([])
    const [myRequests, setMyRequests] = useState([])
    const { user, mmkvInstances, setCurrUser } = useContext(DataContext)

    const friendsUIDList = route.params.friendsUIDList

    const ItemSeparatorView = () => {
        return (
            // FlatList Item Separator
            <View
                style={{
                    height: 1,
                    width: "95%",
                    alignSelf: "center",
                    backgroundColor: "#C8C8C8",
                }}
            />
        );
    };

    const updateFriendsInFirestore = (myNewFriends, friendUID, theirNewFriends) => {
        firestore().collection('Users').doc(user.uid).update({ friends: myNewFriends.map(x => x.uid) })
        firestore().collection('Users').doc(friendUID).update({ friends: theirNewFriends })
    }

    const updateFriendsInStorage = (newFriends) => {
        const mmkvInst = mmkvInstances.current[user.uid]
        if (mmkvInst) mmkvInst.setArray("friends", newFriends)
    }

    const updateFirestoreRequest = async (friend, send) => {
        let userRef = firestore().collection("Users").doc(user.uid)
        if (send) {
            userRef.update({ sentRequests: [...myRequests, friend.uid] })
            setMyRequests([...myRequests, friend.uid])
            sendFriendRequestMsg(friend)
        } else {
            let requestList = [...myRequests]
            let index = requestList.indexOf(friend.uid)
            if (index > -1) {
                requestList.splice(index, 1)
                userRef.update({ sentRequests: requestList })
                setMyRequests(requestList)
            }
        }

        if (!send) {
            let friendRef = firestore().collection("Users").doc(friend.uid)
            let fReqList = (await friendRef.get()).data().sentRequests
            if (!fReqList) {
                friendRef.update({ sentRequests: [] })
                return
            }
            let index = fReqList.indexOf(user.uid)
            if (index > -1) {
                fReqList.splice(index, 1)
                friendRef.update({ sentRequests: fReqList })
            }
        }
    }

    const showFriendDialog = (friend) => {
        const requestSent = myRequests.includes(friend.uid)
        Alert.alert(
            requestSent ? "Cancel friend request" : "Send friend request",
            requestSent ? "Cancel friend request to " + friend.name + "?" : "Send friend request to " + friend.name + "?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: requestSent ? "Remove" : "Send",
                    onPress: () => updateFirestoreRequest(friend, !requestSent),
                    style: "default"
                }
            ]
        )
    }

    const changeFriendState = (friend, isAlrFriend) => {
        if (isAlrFriend) {
            //Is already friend, remove
            const newList = [...friendList]
            const index1 = newList.findIndex(x => x.uid === friend.uid)
            if (index1 > -1) newList.splice(index1, 1)
            setFriendList(newList)
            const index2 = friend.friends.findIndex(x => x === user.uid)
            if (index2 > -1) friend.friends.splice(index2, 1)
            updateFriendsInFirestore(newList, friend.uid, friend.friends)
            updateFriendsInStorage(newList)
        } else {
            //Not friend yet, add
            const newList = [...friendList, friend]
            setFriendList(newList)
            friend.friends.push(user.uid)
            updateFriendsInFirestore(newList, friend.uid, friend.friends)
            updateFriendsInStorage(newList)
        }
        const newUserList = [...addUserList]
        const index3 = newUserList.findIndex(x => x.uid === friend.uid)
        newUserList[index3].friends = friend.friends
        setAddUserList(newUserList)
    }

    const showRequestDialog = (friend, accept) => {
        Alert.alert(
            (accept ? "Accept" : "Decline") + " friend request",
            (accept ? "Accept" : "Decline") + " friend request from " + friend.name + "?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: accept ? "Accept" : "Decline",
                    onPress: () => handleFriendRequest(friend, accept),
                    style: "default"
                }
            ]
        )
    }

    const goToUserProfile = async (userUID) => {
        let doc = await firestore()
            .collection("Users")
            .doc(userUID)
            .get()
        setCurrUser(doc.data())
        navigation.navigate('profile')
    }

    const handleFriendRequest = (friend, accept) => {
        //If user accepts, change the friend state
        if (accept) changeFriendState(friend, !accept)
        //If user rejects, do nothing

        // Remove request from list
        setRequestList(requestList.filter(x => x.uid !== friend.uid))

        // Remove requests from firestore
        updateFirestoreRequest(friend, false)
    }

    const renderAddFriend = (item) => {
        return (
            <View style={styles.friendButton}>
                <View style={styles.profileImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={require("../../logo/profile.jpg")}
                        resizeMode="center"
                    >
                    </Image>
                </View>
                <View style={styles.userName}>
                    <TouchableOpacity
                        onPress={async () => {
                            if (!item.uid) return
                            goToUserProfile(item.uid)
                        }}
                    >
                        <Text style={{ fontSize: 25, width: "80%", marginLeft: "5%" }}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.addFriendButton}
                    onPress={() => { showFriendDialog(item) }}
                >
                    <Icon name={myRequests.includes(item.uid) ? "person-add-disabled" : "person-add"} type="MaterialIcons" color="turquoise" size={40} />
                </TouchableOpacity>
            </View>
        )
    }

    const renderFriendRequest = (item) => {
        return (
            <View style={styles.friendButton}>
                <View style={styles.profileImageContainerRequests}>
                    <Image
                        style={styles.profileImage}
                        source={require("../../logo/profile.jpg")}
                        resizeMode="center"
                    >
                    </Image>
                </View>
                <View style={styles.userName}>
                    <TouchableOpacity
                        onPress={async () => {
                            if (!item.uid) return
                            goToUserProfile(item.uid)
                        }}
                    >
                        <Text style={{ fontSize: 25, width: "80%", marginLeft: "5%" }}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.addFriendButton}
                    onPress={() => { showRequestDialog(item, true) }}
                >
                    <Icon name={"check"} type="MaterialIcons" color="turquoise" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.addFriendButton}
                    onPress={() => { showRequestDialog(item, false) }}
                >
                    <Icon name={"clear"} type="MaterialIcons" color="turquoise" size={40} />
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(async () => {
        const mmkvInst = mmkvInstances.current[user.uid]
        if (mmkvInst) {
            setFriendList(mmkvInst.getArray("friends"))
        }

        const getFriendRequestsFromFirestore = async () => {
            let requests = await firestore()
                .collection('Users')
                .where("sentRequests", "array-contains", user.uid)
                .get()
            setRequestList(requests._docs.filter(x => x._data.friends).map(x => x._data))
        }
        getFriendRequestsFromFirestore()

        const getMyFriendRequests = async () => {
            let myReq = firestore()
                .collection("Users")
                .doc(user.uid)
            let mySentRequests = (await myReq.get()).data().sentRequests
            if (!mySentRequests) {
                mySentRequests = []
                myReq.update({ sentRequests: mySentRequests })
            }
            setMyRequests(mySentRequests)
        }
        getMyFriendRequests()

        const getUsersFromFirestore = async () => {
            let users = await firestore()
                .collection('Users')
                .where("uid", "!=", user.uid)
                .get()
            setAddUserList(users._docs.filter(x => x._data.friends).map(x => x._data))
        }
        getUsersFromFirestore()

        const getFriendsFromFirestore = async () => {
            let friends = await firestore()
                .collection('Users')
                .where("friends", "array-contains", user.uid)
                .get()
            const friend = friends._docs.map(x => x._data)
            setFriendList(friend)
            updateFriendsInStorage(friend)
        }
        getFriendsFromFirestore()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.friendContainer}>
                <Text style={styles.titleText}>Find new friends</Text>
                <TextInput
                    style={styles.search}
                    placeholder="Search users..."
                    onChangeText={(text) => setSearchUser(text.toLowerCase())}
                />
                <FlatList
                    style={styles.friendList}
                    data={(searchUser ? addUserList.filter(x => x.name.toLowerCase().includes(searchUser)) : addUserList).filter(x => !friendsUIDList.includes(x.uid))}
                    ItemSeparatorComponent={ItemSeparatorView}
                    keyExtractor={(item) => String(item.uid)}
                    renderItem={({ item }) => renderAddFriend(item)}>
                </FlatList>
            </View>
            <View style={styles.requestContainer}>
                <Text style={styles.titleText}>Friend requests</Text>
                <FlatList
                    style={styles.requestList}
                    data={requestList}
                    ItemSeparatorComponent={ItemSeparatorView}
                    keyExtractor={(item) => String(item.uid)}
                    renderItem={({ item }) => renderFriendRequest(item)}>
                </FlatList>
            </View>
        </View>
    )
}

export default addFriends

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
        paddingTop: Constants.statusBarHeight
    },
    titleText: {
        fontSize: 30,
        marginTop: 10
    },
    friendContainer: {
        alignItems: "center",
        flex: 2,
        width: "100%"
    },
    friendList: {
        width: "100%"
    },
    requestContainer: {
        alignItems: "center",
        flex: 1,
        width: "100%"
    },
    requestList: {
        marginTop: 10,
        width: "100%"
    },
    friendButton: {
        paddingVertical: 15,
        flexDirection: "row"
    },
    search: {
        fontSize: 20,
        padding: 10,
        backgroundColor: "white",
        color: "turquoise",
        borderColor: "turquoise",
        margin: 15,
        borderWidth: 2,
        width: "90%",
        borderRadius: 20
    },
    profileImageContainer: {
        flex: 3,
        marginLeft: 15
    },
    profileImageContainerRequests: {
        flex: 3,
        marginLeft: 19
    },
    profileImage: {
        flex: 1,
        borderRadius: 100,
        height: undefined,
        width: undefined
    },
    userName: {
        flex: 20,
        justifyContent: "center",
        marginLeft: 15
    },
    addFriendButton: {
        flex: 3,
        marginRight: 20
    }
})