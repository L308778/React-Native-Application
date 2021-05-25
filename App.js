import React from "react";
import DataContextProvider from './context/dataContext.js';
import Routes from "./navigation/Routes.js";

/*
Here I reverted the navigation. As you can see from the commented part below,
the MainStack (which was before not containing login and signup) should be split
into mainstack and authstack. Otherwise this is the entry point of the application

To do:

1 - Pull all users from firebase firestore
2 - Logic for checking other users stored activities
e.g.: 
User A / User B / User C / User D
A likes skiing -> Check whether other user liked skiing by iterating through users
If yes -> Match with all users who liked it
*/

function App() {
  return (
    <DataContextProvider>
      <Routes />
    </DataContextProvider>
  )
}

export default App;
