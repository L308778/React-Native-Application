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

export default function ProfileCreator(props) {


  const { currUser, setCurrUser } = useContext(DataContext)

  const [name, setName] = useState(currUser.name);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [gender, setGender] = useState(currUser.gender);
  const [female, setFemale] = useState("white");
  const [male, setMale] = useState("white");
  const [age, setAge] = useState(currUser.age);
  const [single, setSingle] = useState("white");
  const [relation, setRelation] = useState("white");
  const [relationship, setRelationship] = useState(currUser.relationStatus);

  const { signup } = useContext(DataContext);

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

  const getUserNames = async (name) => {
    let userNames = (await firestore()
      .collection('Users')
      // Filter results
      .where('name', '==', name)
      .get())._docs.filter(x => x.data().uid !== currUser.uid)

    return userNames.length > 0
  }

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


  const addUser = async () => {
    let uid = currUser.uid
    await firestore()
      .collection('Users')
      .doc(uid)
      .set({
        name: name,
        age: age,
        gender: gender,
        relationStatus: relationship,
        uid: uid,
        friends: currUser.friends,
        avatar: currUser.avatar
      })
      .then(() => {
        console.log('User updated!');
      });
  }

  const confirm_profile = async () => {
    setError("")
    let dupeName = await getUserNames(name)

    if (dupeName) {
      return setError("Please use a different username")
    } else {
      const update = {
        displayName: name,
      };
      try {
        await auth().currentUser.updateProfile(update);
        setCurrUser({
          name: name,
          age: age,
          gender: gender,
          relationStatus: relationship,
          uid: currUser.uid,
          friends: currUser.friends,
          avatar: currUser.avatar
        });

        addUser()

        props.navigation.navigate("profile")
      } catch (e) {
        console.log(e)
        Alert.alert("Failed to update user\n" + e);
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>
          EDIT YOUR PROFILE
        </Text>
        <TextInput
          style={styles.inputs}
          placeholder={currUser.name}
          placeholderTextColor="grey"
          defaultValue={name}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.inputs}
          placeholder={currUser.age}
          placeholderTextColor="grey"
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
    color: "turquoise",
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
    marginTop: 10,
    paddingHorizontal: 20,
  },
  genderGroup: {
    flexDirection: "row",
    paddingVertical: SCREEN_HEIGHT * 0.02,
    alignItems: "center"
  },
  genderButton: {
    borderColor: "turquoise",
    marginHorizontal: SCREEN_WIDTH * 0.1,
    backgroundColor: "white",
    alignSelf: "center",
    padding: 30,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
  },
  relationGroup: {
    flexDirection: "row",
    paddingVertical: SCREEN_HEIGHT * 0.02,
    alignItems: "center"
  },
  relationButton: {
    borderColor: "turquoise",
    marginHorizontal: SCREEN_WIDTH * 0.1,
    backgroundColor: "white",
    alignSelf: "center",
    padding: 30,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
  },
});