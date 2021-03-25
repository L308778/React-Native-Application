import React, {createContext, useContext, useEffect, useState} from 'react'
import Images from '../components/images/image_loader.js';
import Data from "../components/data/main.json"
import auth from '@react-native-firebase/auth';


export const DataContext = createContext()


function DataContextProvider ({children}){
    const[data, setData]=useState(Data)
    const[activities, setActivities]=useState(Images)
    const[saved_activities,setSavedActivities]= useState([])
    const[location, setLocation] = useState({
                latitude: "",
                longitude:""
            })

    const[curr_activity, setCurrActivity] = useState({})
    const[currentUser, setCurrentUser] = useState(null)
    const[loading, setLoading] = useState(false)



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

    useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
    })

    return unsubscribe
    }, [])


    //These are unrelated to auth context
    saved = (index) => {
        setSavedActivities(saved_activities.concat(Data[index]));
    }

    on_location = (loc) => {
        setLocation(loc)
    }

    for_info = (index) => {
        setCurrActivity({image: Images[index], data: Data[index]})
    }

        return (
            <DataContext.Provider value={{
            data,
            activities, 
            saved_activities,
            location,
            curr_activity,
            currentUser, 
            signup,
            login,
            logout,
            resetPassword,
            updateEmail,
            updatePassword,
            saved,
            on_location,
            for_info
            }}>
                {children}
            </DataContext.Provider>
        );
}

export default DataContextProvider;
