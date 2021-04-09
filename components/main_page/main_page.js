import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import Swiper from "react-native-deck-swiper";
import { Icon } from "react-native-elements";
import Activities from "../data/main.json";
import Images from "../images/image_loader.js";
import { DataContext } from "../../context/dataContext.js";
import FlipCard from "react-native-flip-card";

SCREEN_WIDTH = Dimensions.get("window").width;
SCREEN_HEIGHT = Dimensions.get("window").width;

/*
This is our main_page where the user mainly interacts. Here we retrieve
methods and data from the context. When the user swipes right the saved
method gets invoked in the context, which is used to display the saved
activity in the saved screen. This is live. So basically every time
an activity gets saved it will appear in the save screen. The to_info
method invokes the for_info method in the context. This is used to display
the relevant information in the activity_info screen. I use a library called
Flipcard which flips the card when the user clicks it.

*/

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
            <FlipCard
              friction={10}
              perspective={3000}
              flipHorizontal={true}
              flipVertical={false}
              flip={false}
              clickable={true}
              useNativeDriver={true}
              alignHeight={true}
            >
              {/* Face Side */}
              <SafeAreaView style={styles.card}>
                <Image source={activities[index]} style={styles.image} />
                <View style={styles.innerCard}>
                  <Text style={styles.dollar}> {card.int_price} </Text>
                  <Text style={styles.text}>{card.name}</Text>
                </View>
              </SafeAreaView>

              {/* Back Side */}
              <SafeAreaView style={styles.backCard}>
                <View style={styles.backContainer}>
                  <Text style={styles.backHeader}>{card.name}</Text>
                  <Text style={styles.backText}>{card.longdescription}</Text>
                  <Text style={styles.price}> {card.price} </Text>
                  <TouchableOpacity
                    style={styles.confirmbutton}
                    onPress={() => props.navigation.navigate("main")}
                  >
                    <Text style={styles.confirmbuttontext}>BOOK</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </FlipCard>
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
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").width * 0.2,
    backgroundColor: "turquoise",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  dollar: {
    fontSize: 30,
    padding: 10,
    color: "turquoise",
    fontWeight: "400",
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
  innerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    position: "absolute",
    bottom: SCREEN_HEIGHT * 0.2,
    width: "100%",
    textAlign: "center",
  },
  backCard: {
    borderRadius: 40,
    borderWidth: 2,
    marginTop:SCREEN_HEIGHT * 0.05,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "turquoise",
    minHeight: "93%",
  },
  backHeader: {
    padding: 20,
    fontSize: 30,
    fontWeight: "400",
    color: "white",
  },
  backText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "300",
    color: "white",
    backgroundColor: "transparent",
    width: "80%",
    textAlign: "center",
  },
  backContainer: {
    alignItems: "center",
    backgroundColor: "turquoise",
  },
  price: {
    padding: 30,
    color: "white",
    fontSize: 25,
    fontWeight:"700"
  },
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderRadius: 30,
    alignItems: "center",
    padding: 10,
    width:"50%",
    marginTop: 30,
    alignSelf:"center",
    borderColor:"white",
    borderWidth:2
  },
  confirmbuttontext: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});
