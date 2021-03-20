import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Image, Animated } from "react-native";
import Constants from "expo-constants";
import Swipeable from "react-native-gesture-handler/Swipeable"
import React, { useState, useContext} from 'react';
import {DataContext} from "../../../context/dataContext"
import Images from "../../images/image_loader.js"
import { SearchBar } from 'react-native-elements';

/*This is our sign-up page. We still have to add database integration (Firebase?)
So the navigation from the email sign in still has to be adjusted as well as the connections
to google, apple etc.*/

function Saved (props) {

  const {activities, saved_activities} = useContext(DataContext)
  const [search, setSearch] = useState("")
  const[displayData, setDisplayData] = useState(saved_activities)

  const handle_search = (text) => {
      if (text) {
        const newData = displayData.filter(
          function (item) {
            const itemData = item.name
            ? item.name.toLowerCase()
            : "".toLowerCase();
            const textData = text.toLowerCase()
            return itemData.indexOf(textData) > -1;
          }
        );
        setDisplayData(newData)
        setSearch(text);
      } else {
        setDisplayData(saved_activities)
        setSearch(text);
      }
  }

  const Item = ({item}) => {

    const handle_delete = (index) => {
      const arr = [...displayData];
      arr.splice(index, 1);
      setDisplayData(arr)
    }

    const leftSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: "clamp"
      })
      return(
        <TouchableOpacity activeOpacity={0.6} onPress={(index) => handle_delete(index)}>
        <View style={styles.delete}>
          <Animated.Text style={{transform : [{scale: scale}]}}>
            Delete
          </Animated.Text>
        </View>
        </TouchableOpacity>
      )
    }
    return (
      <Swipeable renderLeftActions={leftSwipe}>
      <TouchableOpacity onPress={() => props.navigation.navigate("activity_info", {
        params:{"activity": item.key - 1}
      })}>
      <View style={styles.listItem}>
        <Image source={Images[item.key - 1]}  style={{width:60, height:60,borderRadius:30}} />
        <View style={{alignItems:"center",flex:1, justifyContent:"center"}}>
          <Text style={{fontWeight:"bold"}}>{item.name}</Text>
        </View>
        <TouchableOpacity style={styles.book}>
          <Text style={{color:"white"}}>Book</Text>
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
      </Swipeable>
    );
  }

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
          style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8'
          }}
      />
    );
  };
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
        style={{flex:1}}
        data={displayData}
        ItemSeparatorComponent={ItemSeparatorView}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => Item({item})}/>
        <TouchableOpacity 
          style={styles.confirmbutton} onPress={() => props.navigation.navigate("main")}>
            <Text style={styles.confirmbuttontext}>
                RETURN TO TRIPPY
            </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}

export default Saved

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    overflow:"hidden"
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 40,
    fontWeight: "100",
    alignSelf:"center",
    justifyContent: "flex-start",
    marginBottom: 40,
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    justifyContent:"center",
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
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
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    alignItems:"center",
    textAlign:"center"
  },
  book: {
    height:50,
    width:50,
    justifyContent:"center",
    alignItems:"center", 
    backgroundColor: "turquoise", 
    borderRadius: 200
  },
  searchbarcontainer: {
    borderRadius: 60,
    width: "95%",
    alignSelf:"center",
    backgroundColor:"turquoise",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchbarInputContainer: {
    backgroundColor:"white",
    textAlign: "center",
    borderRadius: 40,
    fontSize:20
  },

  delete: {
    backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center",
    width: 80,
    height: 100
  }
});