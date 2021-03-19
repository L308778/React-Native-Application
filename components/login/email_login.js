import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import auth from '@react-native-firebase/auth';

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      loading: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({ email: "" });
    this.setState({ password: "" });
    this.setState({ password: "" });
  }

  login = async() => {
    this.setState({loading:true});
    try {
        const doLogin = await auth().signInWithEmailAndPassword(this.state.email, this.state.password);
        this.setState({loading:false});
        if(doLogin.user) {
            this.props.navigation.navigate('location');
        }
    } catch (e) {
        this.setState({loading:false});
        Alert.alert(
            e.message
        );
    }
};

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.header}>
              TRIPPY
          </Text>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Enter your Email..."
            defaultValue={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
            value = {this.state.email}
          />
          <TextInput
            style={styles.inputs}
            secureTextEntry={true}
            placeholder="Enter a password..."
            onChangeText={(text) => this.setState({ password: text })}
            value = {this.state.password}
          />
        </View>
        <TouchableOpacity style={styles.confirmbutton} onPress={() => this.props.navigation.navigate('location')}>
            <Text style={styles.confirmbuttontext}>
                LOGIN
            </Text>
        </TouchableOpacity>
        <Text
              style={styles.registerTextStyle}
              onPress={() => this.props.navigation.navigate("email_sign_up")}>
              New Here ? Register
            </Text>
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
    fontSize: 68,
    top: 100,
    justifyContent:"center",
    fontWeight: "100",
    borderWidth: 2,
    borderRadius: 90,
    color:"turquoise",
    borderColor: "turquoise"
  },
  inputcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputs: {
    fontSize: 18,
    padding: 20,
    backgroundColor: "white",
    color: "turquoise",
    borderColor: "turquoise",
    margin: 20,
    borderWidth: 2,
    width: 300,
    borderRadius: 30,
    height: "auto",
  },
  confirmbutton: {
      color: "turquoise",
      backgroundColor: "turquoise",
      borderWidth: 0,
      borderRadius: 80,
      padding: 20,
      textAlign:"center",
      bottom: 180,
      width:"90%"
  },
  confirmbuttontext: {
      fontSize: 20,
      fontWeight: "600",
      color: "white",
      textAlign:"center"
  },
  registerTextStyle: {
    color: 'turquoise',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
    bottom: 160
  },
});