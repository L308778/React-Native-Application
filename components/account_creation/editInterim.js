import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";
import { DataContext } from "../../context/dataContext.js";
import { set } from "react-native-reanimated";
import firestore from "@react-native-firebase/firestore"

/*
This is our email sign up page. We could also do something like
a phone number sign up and forward the user to a form where
he or she fill in their name etc. 
*/

SCREEN_HEIGHT = Dimensions.get("window").height;
SCREEN_WIDTH = Dimensions.get("window").width;

export default function EditInterim(props) {


  return (
    <View style={styles.container}>
        <Text style={styles.header}>
            EDIT
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("editProfilePic")}>
            <Text style={styles.buttontext}>
                PROFILE PIC
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("editPersonalInfo")}>
            <Text style={styles.buttontext}>
                PERSONAL INFO
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.navigate("profile")}>
            <Text style={styles.backbuttontext}>
                Back to Profile
            </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    backgroundColor: "white",
    marginTop:Constants.statusBarHeight
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 50,
    fontWeight: "700",
    marginVertical: SCREEN_HEIGHT * 0.1,
    letterSpacing:7,
    textShadowColor:"turquoise",
    color:"turquoise"
  },
  button: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 40,
    padding: 20,
    marginTop: 15,
    width: "80%",
    alignItems: "center",
  },
  buttontext: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  backButton: {
    color: "white",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 40,
    padding: 20,
    marginTop: SCREEN_HEIGHT*0.1,
    width: "80%",
    alignItems: "center",
    borderColor:"turquoise"
  },
  backbuttontext:{
    fontSize: 20,
    fontWeight: "400",
    color: "turquoise",
  }
});