import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs()

import firebase from 'firebase';
import {firebaseConfig} from './env';

require('firebase/firestore')

if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig);
}

import StackFirstNavigation from './src/rooter/StackFirstNavigation';

import Ad from './src/screens/SignInScreens/PutAdressScreen'

export default function App() {
  return (
    <NavigationContainer>
      <StackFirstNavigation/>
    </NavigationContainer>
  );
};
