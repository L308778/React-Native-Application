import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

/*
This is our profile page and it is a bit rushed, because I think
we can use a react native table or something for that.
*/

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({ email: "" });
    this.setState({ password: "" });
    this.setState({ password: "" });
  }

  render() {
    return (
      <>
      <View style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <Image source={require("../logo/profile.jpg")} style={styles.img} />
        <Text style={styles.edit}>Edit Profile</Text>
        <View style={styles.parentinfocontainer}>
            <View style={styles.infocontainer}>
          <Text style={styles.maininfo_txt}>NAME</Text>
          <View style = {styles.lineStyle} />
          <Text style={styles.maininfo_txt}>AGE</Text>
          <View style = {styles.lineStyle} />
          <Text style={styles.maininfo_txt}>Relationship Status</Text>
          <View style = {styles.lineStyle} />
          <Text style={styles.maininfo_txt}>E-MAIL ADDRESS</Text>
          <View style = {styles.lineStyle} />
          <Text style={styles.maininfo_txt}>PREFERENCE:</Text>
          <View style = {styles.lineStyle} />
          </View>
          <View style={styles.infocontainer}>
              <Text style={styles.maininfo_txt_ans}>
                  Bibapo
              </Text>
              <View style = {styles.lineStyle} />
              <Text style={styles.maininfo_txt_ans}>
                  123
              </Text>
              <View style = {styles.lineStyle} />
              <Text style={styles.maininfo_txt_ans}> 
                  Single
              </Text>
              <View style = {styles.lineStyle} />
              <Text style={styles.maininfo_txt_ans}>
                  martin.mustermann@gmail.com
              </Text>
              <View style = {styles.lineStyle} />
              <Text style={styles.maininfo_txt_ans}>
                  Soccer
              </Text>
              <View style = {styles.lineStyle} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.confirmbutton} onPress={() => this.props.navigation.navigate("main")}>
            <Text style={styles.confirmbuttontext}>
                RETURN TO TRIPPY
            </Text>
        </TouchableOpacity>
      </>
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
    marginTop: Constants.statusBarHeight,
    marginBottom: 40,
    fontWeight: "100",
    color:"turquoise"
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  edit: {
    color: "grey",
    padding: 10,
  },
  parentinfocontainer:{
      flexDirection:"row"
  },
  infocontainer: {
      flexDirection: "column",
      paddingTop: 30,
  },
  maininfo_txt: {
      fontSize: 12,
      fontWeight: "300",
      color:"turquoise",
      textAlign: "justify",
      margin: 10,
  },
  maininfo_txt_ans: {
    fontSize: 12,
    fontWeight: "600",
    color:"turquoise",
    textAlign:"center",
    margin: 10,
    marginLeft: 20
},
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 4,
    width:"100%",
    padding: 20,
    alignItems:"center",
    marginTop: 15,
    position:"absolute",
    bottom: 0
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
}
});
