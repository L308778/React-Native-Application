import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView, Dimensions } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { SliderPicker } from "react-native-slider-picker";
import Budget from "../custom/budget.js"
import People from "../custom/people.js"
import Time from "../custom/time.js"
import Feeling from "../custom/feeling.js"

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

const ScreenWidth = Dimensions.get("window").width

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isEnabled:false
    };
  }

  toggleSwitch=()=>{
    if(this.state.isEnabled == true){
      this.setState({isEnabled:false})
    }
    else{
      this.setState({isEnabled:true})
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>SETTINGS</Text>
        <View style = {styles.lineStyle} />
        <View style={styles.pushcontainer}>
          <Text style={styles.pushtext}>Push Notification</Text>
          <Switch
            style={styles.pushbutton}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={this.state.isEnabled ? "turquoise" : "#f4f3f4"}
            onValueChange={this.toggleSwitch}
            value={this.state.isEnabled}
            ios_backgroundColor="#3e3e3e"
          ></Switch>
        </View>
        <View style = {styles.lineStyle} />
        <Text style={styles.h2}>MAX DISTANCE</Text>
        <View style={styles.slider}>
          <SliderPicker
            minLabel={"0km"}
            maxLabel={"50km"}
            maxValue={50}
            callback={(position) => {
              this.setState({ value: position });
            }}
            defaultValue={this.state.value}
            labelFontColor={"turquoise"}
            style={styles.slider}
            labelFontWeight={"600"}
            fillColor={"turquoise"}
            labelFontWeight={"bold"}
            buttonBackgroundColor={"#fff"}
            buttonBorderColor={"#6c7682"}
            buttonBorderWidth={1}
            scaleNumberFontWeight={"300"}
            buttonDimensionsPercentage={9}
            heightPercentage={1}
            widthPercentage={80}
            labelFontSize={25}
          />
        </View>
        <View style = {styles.lineStyle} />
        <Budget/>
        <View style = {styles.lineStyle} />
        <People/>
        <View style = {styles.lineStyle} />
        <Feeling/>
        <View style = {styles.lineStyle} />
        <Time/>
        <View style = {styles.lineStyle} />
      </ScrollView>
    );
  }
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
  slider: {
    justifyContent: "center",
  },
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 4,
    padding: 20,
  },
  confirmbuttontext: {
    fontSize: 30,
    fontWeight: "600",
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
