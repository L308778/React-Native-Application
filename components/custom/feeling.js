import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import Constants from "expo-constants";
import {Slider, Icon} from "react-native-elements"

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

export default class Feeling extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        romantic : 0,
        relaxed : 0,
        active : 0,
        entertained: 0
    }
  }

  render() {
    return (
      <View style={styles.container}>

          <View style={styles.main_slider}>
              <Text>Romantic</Text>
              <View style={styles.slider_container}>
          <Slider
            style={styles.slider}
            value={this.state.romantic}
            maximumValue={100}
            minimumValue={0}
            step={1}
            onValueChange={(romantic) => this.setState({ romantic })}
            thumbStyle={{
              height: 40,
              width: 40,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="heart"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 10, right: 20 }}
                  color="turquoise"
                />
              ),
            }}
            
          />
          <Text style={{alignSelf:"center"}}>Romance: {this.state.romantic}%</Text>
        </View>
        <Text>Relaxed</Text>
        <View style={styles.slider_container}>
          <Slider
            style={styles.slider}
            value={this.state.relaxed}
            maximumValue={100}
            minimumValue={0}
            step={1}
            onValueChange={(relaxed) => this.setState({ relaxed })}
            thumbStyle={{
              height: 40,
              width: 40,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="hand-peace-o"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 10, right: 20 }}
                  color="turquoise"
                />
              ),
            }}
            
          />
          <Text style={{alignSelf:"center"}}>Relaxed: {this.state.relaxed}%</Text>
        </View>
        <Text>Active</Text>
        <View style={styles.slider_container}>
          <Slider
            style={styles.slider}
            value={this.state.active}
            maximumValue={100}
            minimumValue={0}
            step={1}
            onValueChange={(active) => this.setState({ active })}
            thumbStyle={{
              height: 40,
              width: 40,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="commenting"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 10, right: 20 }}
                  color="turquoise"
                />
              ),
            }}
            
          />
          <Text style={{alignSelf:"center"}}>Active: {this.state.active}%</Text>
        </View>
        <Text>
            Entertained
        </Text>
        <View style={styles.slider_container}>
          <Slider
            style={styles.slider}
            value={this.state.entertained}
            maximumValue={100}
            minimumValue={0}
            step={1}
            onValueChange={(entertained) => this.setState({ entertained })}
            thumbStyle={{
              height: 40,
              width: 40,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="podcast"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 10, right: 20 }}
                  color="turquoise"
                />
              ),
            }}
            
          />
          <Text style={{alignSelf:"center"}}>Entertain: {this.state.entertained}%</Text>
        </View>
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
    width: Dimensions.get("window").width
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 30,
    fontWeight: "100",
    justifyContent: "flex-start",
  },
  main_slider: {
    flex: 1,
    marginBottom: 0,
    justifyContent: "center",

  },
  peoplecontainer: {
    flex: 1,
    marginBottom: 10,
    flexDirection: "row"
  },
  people: {
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