import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from 'react-native-elements'
import Constants from "expo-constants"
import GeoLocation from "@react-native-community/geolocation"
import MapView,{PROVIDER_GOOGLE} from "react-native-maps";
import {DataContext} from "../context/dataContext.js"

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/


const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;

export default function LocationScreen (props){

  const[lat, setLatitude] = useState(40)
  const[long, setLongitude] = useState(127)
  const {change_location} = useContext(DataContext)

  console.log(lat, long)
  const findCoordinates = () => {
		GeoLocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position.coords);
        var lat =parseFloat(position.coords.latitude)
        var long =parseFloat(position.coords.longitude)
        console.log(lat, long)
        setLatitude(lat)
        setLongitude(long)
        change_location({latitude: lat, longitude: long})
        setTimeout(function(){props.navigation.navigate("suggestion")}, 2000)
			},
			error => Alert.alert(error.message),
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
          latitude:lat,
          longitude:long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}/>
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