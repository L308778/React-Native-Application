import React, { useState, useContext } from "react";
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
  SafeAreaView
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

export default function Sign_Up(props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [gender, setGender] = useState("");
  const [female, setFemale] = useState("white");
  const [male, setMale] = useState("white");
  const [age, setAge] = useState("");
  const [single, setSingle] = useState("white");
  const [relation, setRelation] = useState("white");
  const [relationship, setRelationship] = useState("");

  const {signup} = useContext(DataContext);

  const getGender = (incom_gender) => {
    setGender(incom_gender);
    if (incom_gender == "male") {
      setMale("turquoise");
      setFemale("white");
    } else {
      setFemale("turquoise");
      setMale("white");
    }
  };

  const getRelation = (incom_relation) => {
    setRelationship(incom_relation);
    if (incom_relation == "single") {
      setSingle("turquoise");
      setRelation("white");
    } else {
      setRelation("turquoise");
      setSingle("white");
    }
  };


  const addUser = async() => {
        firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .add({
          name: name,
          age: age,
          gender: gender,
          relationStatus: relationship,
          uid: auth().currentUser.uid
        })
        .then(() => {
          console.log('User added!');
        });
  }

  const confirm_profile = async() => {

    if (!name || !gender || !age || !relationship){
        return setError("Please fill in all required fields");
    }
    else{

        const update = {
            displayName: name,
          };
        try{
            await auth().currentUser.updateProfile(update);
        }catch (e) {
            Alert.alert("Failed to update user\n" + e);
        }
    }

    addUser()

    props.navigation.navigate("welcome")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>
            Create your Profile
        </Text>
        <TextInput
          style={styles.inputs}
          placeholder="Name"
          defaultValue={name}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Age"
          defaultValue={age}
          onChangeText={(text) => setAge(text)}
          value={age}
        />
        <View style={styles.genderGroup}>
          <TouchableOpacity
            style={{
              borderColor: "turquoise",
              marginHorizontal: SCREEN_WIDTH * 0.1,
              padding: 30,
              borderRadius: 30,
              borderWidth: 2,
              justifyContent: "center",
              backgroundColor: male,
            }}
            onPress={() => getGender("male")}
          >
            <Text>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: "turquoise",
              marginHorizontal: SCREEN_WIDTH * 0.1,
              padding: 30,
              borderRadius: 30,
              borderWidth: 2,
              justifyContent: "center",
              backgroundColor: female,
            }}
            onPress={() => getGender("female")}
          >
            <Text>Female</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.relationGroup}>
          <TouchableOpacity
            style={{
              borderColor: "turquoise",
              marginHorizontal: SCREEN_WIDTH * 0.1,
              padding: 30,
              borderRadius: 30,
              borderWidth: 2,
              justifyContent: "center",
              backgroundColor: single,
            }}
            onPress={() => getRelation("single")}
          >
            <Text>Single</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: "turquoise",
              marginHorizontal: SCREEN_WIDTH * 0.07,
              paddingVertical: 30,
              paddingHorizontal: 20,
              borderRadius: 30,
              borderWidth: 2,
              justifyContent: "center",
              backgroundColor: relation,
            }}
            onPress={() => getRelation("relation")}
          >
            <Text>Relationship</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={loading}
          style={styles.confirmbutton}
          onPress={() => confirm_profile()}
        >
          <Text style={styles.confirmbuttontext}>Confirm Profile</Text>
        </TouchableOpacity>
        {error != "" && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 30,
    fontWeight: "800",
    color:"turquoise",
    marginBottom: SCREEN_HEIGHT * 0.1
  },
  inputs: {
    fontSize: 17,
    padding: 10,
    backgroundColor: "white",
    color: "turquoise",
    borderColor: "turquoise",
    margin: 15,
    borderWidth: 2,
    width: 300,
    borderRadius: 30,
    height: "auto",
  },
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 40,
    padding: 20,
    marginTop: 15,
    width: "80%",
    alignItems: "center",
  },
  confirmbuttontext: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  logo: {
    alignSelf: "center",
    margin: 30,
    marginTop: 60,
  },
  registerTextStyle: {
    color: "turquoise",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 30,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    paddingHorizontal: 20,
  },
  genderGroup: {
    flexDirection: "row",
    paddingVertical: SCREEN_HEIGHT * 0.02,
    alignItems:"center"
  },
  genderButton: {
    borderColor: "turquoise",
    marginHorizontal: SCREEN_WIDTH * 0.1,
    backgroundColor: "white",
    alignSelf:"center",
    padding: 30,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
  },
  relationGroup: {
    flexDirection: "row",
    paddingVertical: SCREEN_HEIGHT * 0.02,
    alignItems:"center"
  },
  relationButton: {
    borderColor: "turquoise",
    marginHorizontal: SCREEN_WIDTH * 0.1,
    backgroundColor: "white",
    alignSelf:"center",
    padding: 30,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
  },
});