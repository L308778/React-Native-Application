import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  Animated,
} from "react-native";
import Constants from "expo-constants";
import Swipeable from "react-native-gesture-handler/Swipeable";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../context/dataContext";
import { SearchBar } from "react-native-elements";
import { useIsFocused} from '@react-navigation/native'; 
import { Dimensions } from "react-native";

/*
This is our saved_screen. It is pretty messy. I am sorry for that. So we retrieve
all the saved activity from the context. Then we have a delete method which deletes
a saved activity. I think through the logic we should go through together, but if 
you get it by just looking at the code the better. But dont worry about that.
Here we definitely have to fix some bugs, such as that sometimes the images are not in order.
Also you should not swipe through the whole cards twice, because then you have two children with
the same key, which then messes with things.
*/

SCREEN_WIDTH = Dimensions.get("window").width
SCREEN_HEIGHT = Dimensions.get("window").height


export default function Saved(props) {
  
  const {saved_activities, update_saved, setCurrActivity, currActivity} = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [displayData, setDisplayData] = useState(saved_activities);


  const to_info = (index) => {
    setCurrActivity(saved_activities[index]);
    props.navigation.navigate("activity_info");
  };

  useEffect(() => {
    if (displayData){
      setDisplayData(saved_activities)
    }},[saved_activities])


  /* 
  Search function which maps the users searched activities
  */
  const handle_search = (new_text) => {

    setSearch(new_text)

    if (new_text.length > 1){
      let text = new_text.toString().toLowerCase()
      console.log(text)
      let filterData = saved_activities.filter((item) => {
        return item.name.toLowerCase().match(text)
      })

      if (!text || text == ""){
        setDisplayData(saved_activities)
      }

      else if (!Array.isArray(filterData) && !filterData.length){
        setDisplayData([])
      }

      else if(Array.isArray(filterData)) {
        setDisplayData(filterData);
      }
    }
    else{
      setDisplayData(saved_activities)
    }
}

  const Item = ({ item }) => {

    const handle_delete = (index) => {
      let arr = displayData.filter((item) => {
        return item.id !== index
      })

      setDisplayData(arr)
      update_saved(arr)

    };

    const leftSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: "clamp",
      });
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handle_delete(item.id)}
        >
          <View style={styles.delete}>
            <Animated.Text
              style={{
                transform: [{ scale: scale }],
                color: "white",
                fontWeight: "500",
                fontSize: 20,
                fontFamily:"systemfont",
                
              }}
            >
              Delete
            </Animated.Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <Swipeable renderLeftActions={leftSwipe}>
        <TouchableOpacity
          onPress={() => to_info(saved_activities.indexOf(item))}
        >
          <View style={styles.listItem}>
            <Image
              source={{uri: item.image}}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            <View
              style={{
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            </View>
            <TouchableOpacity style={styles.book}>
              <Text style={{ color: "white" }}>Book</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };
  if (displayData.length != 0){
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="SEARCH YOUR EVENT"
        onChangeText={(text) => handle_search(text)}
        value={search}
        containerStyle={styles.searchbarcontainer}
        inputContainerStyle={styles.searchbarInputContainer}
      />
      <FlatList
        style={{ flex: 1 }}
        data={displayData}
        ItemSeparatorComponent={ItemSeparatorView}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => Item({ item })}
      />
      <TouchableOpacity
        style={styles.confirmbutton}
        onPress={() => props.navigation.navigate("main")}
      >
        <Text style={styles.confirmbuttontext}>RETURN TO TRIPPY</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );}
  else{
    return(
      <SafeAreaView style={styles.container}>
      <Text style={{color:"grey", flex:1, alignSelf:"center", top:SCREEN_WIDTH *0.5, fontSize:20}}>
        No stored activites
      </Text>
      <TouchableOpacity
        style={styles.confirmbutton}
        onPress={() => props.navigation.navigate("main")}
      >
        <Text style={styles.confirmbuttontext}>RETURN TO TRIPPY</Text>
      </TouchableOpacity>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    overflow: "hidden",
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 40,
    fontWeight: "100",
    alignSelf: "center",
    justifyContent: "flex-start",
    marginBottom: 40,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    width: "95%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 10,
    padding: 20,
    marginTop: 0,
  },
  confirmbuttontext: {
    fontSize: 17,
    fontWeight: "800",
    color: "white",
    alignItems: "center",
    textAlign: "center",
  },
  book: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "turquoise",
    borderRadius: 200,
  },
  searchbarcontainer: {
    borderRadius: 60,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "turquoise",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchbarInputContainer: {
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 40,
    fontSize: 20,
  },

  delete: {
    backgroundColor: "darkred",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    width: 110,
    height: 90,
    borderRadius:20,
    borderColor:"white",
    borderWidth:10,
    marginLeft: 10,
  },
});
