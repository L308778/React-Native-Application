import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, Image, SafeAreaView} from "react-native";
import Constants from "expo-constants";
import Swiper from "react-native-deck-swiper";
import { Icon } from "react-native-elements";
import Activities from "../data/main.json";
import Images from "../images/image_loader.js";
import {DataContext} from "../../context/dataContext.js"

/*Here the preliminary main page with swipe activity as well as saving actions are possible.
To allow saving actions the save screen is passed here without displaying it, to allow
state being passed as the parentState prop. For some reason it is not concatting the first leftswipe*/

//let data = ['Opera', 'Theater', "Museum", "Cuisine Culture", "Cinema"]

export default function Main(props) {


  const {data, activities, save_activity, saved_activities, for_info, curr_activity} = useContext(DataContext)
  const [saved_activity, setActivity] = useState([]);


  const saved = (index) => {
    save_activity(index)
  };

  const to_info = (index) => {
    for_info(index)


    props.navigation.navigate("activity_info")
  }

  return (

    <SafeAreaView style={styles.container}>
      <Swiper
        cards={Activities}
        renderCard={(card, index) => {
          return (
            <SafeAreaView style={styles.card}>
              <Image source={activities[index]} style={styles.image} />
              <Text style={styles.text}>{card.name}</Text>
              <Text style={styles.price}>{card.price}</Text>
              <View style={{ display: "none" }}></View>
            </SafeAreaView>
          );
        }}
        onSwipedRight={(index) => saved(index)}
        onSwipedTop={(index) => to_info(index) }
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
  )}

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
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 50,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    minHeight: "90%"
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
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    color: "turquoise",
    backgroundColor: "transparent",
    fontFamily: "system font"
  },
  image: {
    height: 350,
    width: 250,
    alignSelf: "center",
    borderRadius: 40,
    marginBottom: 20
  },
  price: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "200",
    color: "turquoise",
    backgroundColor: "transparent",
    marginTop: 15,
    fontFamily: "system font"
  }
});
