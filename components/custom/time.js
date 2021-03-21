import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { SliderPicker } from 'react-native-slider-picker';

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
          <View style={styles.slider}>
        <SliderPicker 
          minLabel={'0h'}
          maxLabel={'24h'}
          maxValue={24}
          callback={position => {
            this.setState({ value: position });
          }}
          defaultValue={this.state.value}
          labelFontColor={"turquoise"}
          style={styles.slider}
          labelFontWeight={'600'}
          fillColor={'turquoise'}
          labelFontWeight={'bold'}
          buttonBackgroundColor={'#fff'}
          buttonBorderColor={"#6c7682"}
          buttonBorderWidth={1}
          scaleNumberFontWeight={'300'}
          buttonDimensionsPercentage={9}
          heightPercentage={1}
          labelFontSize={25}
          widthPercentage={80}
        />
        </View>
        <View style={styles.timecontainer}>
            <Text style={styles.timetext}>YOUR TIME IS </Text>
        <Text style={styles.time}>
            {this.state.value} HOURS
        </Text>
        </View>
        <TouchableOpacity style={styles.confirmbutton} onPress={() => this.props.navigation.navigate("people")}>
            <Text style={styles.confirmbuttontext}>
                CONFIRM
            </Text>
        </TouchableOpacity>
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
});