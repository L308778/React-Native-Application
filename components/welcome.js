import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import HomeScreen from "./home.js"
import auth from '@react-native-firebase/auth';
import Login from "./login/email_login.js"

export default function Welcome (props) {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

    useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    }, []);


    const timeoutHandle = setTimeout(()=>{
        // Add your logic for the transition
        props.navigation.navigate("home")
    }, 3000);


    if (initializing) return null;

    if(!user){
        return(
        <View style={styles.container}> 
            <Image source={require("./logo/interim_logo.png")}/>
        </View>)
    }

    else{
    return (
        <View style={styles.container}> 
            <Image source={require("./logo/interim_logo.png")}/>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:"center",
      justifyContent: "center"
    }
  });