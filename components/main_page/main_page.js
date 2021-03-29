import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import Swiper from "react-native-deck-swiper";
import { Icon } from "react-native-elements";
import Activities from "../data/main.json";
import Images from "../images/image_loader.js";
import { DataContext } from "../../context/dataContext.js";

SCREEN_WIDTH=Dimensions.get("window").width
SCREEN_HEIGHT=Dimensions.get("window").width

/*
Change the price to int and add*/
//let data = ['Opera', 'Theater', "Museum", "Cuisine Culture", "Cinema"]

export default function Main(props) {
  const {
    data,
    activities,
    saved,
    saved_activities,
    for_info,
    curr_activity,
  } = useContext(DataContext);
  const [saved_activity, setActivity] = useState([]);


  const to_info = (index) => {
    for_info(index);
    props.navigation.navigate("activity_info");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        cards={Activities}
        renderCard={(card, index) => {
          return (
            <SafeAreaView style={styles.card}>
              <Image source={activities[index]} style={styles.image} />
              <View style={styles.innerCard}>
                <Text style={styles.dollar}> {card.int_price} </Text>
                <Text style={styles.text}>{card.name}</Text>
                </View>
            </SafeAreaView>
          );
        }}
        onSwipedRight={(index) => saved(index)}
        onSwipedTop={(index) => to_info(index)}
        onSwiped={(cardIndex) => {
          console.log("Yes");
        }}
        onSwipedAll={() => console.log("Yes")}
        cardIndex={0}
        backgroundColor={"turquoise"}
        stackSize={2}
        infinite
      ></Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "turquoise",
    flexDirection: "column",
  },
  iconcontainer: {
    flex: 1,
    width: 300,
    minWidth: window.innerWidth,
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: Constants.statusBarHeight,
  },
  header: {
    fontSize: 40,
    fontWeight: "600",
    color: "white",
    fontStyle: "italic",
    paddingTop: Constants.statusBarHeight,
    alignSelf: "center",
  },
  card: {
    borderRadius: 40,
    borderWidth: 2,
    marginBottom: 50,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    minHeight: "90%",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "400",
    color: "turquoise",
    backgroundColor: "transparent",
  },
  image: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 40,
  },
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
      width: Dimensions.get('window').width * 0.2,
      height: Dimensions.get('window').width * 0.2,
      backgroundColor:'turquoise',
      justifyContent: 'center',
      alignSelf:"center",
      alignItems: "center"
    
  },
  dollar: {
    fontSize: 30,
    padding: 10,
    color: "turquoise",
    fontWeight:"700"
  },
  price: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "200",
    color: "turquoise",
    backgroundColor: "transparent",
    marginTop: 15,
    fontFamily: "system font",
  },
  profile: {
    top: 10,
    left: 0,
  },
  settings: {
    top: 10,
    left: 20,
  },
  save: {
    top: 10,
  },
  innerCard:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"rgba(0,0,0,0.3)",
    position:"absolute",
    bottom: SCREEN_HEIGHT * 0.2,
    width:"100%",
    textAlign:"center"
  }

});
