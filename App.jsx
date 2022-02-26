import { StatusBar } from 'expo-status-bar';
import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Top2 from'./src/screens/TopScreen2';
import TalkList from'./src/screens/TalkListScreen';
import TalkBoard from'./src/screens/TalkBoardScreen';
import Profile from'./src/screens/ProfileScreen';

import StackNavigator from './src/rooter/StackNavigator'

export default function App() {
  return (
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
  );
};
