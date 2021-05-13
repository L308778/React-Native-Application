import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import Data from "../components/data/main.js"
import auth from '@react-native-firebase/auth';
import { database } from '../assets/config/firebase.js';

export const DataContext = createContext({})

/*
Here we define the context which will be used throughout the application.
Methods are concerned with the authentication State of the user. Data
is initialized to default to our main.json, where our testing data is 
contained. activities contain the images for each activity. Location is
only relevant for the location screen at this point but will be integrated
into the user json. Curr_Activity is used for subscribing to the selected
acitvity in the activity_info screen. All methods are either used to send
information between the mainpage and other screens or are used to store 
and execute authentication. Here we should create a user object where we
store all information to the current user
*/

const DataContextProvider = ({ children }) => {
    const [data, setData] = useState(Data)
    const [saved_activities, setSavedActivities] = useState([])
    const [location, setLocation] = useState({
        latitude: "",
        longitude: ""
    })
    const [curr_activity, setCurrActivity] = useState({})
    const [user, setUser] = useState(false)
    const [welcomeShown, setWelcomeShown] = useState(false)
    const [messages, setMessages] = useState({})
    const [chats, setChats] = useState(new Set())
    const mmkvInstances = useRef({})
    const giftedChat = useRef(null)
    const [currUser, setCurrUser] = useState({})

    //Most of the functions here except on_location, saved and for_info are used for auth state
    function signup(email, password) {
        return auth().createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth().signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth().signOut()
    }

    function resetPassword(email) {
        return auth().sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser().updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser().updatePassword(password)
    }

    async function setProfilePic (downloadURL){
        const update = {
          photoURL: downloadURL,
        };
        try {
          await auth().currentUser.updateProfile(update);
        } catch (e) {
          Alert.alert("Failed to update user\n" + e);
        }
      };

    //These are unrelated to auth context
    saved = (index) => {
        setSavedActivities(saved_activities.concat(Data[index]));
    }

    update_saved = (data) => {
        setSavedActivities(data)
    }

    on_location = (loc) => {
        setLocation(loc)
    }

    for_info = (index) => {
        setCurrActivity({ data: Data[index] })
    }

    return (
        <DataContext.Provider value={{
            data,
            saved_activities,
            location,
            curr_activity,
            user,
            welcomeShown,
            messages,
            chats,
            mmkvInstances,
            giftedChat,
            currUser,
            setCurrUser,
            setUser,
            signup,
            login,
            logout,
            resetPassword,
            updateEmail,
            updatePassword,
            setProfilePic,
            setWelcomeShown,
            setMessages,
            setChats,
            saved,
            on_location,
            for_info,
            update_saved
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContextProvider;
