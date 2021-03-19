import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Constants from "expo-constants"
import Swiper from "react-native-deck-swiper"

export default class Account_Creator extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Culture
                </Text>
        <Swiper
            cards={['Opera', 'Theater', "Museum", "Cuisine Culture", "Cinema"]}
            renderCard={(card) => {
                return (
                    <View style={styles.card}>
                        <Text style={styles.text}>{card}</Text>
                    </View>
                )
            }}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => this.props.navigation.navigate("setup_outdoor")}
            cardIndex ={0}
            backgroundColor={"turquoise"}
            stackSize = {3}
            verticalSwipe={false}
            >
        </Swiper>
    </View>)
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "turquoise"
    },
    header: {
        zIndex: 999,
        fontSize: 40,
        fontWeight: "600",
        color: "white",
        fontStyle: "italic",
        paddingTop: Constants.statusBarHeight,
        alignSelf: 'center',
    },
    card: {
      flex: 1,
      marginTop: 30,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      justifyContent: "center",
      backgroundColor: "white"
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent"
    }
  });