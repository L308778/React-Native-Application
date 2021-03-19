import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      gender: "",
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({ name: "" });
    this.setState({ age: "" });
    this.setState({ gender: "" });
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.header}>
              GETTING STARTED
          </Text>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Name"
            defaultValue={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
            value = {this.state.name}
          />
          <TextInput
            style={styles.inputs}
            secureTextEntry={true}
            placeholder="Age (Optional)"
            onChangeText={(text) => this.setState({ age: text })}
            value = {this.state.age}
          />
          <TextInput
            style={styles.inputs}
            secureTextEntry={true}
            placeholder="Gender (Optional)"
            onChangeText={(text) => this.setState({ gender: text })}
            value = {this.state.gender}
          />
          <TouchableOpacity style={styles.confirmbutton} onPress={() => this.props.navigation.navigate("setup_culture")}>
            <Text style={styles.confirmbuttontext}>
                NEXT
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
    fontSize: 30,
    fontWeight: "100",
    justifyContent: "flex-start",
    top: 40
  },
  inputcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputs: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "white",
    color: "turquoise",
    borderColor: "turquoise",
    margin: 20,
    borderWidth: 2,
    width: 300,
    borderRadius: 8,
    height: "auto",
  },
  confirmbutton: {
      color: "turquoise",
      backgroundColor: "turquoise",
      borderWidth: 0,
      borderRadius: 4,
      padding: 20,
      marginTop: 30,
  },
  confirmbuttontext: {
      fontSize: 30,
      fontWeight: "600",
      color: "white"
  }
});