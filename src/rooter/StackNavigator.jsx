import { StatusBar } from 'expo-status-bar';
import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TalkList from'../screens/TalkListScreen';
import TalkBoard from'../screens/TalkBoardScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
        <Stack.Navigator initialRouteName='TalkList'>
            <Stack.Screen name="TalkList" component={TalkList}/>
            <Stack.Screen name="TalkBoard" component={TalkBoard}/>
        </Stack.Navigator>
  );
};
