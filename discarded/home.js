import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Constants from "expo-constants"

export default class Home extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){
        console.log(this.props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image}/>
                <View style={styles.buttoncontainer}>
                    <TouchableOpacity style={styles.touchables} onPress={() => this.props.navigation.navigate("phone_verification")}>
                        <Text style={styles.touchable_text}>
                            NEW TO TRIPPY
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchables} onPress={()=> this.props.navigation.navigate("login")}>
                        <Text style={styles.touchable_text}>
                            MEMBER
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
    image: {
        marginTop: 50,
    },
    buttoncontainer: {
        justifyContent: "center",
        flex: 1,
        width: "80%"
    },
    touchables: {
        padding: 40,
        marginBottom: 20,
        backgroundColor: "turquoise",
        borderRadius: 30,
        alignItems:"center",
    },
    touchable_text: {
        fontSize: 20,
        fontWeight: "600",
        color:"white"

    }
})