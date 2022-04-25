import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase';

import StackFirstNavigation from './src/rooter/StackFirstNavigation';

import {firebaseConfig} from './env';

if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <NavigationContainer>
      <StackFirstNavigation/>
    </NavigationContainer>
  );
};
