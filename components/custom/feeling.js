import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import Constants from "expo-constants";
import { SliderPicker } from 'react-native-slider-picker';

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

          <View style={styles.slider}>
              <Text>Romantic</Text>
        <SliderPicker 
          minLabel={'0'}
          maxLabel={'100%'}
          maxValue={100}
          callback={position => {
            this.setState({ romantic: position });
          }}
          defaultValue={this.state.romantic}
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
          widthPercentage={80}
          labelFontSize={25}
        />
        <Text>Relaxed</Text>
        <SliderPicker 
          minLabel={'0'}
          maxLabel={'100%'}
          maxValue={100}
          callback={position => {
            this.setState({ relaxed: position });
          }}
          defaultValue={this.state.relaxed}
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
          widthPercentage={80}
          labelFontSize={25}
        />
        <Text>Active</Text>
        <SliderPicker 
          minLabel={'0'}
          maxLabel={'100%'}
          maxValue={100}
          callback={position => {
            this.setState({ active: position });
          }}
          defaultValue={this.state.active}
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
          widthPercentage={80}
          labelFontSize={25}
        />
        <Text>
            Entertained
        </Text>
        <SliderPicker 
          minLabel={'0'}
          maxLabel={'100%'}
          maxValue={100}
          callback={position => {
            this.setState({ entertained: position });
          }}
          defaultValue={this.state.entertained}
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
          widthPercentage={80}
          labelFontSize={25}
        />
        </View>
        <TouchableOpacity style={styles.confirmbutton} onPress={() => this.props.navigation.navigate("tab")}>
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
    width: Dimensions.get("window").width
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 30,
    fontWeight: "100",
    justifyContent: "flex-start",
  },
  slider: {
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
});