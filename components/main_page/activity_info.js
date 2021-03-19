import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from 'react-native-elements'
import Activities from "../data/main.json"
import Images from "../images/image_loader.js"

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

/*data: Activities[this.props.route.params.params.activity],
      image: Images[this.props.route.params.params.index]*/

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data : Activities[this.props.route.params.params.activity],
      image: Images[this.props.route.params.params.activity]
    }
  }

  render() {
    if(this.state.showing == false){
      return(
        <View><Text>Safe</Text></View>
      )
    }
    if(typeof(this.state.data)=="undefined"){
      return(
        <View>
          <Text>
            No data sorry
          </Text>
        </View>
      )
    }
    else{
    return (
      <ScrollView style ={{flex: 1}}contentContainerStyle={styles.container}>
        <Text style={styles.header}>{this.state.data.name}</Text>
        <Image style={styles.image} source={this.state.image}/>
        <View style={styles.parentinfocontainer}>
            <View style={styles.infocontainer}>
          <Text style={styles.maininfo_txt}>DURATION: </Text>
          <View style = {styles.lineStyle} />
          <Text style={styles.maininfo_txt}>PRICE: </Text>
          <View style = {styles.lineStyle} />
          <Text style={styles.maininfo_txt}>Type: </Text>
          <View style = {styles.lineStyle} />
          <Text style={styles.maininfo_txt}>Your Score:</Text>
          <View style = {styles.lineStyle} />
          </View>
          <View style={styles.infocontainer}>
              <Text style={styles.maininfo_txt_ans}>
                  {this.state.data.duration}
              </Text>
              <View style = {styles.lineStyle} />
              <Text style={styles.maininfo_txt_ans}>
                  {this.state.data.price}
              </Text>
              <View style = {styles.lineStyle} />
              <Text style={styles.maininfo_txt_ans}>
                  Entertain
              </Text>
              <View style = {styles.lineStyle} />
              <Text style={styles.maininfo_txt_ans}>
                  96.6%
              </Text>
              <View style = {styles.lineStyle} />
          </View>
        </View>
        <TouchableOpacity style={styles.confirmbutton} onPress={() => this.props.navigation.navigate("main")}>
            <Text style={styles.confirmbuttontext}>
                BOOK
            </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
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
    fontSize: 40,
    marginTop: Constants.statusBarHeight,
    marginBottom: 40,
    fontWeight: "400",
    color:"turquoise",
    fontFamily:"system font"
  },
  parentinfocontainer:{
      flexDirection:"row"
  },
  infocontainer: {
      flexDirection: "column",
      paddingTop: 30,
  },
  maininfo_txt: {
      fontSize: 15,
      fontWeight: "300",
      color:"turquoise",
      textAlign: "justify",
      margin: 10,
  },
  maininfo_txt_ans: {
    fontSize: 15,
    fontWeight: "600",
    color:"turquoise",
    textAlign:"center",
    margin: 10,
    marginLeft: 50
},
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 4,
    alignItems: "center",
    padding: 20,
    width:"100%",
    marginTop: 30,
  },
  confirmbuttontext: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'turquoise',
    margin:10,
    width:"100%"
  },
  image:{
    width: 300,
    height:400,
    borderRadius: 40
  }
});
