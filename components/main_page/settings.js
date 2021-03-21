import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import { Icon, Slider } from "react-native-elements";
import { SliderPicker } from "react-native-slider-picker";
import Budget from "../custom/budget.js";
import People from "../custom/people.js";
import Time from "../custom/time.js";
import Feeling from "../custom/feeling.js";

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

const ScreenWidth = Dimensions.get("window").width;

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isEnabled: false,
    };
  }

  toggleSwitch = () => {
    if (this.state.isEnabled == true) {
      this.setState({ isEnabled: false });
    } else {
      this.setState({ isEnabled: true });
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.lineStyle} />
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
        <View style={styles.lineStyle} />
        <Text style={styles.h2}>MAX DISTANCE</Text>
        <View style={styles.slider_container}>
          <Slider
            style={styles.slider}
            value={this.state.value}
            maximumValue={300}
            minimumValue={0}
            step={10}
            onValueChange={(value) => this.setState({ value })}
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
          <Text style={{alignSelf:"center"}}>Distance: {this.state.value}km</Text>
        </View>
        <View style={styles.lineStyle} />
        <Budget />
        <People />
        <View style={styles.lineStyle} />
        <Time />
        <View style={styles.lineStyle} />
        <Feeling />
        <View style={styles.lineStyle} />

        <TouchableOpacity style={styles.confirmbutton} onPress={() => this.props.navigation.navigate("tab")}>
            <Text style={styles.confirmbuttontext}>
                CONFIRM SETTINGS
            </Text>
        </TouchableOpacity>

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
