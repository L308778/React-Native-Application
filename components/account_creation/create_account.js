import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from "expo-constants"

export default class Account_Creator extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Home
            </Text>
                <View style={styles.buttoncontainer}>
                    <TouchableOpacity style={styles.touchables} onPress={() => this.props.navigation.navigate("basic_setup")}>
                        <Text style={styles.touchable_text}>
                            SIGN UP WITH GOOGLE
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchables} onPress={() => this.props.navigation.navigate("basic_setup")}>
                        <Text style={styles.touchable_text}>
                            SIGN UP WITH FACEBOOK
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchables} onPress={() => this.props.navigation.navigate("basic_setup")}>
                        <Text style={styles.touchable_text}>
                            SIGN UP WITH APPLE
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchables} onPress={() => this.props.navigation.navigate("email_sign_up")}>
                        <Text style={styles.touchable_text}>
                            SIGN UP WITH EMAIL
                </Text>
                    </TouchableOpacity>
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    header: {
        paddingTop: Constants.statusBarHeight,
        fontSize: 30,
        fontWeight: "100",
        justifyContent: 'flex-start',
    },
    buttoncontainer: {
        justifyContent: "center",
        flex: 1
    },
    touchables: {
        padding: 40,
        marginBottom: 20,
        backgroundColor: "white",
        color: '#008f68',
    },
    touchable_text: {
        fontSize: 20,
        fontWeight: "300"
    }
})