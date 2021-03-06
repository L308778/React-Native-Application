import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import Data from "../components/data/main.js";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const DataContext = createContext({});

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
  const [activities, setActivities] = useState("");
  const [saved_activities, setSavedActivities] = useState([]);
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [currActivity, setCurrActivity] = useState({});
  const [user, setUser] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const [messages, setMessages] = useState({});
  const [chats, setChats] = useState(new Set());
  const mmkvInstances = useRef({});
  const giftedChat = useRef(null);
  const [currUser, setCurrUser] = useState({});
  const [discarded, setDiscarded] = useState([]);
  const [allUsers, setAllUsers] = useState([])

  const getData = async () => {
    const data = [];
    await firestore()
      .collection("Activities")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          data.push(doc.data());
        });
      });
    setActivities(data);
  };

  //Most of the functions here except on_location, saved and for_info are used for auth state
  function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth().signOut();
  }

  function resetPassword(email) {
    return auth().sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser().updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser().updatePassword(password);
  }

  const getAllUser = async () => {
    let interim = []
    users = await firestore()
      .collection("Users")
      .get()
      .then(querySnapshot => {

        querySnapshot.forEach(documentSnapshot => {
          interim.push(documentSnapshot.data());
        });
        setAllUsers(interim);
      })
  }

  async function setProfilePic(downloadURL) {
    const update = {
      photoURL: downloadURL,
    };
    try {
      await auth().currentUser.updateProfile(update);
    } catch (e) {
      Alert.alert("Failed to update user\n" + e);
    }
  }

  //These are unrelated to auth context
  saved = (index) => {
    setSavedActivities(saved_activities.concat(activities[index]));
  };

  addDiscard = (index) => {
    setDiscarded(discarded.concat(index));
  };

  update_saved = (data) => {
    setSavedActivities(data);
  };

  on_location = (loc) => {
    setLocation(loc);
  };

  for_info = (index) => {
    setCurrActivity({ data: activities[index] });
  };

  return (
    <DataContext.Provider
      value={{
        activities,
        saved_activities,
        location,
        currActivity,
        user,
        welcomeShown,
        messages,
        chats,
        mmkvInstances,
        giftedChat,
        currUser,
        addDiscard,
        discarded,
        allUsers,
        getData,
        setCurrUser,
        setCurrActivity,
        setUser,
        signup,
        login,
        getAllUser,
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
        update_saved,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
