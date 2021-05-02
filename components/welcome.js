import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import Activities from "./data/main.js"
import { DataContext } from "../context/dataContext";
import Constants from "expo-constants";
import firestore from "@react-native-firebase/firestore"

/*
This screen could potentially used as a loading screen. However,
we should figure out whether we actually have to use it. Here the
logo of our application gets displayed.
*/

SCREEN_HEIGHT = Dimensions.get("window").height
SCREEN_WIDTH = Dimensions.get("window").width

export default function Welcome(props) {

    const {user} = useContext(DataContext)


    useEffect(() => {
        setTimeout(() => {
            // Add your logic for the transition
            props.navigation.navigate("location")
        }, 4000);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>
                TRIPPY
          </Text>
            <View style={styles.textContainer}>
                <Text style={styles.welcome}>
                    Welcome
            </Text>
                <Text style={styles.name}>
                    {user.displayName}
            </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: SCREEN_HEIGHT * 0.9,
        backgroundColor: "turquoise",
        flexDirection: "column"
    },
    textContainer: {
        flexDirection: "column",
        marginVertical: SCREEN_HEIGHT * 0.2,
        alignItems: "center"
    },
    welcome: {
        fontSize: 50,
        fontWeight: "300",
        color: "white",
        marginVertical: SCREEN_HEIGHT * 0.05
    },
    name: {
        fontSize: 40,
        fontWeight: "800",
        color: "white"
    },
    header: {
        paddingTop: Constants.statusBarHeight,
        fontSize: 68,
        top: 100,
        justifyContent: "center",
        fontWeight: "100",
        borderWidth: 2,
        borderRadius: 90,
        color: "white",
        borderColor: "white",
        marginBottom: 120
    },
});