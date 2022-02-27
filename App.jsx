import { StatusBar } from 'expo-status-bar';
import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import BottomTabNavigator from './src/rooter/BottomTabNavigator'
import StackNavigator from './src/rooter/StackNavigator'
import StackOfficialNavigator from './src/rooter/StackOfficialTalkNavigator'
import TabNavigator from './src/rooter/TabNavigator'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
  );
};
