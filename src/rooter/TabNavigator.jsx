import { StatusBar } from 'expo-status-bar';
import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Top2 from'../screens/TopScreen2';
import Profile from'../screens/ProfileScreen';
import StackNavigator from'./StackNavigator';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  return (
        <Tab.Navigator initialRouteName="Top">
          <Tab.Screen name="Profile" component={Profile}/>
          <Tab.Screen name="Top" component={Top2}/>
          <Tab.Screen name="TalkList" component={StackNavigator}/>
        </Tab.Navigator>
  );
};
