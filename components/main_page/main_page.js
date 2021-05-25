import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  AppState
} from "react-native";
import Constants from "expo-constants";
import Swiper from "react-native-deck-swiper";
import { Icon } from "react-native-elements";
import Activities from "../data/main.js";
import { DataContext } from "../../context/dataContext.js";
import FlipCard from "react-native-flip-card";
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth";

SCREEN_WIDTH = Dimensions.get("window").width;
SCREEN_HEIGHT = Dimensions.get("window").height;

/*
This is our main_page where the user mainly interacts. Here we retrieve
methods and data from the context. When the user swipes right the saved
method gets invoked in the context, which is used to display the saved
activity in the saved screen. This is live. So basically every time
an activity gets saved it will appear in the save screen. The to_info
method invokes the for_info method in the context. This is used to display
the relevant information in the activity_info screen. I use a library called
Flipcard which flips the card when the user clicks it.

https://github.com/leecade/react-native-swiper

*/

export default function Main(props) {


  const {
    saved,
    activities,
    for_info,
    addDiscard,
    discarded,
    saved_activities,
    currUser,
    currActivity,
    setCurrActivity,
    user,
    allUsers,
    savedTracking
  } = useContext(DataContext);

  const [saved_activity, setActivity] = useState([]);
  const [appState, setAppState] = useState(AppState.currentState)
  const [checker, setChecker] = useState("")

  const to_info = (index) => {
    setCurrActivity(activities[index]);
    props.navigation.navigate("activity_info");
  };

  const stored = (index) => {
    saved(index)
    checkUserMatches(index)
  }

  const handleAppStateChange = (state) => {
    setAppState(state);
  }


  const updateDiscarded = async () => {
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .update({
        discarded: discarded,
        stored: savedTracking
      })
      .then(() => {
        console.log(currUser.avatar);
      });
  }

  const checkUserMatches = (index) => {
    const key = activities[index].id
    
    //console.log(savedTracking)
    let matchUsers = allUsers.filter(otherUser => otherUser && otherUser.uid !== user.uid && otherUser.stored && otherUser.stored.filter(activity => activity.id && activity.id === key).length > 0)
    console.log(matchUsers)
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    console.log(appState)
    return (() => {
      AppState.removeEventListener('change', handleAppStateChange);
    })
  }, [])

  useEffect(() => {
    //console.log(activities)
    if ((appState == "inactive" | appState == "background") & (discarded != currUser.discarded | stored != currUser.stored)) {
      updateDiscarded()
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        cards={activities}
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
                <Image source={{ uri: card.image }} style={styles.image} />
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
        onSwipedRight={(index) => stored(index)}
        onSwipedLeft={(index) => addDiscard(index)}
        onSwipedTop={(index) => to_info(index)}
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }}
        onSwipedAll={() => console.log("Yes")}
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
    marginTop: SCREEN_HEIGHT * 0.05,
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
    fontWeight: "700"
  },
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderRadius: 30,
    alignItems: "center",
    padding: 10,
    width: "50%",
    marginTop: 30,
    alignSelf: "center",
    borderColor: "white",
    borderWidth: 2
  },
  confirmbuttontext: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});
