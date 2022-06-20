import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase';
import {firebaseConfig} from './env';

require('firebase/firestore')

if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig);
}

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs()

import StackFirstNavigation from './src/rooter/StackFirstNavigation';
import TalkList from './src/screens/TalkScreens/Pre/TalkListScreen';
import TabNavigation from './src/rooter/TabNavigator';
import StackNavigator from './src/rooter/StackNavigator'
import Values from './src/screens/Register/ValueScreen'
import Drawer from './src/rooter/DrawerNavigator'
import Tab from './src/rooter/TabNavigator'
import Birth from './src/screens/SignInScreens/PutBirthDayScreen'

export default function App() {
  return (
    <NavigationContainer>
        <StackFirstNavigation/>
        {/* <TabNavigation/> */}
      {/* <StackNavigator/> */}
      {/* <Drawer/> */}
    </NavigationContainer>
    // <Values/>
  );
};
