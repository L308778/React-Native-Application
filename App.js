import React from 'react';
import DataContextProvider from './context/dataContext.js';
import MainStack from "./mainnav.js"

function App() {


  return (
    <DataContextProvider>
      <MainStack/>
    </DataContextProvider>
  );
}

export default App;
