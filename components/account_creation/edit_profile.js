import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { DataContext } from "../../context/dataContext";
import { Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { BottomSheet } from "react-native-elements";
import storage from "@react-native-firebase/storage";

/*
This is our profile page and it is a bit rushed, because I think
we can use a react native table or something for that.
*/

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function EditProfile(props) {

  const { user, currUser, setCurrUser } = useContext(DataContext);

  const [isVisible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [relation, setRelation] = useState("");
  const [gender, setGender] = useState("");
  const [opacity, setOpacity] = useState(1);
  const [image, setImage] = useState(auth().currentUser.photoURL);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("")
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});

  const photoPopup = (bool, opacity) => {
    setOpacity(opacity);
    setVisible(bool);
  };
  const addUser = async () => {
    uid = auth().currentUser.uid;
    await firestore()
      .collection("Users")
      .doc(uid)
      .update({
        name: name,
        age: age,
        relationStatus: relation,
        gender: gender,
        avatar: downloadURL
      })
      .then(() => {
        console.log("User added!");
      });
  };

  const updateUser = async () => {
    addUser();
    setCurrUser({
      name: name,
      age: age,
      relationStatus: relation,
      gender: gender,
      avatar: downloadURL
    });
    const update = {
      displayName: name,
    };
    try {
      await auth().currentUser.updateProfile(update);
    } catch (e) {
      Alert.alert("Failed to update user\n" + e);
    }
    props.navigation.navigate("profile");
  };

  const onMediaSelect = async (media) => {
    setUploading(false)
    if (!media.didCancel) {
      setUploading(true);
      const uid = user.uid
      const reference = storage().ref(`users/avatar/${uid}`);
      const task = reference.putFile(media.uri);
      task.on('state_changed', (taskSnapshot) => {
        setUploadTaskSnapshot(taskSnapshot);
      });
      task.then(async () => {
        const downloadURL = await reference.getDownloadURL();
        setDownloadURL(downloadURL);
        setUploading(false);
        setUploadTaskSnapshot({});
        auth().currentUser.updateProfile({ photoURL: downloadURL })
      });
    }
  };

  const onTakePhoto = () => launchCamera({ mediaType: "image" }, onMediaSelect);

  const onSelectImagePress = () =>
    launchImageLibrary({ mediaType: "image" }, onMediaSelect);

  const renderInner = () => {
    return (
      <View style={styles.panel}>
        {uploading && (
          <View style={styles.uploading}>
            <ActivityIndicator size={60} color="#47477b"></ActivityIndicator>
            <Text style={styles.statusText}>
              {`${(
                (uploadTaskSnapshot.bytesTransferred /
                  uploadTaskSnapshot.totalBytes) *
                100
              ).toFixed(2)}% / 100%`}
            </Text>
          </View>
        )}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <TouchableOpacity
          style={styles.panelButton1}
          onPress={() => onTakePhoto()}
        >
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton2}
          onPress={() => onTakeVideo()}
        >
          <Text style={styles.panelButtonTitle}>Take Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton2}
          onPress={() => onSelectImagePress()}
        >
          <Text style={styles.panelButtonTitle}>Choose Photo From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton2}
          onPress={() => onSelectVideoPress()}
        >
          <Text style={styles.panelButtonTitle}>Choose Video From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton3}
          onPress={() => photoPopup(false, 1)}
        >
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { opacity: opacity }]}>
      <ScrollView style={{ flexGrow: 1 }}>
        <BottomSheet isVisible={isVisible}>{renderInner()}</BottomSheet>
        <TouchableOpacity onPress={() => photoPopup(true, 0.1)}>
          <Image source={{uri:image}} style={styles.image} />
        </TouchableOpacity>

        <View style={styles.action}>
          <Text style={styles.headerText}>Username</Text>
          <TextInput
            placeholder={currUser.name}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.headerText}>Age</Text>
          <TextInput
            placeholder={currUser.age}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(text) => setAge(text)}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.headerText}>Gender</Text>
          <TextInput
            placeholder={currUser.gender}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(text) => setGender(text)}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.headerText}>Love Status</Text>
          <TextInput
            placeholder={currUser.relationStatus}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(text) => setRelation(text)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: SCREEN_WIDTH,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={styles.commandButton1}
            onPress={() => props.navigation.navigate("profile")}
          >
            <Text style={styles.panelButtonTitle1}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.commandButton2}
            onPress={() => updateUser()}
          >
            <Text style={styles.panelButtonTitle2}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  commandButton1: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    margin: 10,
    width: "40%",
  },
  commandButton2: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "turquoise",
    alignItems: "center",
    margin: 10,
    width: "40%",
  },
  panel: {
    padding: 20,
    paddingTop: 20,
  },
  header: {
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton1: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "turquoise",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButton2: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "turquoise",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButton3: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle1: {
    fontSize: 17,
    fontWeight: "bold",
    color: "turquoise",
  },
  panelButtonTitle2: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    textAlign: "justify",
    padding: 12,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    marginTop: 10,
    fontSize: 18,
    color: "#05375a",
    borderColor: "turquoise",
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 10,
    borderRadius: 30,
    borderWidth: 2,
  },
  headerText: {
    fontSize: 15,
    fontFamily: "HelveticaNeue",
  },
  image: {
    borderRadius: 100,
    height: 200,
    width: 200,
    alignSelf: "center",
  },
  center: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  uploading: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginTop: 20,
    fontSize: 20,
  },
});
