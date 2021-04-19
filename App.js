import React from "react";
import DataContextProvider from './context/dataContext.js';
import Routes from "./navigation/Routes.js";

/*
Here I reverted the navigation. As you can see from the commented part below,
the MainStack (which was before not containing login and signup) should be split
into mainstack and authstack. Otherwise this is the entry point of the application
*/

function App() {
  return (
    <DataContextProvider>
      <Routes />
    </DataContextProvider>
  )
}

export default App;
