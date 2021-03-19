import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { SliderPicker } from "react-native-slider-picker";

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

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
      <View style={styles.container}>
        <Text style={styles.header}>SETTINGS</Text>
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
          />
        </View>
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
    fontSize: 40,
    fontWeight: "100",
    justifyContent: "flex-start",
    marginTop: Constants.statusBarHeight,
  },
  h2: {
    textAlign: "left",
    top: 170,
    fontSize: 25,
    fontWeight: "300",
    color: "turquoise",
  },
  slider: {
    flex: 1,
    marginBottom: 0,
    justifyContent: "center",
  },
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 4,
    padding: 20,
    marginTop: 70,
  },
  confirmbuttontext: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
  },
  pushcontainer: {
    flexDirection: "row",
  },
  pushtext: {
    bottom: 90,
    fontSize: 25,
    left: 0,
    color: "turquoise",
    marginRight: 20,
  },
  pushbutton: {
    bottom: 90,
    marginLeft: 20,
    fontSize: 30,
  },
});
