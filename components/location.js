import React from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from 'react-native-elements'
import Constants from "expo-constants"

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
  }

  componentDidMount(navigator) {
    this.setState({ email: "" });
    this.setState({ password: "" });
    this.setState({ password: "" });
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.header}>
              LOCATION
          </Text>
        <View style={styles.inputcontainer}>
        <Icon
            name='location'
            type='evilicon'
            color='turquoise'
            style={styles.icons}
            size= {200}
            />
          <TouchableOpacity style={styles.confirmbutton} onPress={() => this.props.navigation.navigate("suggestion")}>
            <Text style={styles.confirmbuttontext}>
                ENABLE
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
    fontSize: 40,
    top: 100,
    fontWeight: "100",
    justifyContent: "flex-start",
  },
  inputcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
      color: "white"
  }
});