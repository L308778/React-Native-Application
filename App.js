import React, {useState, useEffect, useContext} from 'react';
import {View} from "react-native"
import {DataContext} from "./context/dataContext.js"
import MainStack from "./mainnav.js"
import AuthStack from "./AuthStack.js"
import { NavigationContainer} from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import DataContextProvider from './context/dataContext.js';


/*
Here I reverted the navigation. As you can see from the commented part below,
the MainStack (which was before not containing login and signup) should be split
into mainstack and authstack. Otherwise this is the entry point of the application
*/
function App() {


    return(
    <NavigationContainer>
    <MainStack/>
    </NavigationContainer>
    )
}

export default App;


/*
function App() {

  const [initializing, setInitializing] = useState(true);
  const {user, setUser} = useContext(DataContext)


  // Handle user state changes

  const onAuthStateChanged = (user) => {
    setUser(user);
    if(initalializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return(
      <View>

      </View>
    )
  };

    return(
    <NavigationContainer>
    { user ? <AuthStack/> : MainStack}
    </NavigationContainer>)
}

export default App;

*/