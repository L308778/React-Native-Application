import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

export default class Suggestion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputcontainer}>
          <TouchableOpacity style={styles.button_1} onPress={() => this.props.navigation.navigate("budget")}>
              <Text style={styles.buttontext}>
                  CUSTOMIZE
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_2} onPress={() => this.props.navigation.navigate("tab")}>
            <Text style={styles.buttontext}>
                I'M FEELING LUCKY
            </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
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
    fontSize: 25,
    fontWeight: "100",
    alignSelf:"center",
    justifyContent: "flex-start",
    top: 150,
    marginBottom: 40,
    fontFamily:"system font",
    color:"turquoise"
  },
  inputcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  button_1: {
      color: "turquoise",
      backgroundColor: "turquoise",
      borderWidth: 0,
      borderRadius: 4,
      padding: 20,
      marginTop: 30,
  },
  button_2: {
    color: "gold",
    backgroundColor: "gold",
    borderWidth: 0,
    borderRadius: 4,
    padding: 20,
    marginTop: 30,
    },

  buttontext: {
      fontSize: 30,
      fontWeight: "600",
      color: "white"
  },
});