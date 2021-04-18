import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import Activities from "./data/main.js"
import { DataContext } from "../context/dataContext";

/*
This screen could potentially used as a loading screen. However,
we should figure out whether we actually have to use it. Here the
logo of our application gets displayed.
*/

export default function Welcome(props) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const timeoutHandle = setTimeout(() => {
        // Add your logic for the transition
        props.navigation.navigate("login")
    }, 2000);


    if (initializing) return null;

    if (!user) {
        return (
            <View style={styles.container}>
                <Image source={require("./logo/interim_logo.png")} />
            </View>)
    } else {
        return (
            <View style={styles.container}>
                <Image source={require("./logo/interim_logo.png")} />
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});