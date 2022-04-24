import React from 'react';
import {NavigationContainer,useRoute} from '@react-navigation/native';
import firebase from 'firebase'

import TabNavigator from './src/rooter/TabNavigator'
import StackFirstNavigation from './src/rooter/StackFirstNavigation'

import LogIn from './src/screens/LogInScreen'

const firebaseConfig = {
  apiKey: 'AIzaSyDF-pqWojfre18GGMyzj2gpoti52KkIw_4',
  authDomain: 'datingapp-44dca.firebaseapp.com',
  projectId: 'datingapp-44dca',
  storageBucket: 'datingapp-44dca.appspot.com',
  messagingSenderId: '722316186750',
  appId: '1:722316186750:web:c33e8a9c5c7b3206d4742f',
};

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
