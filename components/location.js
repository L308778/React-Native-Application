import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from 'react-native-elements'
import Constants from "expo-constants"
import GeoLocation from "@react-native-community/geolocation"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { DataContext } from "../context/dataContext.js"

/*
This is the location screen. The user will be asked through the 
Geolocation package whether he agrees to share location. If yes
a marker will appear on the map and the user continues to the mainpage.
Here we have to implement a dropdown or something where the user can choose in which
area he or she is, in the case they do not allow location
*/


const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;

export default function LocationScreen(props) {

  const [lat, setLatitude] = useState(40)
  const [long, setLongitude] = useState(127)
  const { on_location } = useContext(DataContext)

  console.log(lat, long)
  const findCoordinates = () => {
    GeoLocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position.coords);
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)
        console.log(lat, long)
        setLatitude(lat)
        setLongitude(long)
        on_location({ latitude: lat, longitude: long })
        setTimeout(function () {
          props.navigation.navigate("tab");
        }, 2000)
      },
      error => {
        Alert.alert(error.message);
        props.navigation.navigate("tab");
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <View style={styles.container}>
      <Text>

      </Text>
      <View style={styles.inputcontainer}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }} />
        <TouchableOpacity style={styles.confirmbutton} onPress={findCoordinates}>
          <Text style={styles.confirmbuttontext}>
            FIND ME
            </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 40,
    top: 100,
    fontWeight: "100",
    justifyContent: "flex-start",
  },
  inputcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 80,
    padding: 20,
    marginTop: 70,
  },
  confirmbuttontext: {
    fontSize: 20,
    fontWeight: "400",
    color: "white"
  },
  map: {
    height: 300,
    width: 350,
    borderRadius: 30
  }
});