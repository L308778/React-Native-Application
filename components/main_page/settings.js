import React, {useState, useContext} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
  Animated, Alert
} from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import { Icon, Slider } from "react-native-elements";
import Budget from "../custom/budget.js";
import People from "../custom/people.js";
import Time from "../custom/time.js";
import Feeling from "../custom/feeling.js";
import {DataContext} from "../../context/dataContext.js"

/*
This is our settings page. Here we have to add simulation
data to our main.json in the data folder to simulate
the location. Because we want the user to only show cards according to
his or her settings. The same applies to all the other metrics in custom
*/

const ScreenWidth = Dimensions.get("window").width;

export default function Settings (props) {
  const[value, setValue] = useState(0)
  const[isEnabled, setEnabled] = useState(false)

  const{logout} = useContext(DataContext)

  const toggleSwitch = () => {
    if (isEnabled) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  }

  const handle_logout = async() => {
    try {
      await logout()
    } catch {
      Alert.alert("Failed to log out")
    }
  }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.lineStyle} />
        <View style={styles.pushcontainer}>
          <Text style={styles.pushtext}>Push Notification</Text>
          <Switch
            style={styles.pushbutton}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "turquoise" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
            ios_backgroundColor="#3e3e3e"
          ></Switch>
        </View>
        <View style={styles.lineStyle} />
        <Text style={styles.h2}>MAX DISTANCE</Text>
        <View style={styles.slider_container}>
          <Slider
            style={styles.slider}
            value={value}
            maximumValue={300}
            minimumValue={0}
            step={10}
            onValueChange={(value) => setValue( value )}
            thumbStyle={{
              height: 40,
              width: 40,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="car"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 10, right: 20 }}
                  color="turquoise"
                />
              ),
            }}
            
          />
          <Text style={{alignSelf:"center"}}>Distance: {value}km</Text>
        </View>
        <View style={styles.lineStyle} />
        <Budget />
        <People />
        <View style={styles.lineStyle} />
        <Time />
        <View style={styles.lineStyle} />
        <Feeling />
        <View style={styles.lineStyle} />

        <TouchableOpacity style={styles.confirmbutton} onPress={() => props.navigation.navigate("tab")}>
            <Text style={styles.confirmbuttontext}>
                CONFIRM SETTINGS
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout} onPress={handle_logout}>
            <Text style={styles.logoutText}>
                LOGOUT
            </Text>
        </TouchableOpacity>

      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 40,
    fontWeight: "100",
    marginTop: Constants.statusBarHeight,
  },
  h2: {
    textAlign: "left",
    fontSize: 25,
    fontWeight: "300",
    color: "turquoise",
  },
  slider_container: {
    justifyContent: "center",
    alignItems: "stretch",
    flex: 1,
  },
  slider: {
    width: ScreenWidth * 0.8
  },
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 60,
    padding: 20,
    marginBottom: 40
  },
  confirmbuttontext: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  logout: {
    color: "red",
    backgroundColor: "red",
    borderWidth: 0,
    borderRadius: 0,
    padding: 20,
    marginBottom: 40
  },
  logoutText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "transparent",
    margin: 30,
    width: ScreenWidth * 0.8,
  },
  pushcontainer: {
    flexDirection: "row",
  },
  pushtext: {
    fontSize: 25,
    left: 0,
    color: "turquoise",
    marginRight: 20,
  },
  pushbutton: {
    marginLeft: 20,
    fontSize: 30,
  },
});
