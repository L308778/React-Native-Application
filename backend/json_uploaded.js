import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { DataContext } from "../context/dataContext";
import Constants from "expo-constants";
import firestore from "@react-native-firebase/firestore";
import Activities from "../components/data/main";
import storage from "@react-native-firebase/storage";

/*
This screen could potentially used as a loading screen. However,
we should figure out whether we actually have to use it. Here the
logo of our application gets displayed.
*/

SCREEN_HEIGHT = Dimensions.get("window").height;
SCREEN_WIDTH = Dimensions.get("window").width;

export default function Uploader(props) {

  const [download, setDownload] = useState("");

  const uploadFirebase = async () => {
    Activities.forEach(function (obj) {
      firestore().collection("Activities").doc(obj.key).set({
        id: obj.key,
        name: obj.name,
        duration: obj.duration,
        description: obj.longdescription,
        price: obj.price,
        type: obj.type,
        dollar: obj.int_price,
        image: obj.image,
      });
    });
  };

  const updateIMG = async () => {
    firestore()
      .collection("Activities")
      .get()
      .then((querySnapshot) => {
        Activities.forEach(function (obj) {
          firestore()
            .collection("Activities")
            .doc(obj.key)
            .update({
              image: obj.key + ".jpg",
            });
        });
      });
  };

  async function getDownload(ref) {
    const reference = storage().ref(ref);
    const downloadUrl = await reference.getDownloadURL();
    return downloadUrl
  }

  const updateImages = async () => {
    firestore()
      .collection("Activities")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (documentSnapshot) => {
          const image = documentSnapshot.data().image;
          const ref = `activities/${image}`;
          const url = await getDownload(ref)
          documentSnapshot.ref.update({
            image: url,
          });
          console.log(url)
        });
      });
      setDownload("")
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ alignSelf: "center", margin: 30 }}
        onPress={() => uploadFirebase()}
      >
        <Text>Upload</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: "center", margin: 30 }}
        onPress={() => updateImages()}
      >
        <Text>Upload Download URL</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignSelf: "center", margin: 30 }}
        onPress={() => updateIMG()}
      >
        <Text>Update Image Format</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: SCREEN_HEIGHT * 0.9,
    backgroundColor: "turquoise",
    flexDirection: "column",
    justifyContent: "center",
  }
});
