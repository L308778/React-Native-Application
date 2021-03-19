import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import HomeScreen from "./home.js"

class WelcomeScreen extends React.Component {
    render() {
        return (
        <View style={styles.container}> 
            <Image source={require("./logo/interim_logo.png")}/>
        </View>)
    }
}

export default class Welcome extends React.Component {
    constructor(props){
        super(props)
        this.state = {
         component : <WelcomeScreen />
        }
    }

    componentDidMount(){
        this.timeoutHandle = setTimeout(()=>{
            // Add your logic for the transition
            this.props.navigation.navigate("home")
       }, 3000);
    }

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle); 
   }

    render() {
        return (
        this.state.component
        )}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:"center",
      justifyContent: "center"
    }
  });