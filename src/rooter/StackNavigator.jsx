import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { AntDesign,Entypo,Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TalkBoard from'../screens/TalkBoardScreen';
import TalkList from '../screens/TalkListScreen';
import BottomTabNavigator from './BottomTabNavigator';
import TabNavigatior from './TabNavigator';

import TalkBoardHeader from'../components/talkBoardHeader';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
        <Stack.Navigator
         screenOptions={{
           headerShown:false
         }}
        >
            <Stack.Screen
             name="TalkList"
             component={TalkList}
             options={{
               headerShown:false
             }}
            />
            <Stack.Screen
             name="TalkBoard"
             component={TalkBoard}
             options={{
               headerTitle:' ',
               headerShown:true,
               headerRight:()=>(
                 <TalkBoardHeader/>
              )
             }}
            />
        </Stack.Navigator>
  );
};
