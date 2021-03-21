import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import Constants from "expo-constants";
import { SliderPicker } from 'react-native-slider-picker';

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

export default class Budget extends React.Component {
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
          minLabel={'0€'}
          labelFontSize={25}
          maxLabel={'500€'}
          maxValue={500}
          callback={position => {
            this.setState({ value: position });
          }}
          defaultValue={this.state.value}
          labelFontColor={"turquoise"}
          style={styles.slider}
          labelFontWeight={'600'}
          fillColor={'turquoise'}
          buttonBackgroundColor={'#fff'}
          buttonBorderColor={"#6c7682"}
          buttonBorderWidth={1}
          scaleNumberFontWeight={'300'}
          buttonDimensionsPercentage={9}
          heightPercentage={1}
          widthPercentage={80}
        />
        </View>
        <View style={styles.budgetcontainer}>
            <Text style={styles.moneytext}>YOUR BUDGET IS </Text>
        <Text style={styles.money}>
            {this.state.value} €
        </Text>
        </View>
        <TouchableOpacity style={styles.confirmbutton} onPress={() => this.props.navigation.navigate("time")}>
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
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    padding: 30
  },
  slider: {
    flex: 1,
    marginBottom: 0,
    justifyContent: "center",

  },
  budgetcontainer: {
    flex: 1,
    marginBottom: 10,
    flexDirection: "row"
  },
  moneytext: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 25,
    fontWeight: "100",
    justifyContent: "flex-start",
    color: "turquoise"
  },
  money: {
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