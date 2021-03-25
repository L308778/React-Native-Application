import React,{useState, useEffect} from 'react';
import {View} from "react-native"
import DataContextProvider from './context/dataContext.js';
import MainStack from "./mainnav.js"
import auth from '@react-native-firebase/auth';

function App() {


  return (
    <DataContextProvider>
      <MainStack/>
    </DataContextProvider>
  );
}

export default App;
