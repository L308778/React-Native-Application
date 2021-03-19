import React,{useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import auth from '@react-native-firebase/auth';


/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      name: "",
      loading: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({ email: "" });
    this.setState({ password: "" });
    this.setState({ confirmpassword: "" })
    this.setState({ name: "" });
  }

  register = async() => {
    this.setState({loading:true});
    try {
        const doRegister = await auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
        this.setState({loading:false});
        if(doRegister.user) {
            this.props.navigation.navigate("location");
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
        <View style={{ flex: 1, width: '100%' }}>
        <View style={styles.inputcontainer}>
        <Image source={require("../logo/interim_logo.png")} style={styles.logo}/>
        <TextInput
            style={styles.inputs}
            placeholder="Full Name"
            defaultValue={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
            value = {this.state.name}
          />
          <TextInput
            style={styles.inputs}
            placeholder="E-mail"
            defaultValue={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
            value = {this.state.email}
          />
          <TextInput
            style={styles.inputs}
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => this.setState({ password: text })}
            value = {this.state.password}
          />
          <TextInput
            style={styles.inputs}
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={(text) => this.setState({ confirmpassword: text })}
            value = {this.state.confirmpassword}
          />
          <TouchableOpacity style={styles.confirmbutton} onPress={() => this.props.navigation.navigate("location")}>
            <Text style={styles.confirmbuttontext}>
                SIGN UP
            </Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"white"
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 30,
    fontWeight: "100",
    justifyContent: "flex-start",
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
      width: "80%",
      alignItems:"center"
  },
  confirmbuttontext: {
      fontSize: 20,
      fontWeight: "600",
      color: "white"
  },
  logo: {
    flex: 1,
    height: 150,
    width: 120,
    alignSelf: "center",
    margin: 30,
    marginTop: 60
},
footerView: {
  flex: 1,
  alignItems: "center",
  marginTop: 20
},
footerText: {
  fontSize: 16,
  color: '#2e2e2d'
},
footerLink: {
  color: "#788eec",
  fontWeight: "bold",
  fontSize: 16
}
});
