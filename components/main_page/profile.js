import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import { Icon, Avatar } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { DataContext } from "../../context/dataContext";
import { Dimensions } from "react-native";

/*
This is our profile page and it is a bit rushed, because I think
we can use a react native table or something for that.

ToDo:

You should only be able to see edit profile when you look at your own profile
*/

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Profile(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [relation, setRelation] = useState("");
  const [exist, setExist] = useState(false)

  const { user, currUser, setCurrUser } = useContext(DataContext);

  const test_images = [
    require("../images/profile_9.jpeg"),
    require("../images/profile_10.jpeg"),
    require("../images/profile_11.jpeg"),
    require("../images/profile_12.jpeg"),
    require("../images/profile_13.jpeg"),
    require("../images/profile_14.jpeg"),
    require("../images/profile_15.jpeg"),
  ];

  useEffect(() => {
    if(currUser.avatar != ""){
      setExist(true)
    };
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              {exist? (
                <Avatar
                source={{ uri: currUser.avatar }}
                rounded
                size="large"
                containerStyle={styles.profileImage}
              />
              ) : (
                <Icon name="user" type="evilicon" color="white" size={200} />
              )}
            </View>
            <View style={styles.dm}>
              <Icon name="chat" size={18} color="#DFD8C8"></Icon>
            </View>
            <View style={styles.active}></View>
            <View style={styles.add}>
              <Icon
                name="plus"
                type="evilicon"
                size={48}
                color="#DFD8C8"
                style={{ marginTop: 6, marginLeft: 2 }}
              ></Icon>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <TouchableOpacity
              style={{ paddingBottom: 10 }}
              onPress={() => props.navigation.navigate("editInterim")}
            >
              <Text style={{ color: "grey" }}>Edit Profile</Text>
            </TouchableOpacity>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {currUser.name}
            </Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              {currUser.age}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
              <Text style={[styles.text, styles.subText]}>Posts</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {
                  borderColor: "#DFD8C8",
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}
            >
              <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
              <Text style={[styles.text, styles.subText]}>Activities</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
              <Text style={[styles.text, styles.subText]}>Friends</Text>
            </View>
          </View>

          <View style={{ marginTop: 32 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require("../images/profile_1.jpeg")}
                  style={styles.image}
                  resizeMode="cover"
                ></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require("../images/profile_2.jpeg")}
                  style={styles.image}
                  resizeMode="cover"
                ></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require("../images/profile_3.jpeg")}
                  style={styles.image}
                  resizeMode="cover"
                ></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require("../images/profile_4.jpeg")}
                  style={styles.image}
                  resizeMode="cover"
                ></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require("../images/profile_5.jpeg")}
                  style={styles.image}
                  resizeMode="cover"
                ></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require("../images/profile_6.jpeg")}
                  style={styles.image}
                  resizeMode="cover"
                ></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require("../images/profile_7.jpeg")}
                  style={styles.image}
                  resizeMode="cover"
                ></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require("../images/profile_8.jpeg")}
                  style={styles.image}
                  resizeMode="cover"
                ></Image>
              </View>
            </ScrollView>
          </View>
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text
                  style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
                >
                  Started following{" "}
                  <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and{" "}
                  <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                </Text>
              </View>
            </View>

            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text
                  style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
                >
                  Started following{" "}
                  <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <FlatList
              data={test_images}
              style={{ flexGrow: 1, flex: 1 }}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "column",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  <Image style={styles.imageThumbnail} source={item} />
                </View>
              )}
              //Setting the number of column
              numColumns={2}
              keyExtractor={(index) => index}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity
        style={styles.confirmbutton}
        onPress={() => props.navigation.navigate("main")}
      >
        <Text style={styles.confirmbuttontext}>RETURN TO TRIPPY</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF",
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  imageContainer: {
    flexGrow: 1,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 2,
    height: SCREEN_HEIGHT * 0.18,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 4,
    width: "100%",
    padding: 15,
    alignItems: "center",
    marginTop: 15,
    position: "absolute",
    bottom: 0,
  },
  confirmbuttontext: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
  },
});
