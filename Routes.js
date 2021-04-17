import React, { useState, useEffect, useContext } from 'react';
import MainStack from "./mainnav.js";
import AuthStack from "./AuthStack.js";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DataContext } from "./context/dataContext.js";
import auth from '@react-native-firebase/auth';

const Routes = () => {
    const [initializing, setInitializing] = useState(true);
    const { user, setUser } = useContext(DataContext);

    // Handle user state changes
    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) {
        return (
            <View>
            </View>
        )
    };

    return (
        <NavigationContainer>
            {user ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Routes;