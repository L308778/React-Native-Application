import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from "react-native-elements";
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import firestore from "@react-native-firebase/firestore"
import { DataContext } from '../../../context/dataContext'

const friends = (props) => {
    const [friendList, setFriendList] = useState([])
    const [addUserList, setAddUserList] = useState([])
    const [searchUser, setSearchUser] = useState("")
    const [searchFriend, setSearchFriend] = useState("")
    const { user, setUser, mmkvInstances } = useContext(DataContext)

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

    const switchToChatScreen = (friendUID) => {
        props.navigation.navigate("chat", { otherUID: friendUID })
    }

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

    const renderName = (item) => {
        return (
            <TouchableOpacity
                style={styles.friendButton}
                onPress={() => switchToChatScreen(item.uid)}>
                <Text style={{ alignSelf: "center", fontSize: 25 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const renderAddFriend = (item) => {
        return (
            <TouchableOpacity
                style={{ ...styles.friendButton, flexDirection: "row" }}
                onPress={() => changeFriendState(item)}>
                <Text style={{ fontSize: 25, width: "80%", marginLeft: "5%" }}>{item.name}</Text>
                <Icon name={item.friends.includes(user.uid) ? "person-add-disabled" : "person-add"} type="MaterialIcons" color="turquoise" size={40}
                />
            </TouchableOpacity>
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
            setAddUserList(users._docs.map(x => x._data))
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
            <Text style={styles.chatWith}>Add friends:</Text>
            <TextInput
                style={styles.search}
                placeholder="Search name..."
                onChangeText={(text) => setSearchUser(text.toLowerCase())}
            />
            <FlatList
                style={styles.friendList}
                data={searchUser ? addUserList.filter(x => x.name.toLowerCase().includes(searchUser)) : addUserList}
                ItemSeparatorComponent={ItemSeparatorView}
                keyExtractor={(item) => String(item.uid)}
                renderItem={({ item }) => renderAddFriend(item)}>
            </FlatList>
            <Text style={styles.chatWith}>Chat with:</Text>
            <TextInput
                style={styles.search}
                placeholder="Search friend..."
                onChangeText={(text) => setSearchFriend(text.toLowerCase())}
            />
            <FlatList
                style={styles.friendList}
                data={searchFriend ? friendList.filter(x => x.name.toLowerCase().includes(searchFriend)) : friendList}
                ItemSeparatorComponent={ItemSeparatorView}
                keyExtractor={(item) => String(item.uid)}
                renderItem={({ item }) => renderName(item)}>
            </FlatList>
        </View>
    )
}

export default friends

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
    },
    chatWith: {
        fontSize: 30,
        marginTop: 10
    },
    friendList: {
        flex: 1,
        width: "100%",
        height: "45%"
    },
    friendButton: {
        paddingVertical: 15,
    },
    search: {
        fontSize: 25,
        padding: 10,
        backgroundColor: "white",
        color: "turquoise",
        borderColor: "turquoise",
        margin: 15,
        borderWidth: 2,
        width: "70%",
        borderRadius: 20
    },
})