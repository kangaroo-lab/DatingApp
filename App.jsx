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

import PutBasicInfo from './src/screens/Register/PutBasicInfoScreen';
import ConfirmPhoto from './src/screens/Register/ConfirmPhotoScreen';
import HobbyCategory from './src/screens/Register/HobbyCategoryScreen';
import HobbyDetail from './src/screens/Register/HobbyDetailScreen';
import UploadPhoto from './src/screens/Register/UploadPhotoScreen';
import Value from './src/screens/Register/ValueScreen'

export default function App() {
  return (
    // <NavigationContainer>
    //   <StackFirstNavigation/>
    // </NavigationContainer>
    <HobbyDetail/>
  );
};
