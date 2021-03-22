import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import {Slider, Icon} from "react-native-elements"

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

export default class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        value : 0
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timecontainer}>
            <Text style={styles.timetext}>YOUR TIME IS </Text>
        <Text style={styles.time}>
            {this.state.value} HOURS
        </Text>
        </View>
        <View style={styles.slider_container}>
          <Slider
            style={styles.slider}
            value={this.state.value}
            maximumValue={24}
            minimumValue={0}
            step={1}
            onValueChange={(value) => this.setState({ value })}
            thumbStyle={{
              height: 40,
              width: 40,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="clock-o"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 10, right: 20 }}
                  color="turquoise"
                />
              ),
            }}
            
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent:"center",
    flexDirection: "column",
    backgroundColor: "white",
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 40,
    fontWeight: "100",
    justifyContent: "flex-start",
  },
  slider: {
    flex: 1,
    marginBottom: 0,
    justifyContent: "center",

  },
  timecontainer: {
    flex: 1,
    marginBottom: 10,
    flexDirection: "row"
  },
  timetext: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 25,
    fontWeight: "100",
    justifyContent: "flex-start",
    color: "turquoise"
  },
  time: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 25,
    fontWeight: "500",
    justifyContent: "flex-start",
    color: "turquoise"
  },
  confirmbutton: {
      color: "turquoise",
      backgroundColor: "turquoise",
      borderWidth: 0,
      borderRadius: 60,
      padding: 20,
      marginBottom: 40,
  },
  confirmbuttontext: {
      fontSize: 20,
      fontWeight: "600",
      color: "white"
  },
  slider_container: {
    justifyContent: "center",
    alignItems: "stretch",
    flex: 1,
    padding: 20,
  },
  slider: {
    width: ScreenWidth * 0.8
  },
});