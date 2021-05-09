import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Icon } from "react-native-elements";
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import firestore from "@react-native-firebase/firestore"
import { DataContext } from '../../../context/dataContext'
import Constants from "expo-constants";

const friends = ({ navigation }) => {
    const [friendList, setFriendList] = useState([])
    const [searchFriend, setSearchFriend] = useState("")
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

    const switchToChatScreen = (friendUID) => {
        navigation.navigate("chat", { otherUID: friendUID })
    }

    const updateFriendsInStorage = (newFriends) => {
        const mmkvInst = mmkvInstances.current[user.uid]
        if (mmkvInst) mmkvInst.setArray("friends", newFriends)
    }

    const renderName = (item) => {
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
                <View style={styles.friendName}>
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
                        <Text style={{ fontSize: 25 }}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => switchToChatScreen(item.uid)}
                    style={styles.chatButton}
                >
                    <Text style={{ fontSize: 20, padding: 5 }}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.matchedButton}
                >
                    <Text style={{ fontSize: 20, padding: 5 }}>3</Text>
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            const mmkvInst = mmkvInstances.current[user.uid]
            if (mmkvInst) {
                setFriendList(mmkvInst.getArray("friends"))
            }

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
        })

        return focusListener
    }, [navigation])

    return (
        <View style={styles.container}>
            <View style={styles.connectWithContainer}>
                <Text style={styles.connectWith}>Connect with</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("addFriend")}
                    style={{ flex: 1, marginRight: "8%", marginTop: "2%" }}
                >
                    <Icon name={"person-add"} type="MaterialIcons" color="black" size={40}></Icon>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.search}
                placeholder="Search friends..."
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
        paddingTop: Constants.statusBarHeight
    },
    connectWithContainer: {
        flexDirection: "row",
        marginTop: 10
    },
    connectWith: {
        flex: 1,
        fontSize: 30,
        width: "90%",
        marginLeft: "5%"
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
    chatButton: {
        flex: 3,
        borderRadius: 5,
        color: "turquoise",
        backgroundColor: "turquoise",
        marginLeft: 10
    },
    matchedButton: {
        flex: 1,
        borderRadius: 5,
        color: "yellow",
        backgroundColor: "yellow",
        marginLeft: 15,
        marginRight: 20
    },
    friendName: {
        flex: 20,
        justifyContent: "center",
        marginLeft: 15
    }
})