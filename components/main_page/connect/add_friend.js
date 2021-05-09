import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Icon } from "react-native-elements";
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import firestore from "@react-native-firebase/firestore"
import { DataContext } from '../../../context/dataContext'
import Constants from "expo-constants";

const addFriends = ({ navigation }) => {
    const [friendList, setFriendList] = useState([])
    const [addUserList, setAddUserList] = useState([])
    const [searchUser, setSearchUser] = useState("")
    const { user, mmkvInstances, setCurrUser } = useContext(DataContext)

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

    const changeFriendState = (friend) => {
        if (friend.friends.includes(user.uid)) {
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
                            let doc = await firestore()
                                .collection("Users")
                                .doc(item.uid)
                                .get()
                            setCurrUser(doc.data())
                            navigation.navigate('profile')
                        }}
                    >
                        <Text style={{ fontSize: 25, width: "80%", marginLeft: "5%" }}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.addFriendButton}
                    onPress={() => { changeFriendState(item) }}
                >
                    <Icon name={item.friends.includes(user.uid) ? "person-add-disabled" : "person-add"} type="MaterialIcons" color="turquoise" size={40} />
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(() => {
        const mmkvInst = mmkvInstances.current[user.uid]
        if (mmkvInst) {
            setFriendList(mmkvInst.getArray("friends"))
        }

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
            <Text style={styles.chatWith}>Find new friends</Text>
            <TextInput
                style={styles.search}
                placeholder="Search users..."
                onChangeText={(text) => setSearchUser(text.toLowerCase())}
            />
            <FlatList
                style={styles.friendList}
                data={searchUser ? addUserList.filter(x => x.name.toLowerCase().includes(searchUser)) : addUserList}
                ItemSeparatorComponent={ItemSeparatorView}
                keyExtractor={(item) => String(item.uid)}
                renderItem={({ item }) => renderAddFriend(item)}>
            </FlatList>
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
    chatWith: {
        fontSize: 30,
        marginTop: 10
    },
    friendList: {
        flex: 1,
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