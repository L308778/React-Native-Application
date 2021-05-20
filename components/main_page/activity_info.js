import React, {useState, useContext} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, Button } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from 'react-native-elements'
import Activities from "../data/main"
import {DataContext} from "../../context/dataContext.js"

/* 
This is the page containing the specific data related to the individual activity.
It is invoked when clicking on a saved activity in the saved screen as well as
when a user swipes a card upwards.
*/


const ScreenWidth = Dimensions.get("window").width
const ScreenHeight = Dimensions.get("window").height


export default function Activity_Info(props) {

    const {curr_activity} = useContext(DataContext)


    const [data, setData] = useState(curr_activity.data);

    const logger = () => {
      console.log(data)
    }

    return (
      <View style={{flex:1}}>
        <View style={{height: Constants.statusBarHeight,width: ScreenWidth, backgroundColor:"white" }}>
        </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>{data.name}</Text>
        <Image style={styles.image} source={{uri:data.image}}/>
        <View style={styles.long_cont}>
        <Text style={styles.long_text}>{data.longdescription}</Text>
        </View>
        <View style={styles.parentinfocontainer}>
            <View style={styles.infocontainer}>
            <View style = {styles.lineStyle} />
          <Text style={styles.maininfo_txt}>DURATION: </Text>
          <View style = {styles.lineStyle} />
          <Text style={styles.maininfo_txt}>PRICE: </Text>
          <View style = {styles.lineStyle} />
          <Text style={styles.maininfo_txt}>Type: </Text>
          <View style = {styles.lineStyle} />
          </View>
          <View style={styles.infocontainer}>
          <View style = {styles.lineStyle} />
              <Text style={styles.maininfo_txt_ans}>
                  {data.duration}
              </Text>
              <View style = {styles.lineStyle} />
              <Text style={styles.maininfo_txt_ans}>
                  {data.price}
              </Text>
              <View style = {styles.lineStyle} />
              <Text style={styles.maininfo_txt_ans}>
                  Entertain
              </Text>
              <View style = {styles.lineStyle} />
              
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.confirmbutton} onPress={() => props.navigation.navigate("main")}>
      <Text style={styles.confirmbuttontext}>
          BOOK
      </Text>
  </TouchableOpacity>
  </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    position: "relative",
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
      flexDirection:"row",
      paddingBottom: ScreenHeight * 0.1
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
    alignSelf:"flex-end",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 4,
    alignItems: "center",
    padding: 20,
    width:"100%",
    marginTop: 30,
    position: "absolute",
    bottom: 0,
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
  },
  long_cont: {
    width: ScreenWidth * 0.7,
    textAlign:"justify",
    paddingTop: 30,
    paddingBottom: 20
  },
  long_text: {
    color: "turquoise",
    fontSize: 15,
    fontFamily: "systemfont",
    lineHeight: 30
  },

});
