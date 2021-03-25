import React,{useState, useContext} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Dimensions } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import auth from '@react-native-firebase/auth';
import {DataContext} from "../../context/dataContext.js"


/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

SCREEN_HEIGHT=Dimensions.get("window").height
SCREEN_WIDTH=Dimensions.get("window").width

export default function Sign_Up (props) {
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [loading, setLoading] = useState("")

  const {signup} = useContext(DataContext)

  register = async() => {
    setLoading(true);
    try {
        const doRegister = await signup(email, password);
        setLoading(false);

        if(doRegister.user) {
            props.navigation.navigate("location");
        }
    } catch (e) {
      setLoading(false);
        Alert.alert(
            e.message
        );
    }
};

    return (
      <View style={styles.container}>
        <Image source={require("../logo/interim_logo.png")} style={styles.logo}/>
        <View style={styles.inputcontainer}>
        <TextInput
            style={styles.inputs}
            placeholder="Full Name"
            defaultValue={name}
            onChangeText={(text) => setName(text)}
            value = {name}
          />
          <TextInput
            style={styles.inputs}
            placeholder="E-mail"
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
            value = {email}
          />
          <TextInput
            style={styles.inputs}
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value = {password}
          />
          <TextInput
            style={styles.inputs}
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmpassword(text)}
            value = {confirmpassword}
          />
          <TouchableOpacity style={styles.confirmbutton} onPress={() => register()}>
            <Text style={styles.confirmbuttontext}>
                SIGN UP
            </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"white"
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 30,
    fontWeight: "100",
    justifyContent: "flex-start",
  },
  inputcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputs: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "white",
    color: "turquoise",
    borderColor: "turquoise",
    margin: 20,
    borderWidth: 2,
    width: 300,
    borderRadius: 8,
    height: "auto",
  },
  confirmbutton: {
      color: "turquoise",
      backgroundColor: "turquoise",
      borderWidth: 0,
      borderRadius: 4,
      padding: 20,
      marginTop: 30,
      width: "80%",
      alignItems:"center"
  },
  confirmbuttontext: {
      fontSize: 20,
      fontWeight: "600",
      color: "white"
  },
  logo: {
    alignSelf: "center",
    margin: 30,
    marginTop: 60
},
footerView: {
  flex: 1,
  alignItems: "center",
  marginTop: 20
},
footerText: {
  fontSize: 16,
  color: '#2e2e2d'
},
footerLink: {
  color: "#788eec",
  fontWeight: "bold",
  fontSize: 16
}
});
