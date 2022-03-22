import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import {NavigationContainer,useRoute} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import BottomTabNavigator from './src/rooter/BottomTabNavigator'
import StackNavigator from './src/rooter/StackNavigator'
import StackOfficialNavigator from './src/rooter/StackOfficialTalkNavigator'
import TabNavigator from './src/rooter/TabNavigator'
import TalkBoard from './src/screens/TalkBoardScreen'

import ProfileBriefEdit from './src/screens/ProfileBriefEditScreen';
import ProfileNameEdit from './src/screens/ProfileNameEditScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  );
};
