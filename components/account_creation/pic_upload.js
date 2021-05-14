import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";
import { DataContext } from "../../context/dataContext.js";
import { Icon } from "react-native-elements";
import { set } from "react-native-reanimated";
import firestore from "@react-native-firebase/firestore"
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";

/*
This is our email sign up page. We could also do something like
a phone number sign up and forward the user to a form where
he or she fill in their name etc. 
*/

SCREEN_HEIGHT = Dimensions.get("window").height;
SCREEN_WIDTH = Dimensions.get("window").width;

export default function PicUpload(props) {

  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("")
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});
  const [finished, setFinished] = useState(false)


  const onMediaSelect = async (media) => {
    setUploading(false)
    if (!media.didCancel) {
      setUploading(true);
      const uid = auth().currentUser.uid
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
        setFinished(true)
        
      });
    }
  };

  const confirmPic = () => {
      props.navigation.navigate("profileCreator", {
          image: downloadURL
      })
  }

  const onTakePhoto = () => launchCamera({ mediaType: "image" }, onMediaSelect);

  const onSelectImagePress = () =>
    launchImageLibrary({ mediaType: "image" }, onMediaSelect);


    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.profileImage}>
            {finished ? <Image source ={{uri:downloadURL}} style={styles.profileImage}/>: <Icon name="user" type="evilicon" color="white" size={200}/>}
        </TouchableOpacity>
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
          onPress={() => onSelectImagePress()}
        >
          <Text style={styles.panelButtonTitle}>Choose Photo From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton3}
          onPress={() => confirmPic()}
        >
          <Text style={styles.panelButtonTitle}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: "turquoise"
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
      padding: 20,
      borderRadius: 10,
      backgroundColor: "white",
      alignItems: "center",
      alignSelf:"center",
      width: "80%",
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
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        alignSelf:"center",
        margin: 40
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
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    statusText: {
      marginTop: 20,
      fontSize: 20,
    },
  });