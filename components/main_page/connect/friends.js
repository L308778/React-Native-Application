import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import firestore from "@react-native-firebase/firestore"
import { DataContext } from '../../../context/dataContext'

const friends = (props) => {
    const [friendList, setFriendList] = useState([])
    const { user, setUser } = useContext(DataContext)

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

    const renderName = (item) => {
        return (
            <TouchableOpacity
                style={styles.friendButton}
                onPress={() => switchToChatScreen(item._data.uid)}>
                <Text style={{ alignSelf: "center", fontSize: 25 }}>{item._data.name}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        const getUsersFromFirestore = async () => {
            let users = await firestore()
                .collection('Users')
                .where("uid", "!=", user.uid)
                .get()
            setFriendList(users._docs)
        }
        getUsersFromFirestore()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.chatWith}>Chat with:</Text>
            <FlatList
                style={styles.friendList}
                data={friendList}
                ItemSeparatorComponent={ItemSeparatorView}
                keyExtractor={(item) => String(item._data.uid)}
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
        marginVertical: 5
    },
    friendList: {
        flex: 1,
        width: "100%",
        marginTop: 20
    },
    friendButton: {
        paddingVertical: 15,
    }
})