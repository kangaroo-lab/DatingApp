import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OfficialTalkBoard from'../screens/OfficialTalkBoardScreen';
import OfficialTalkList from '../screens/OfficialTalkListScreen';
import TalkBoardHeader from'../components/talkBoardHeader';

import BottomTabNavigator from'../components/talkBoardHeader';

const Stack = createNativeStackNavigator();

export default function StackOfficialNavigator() {
  return (
        <Stack.Navigator
         screenOptions={{
           headerShown:false
         }}
        >
            <Stack.Screen
             name="OfficialTalkList"
             component={OfficialTalkList}
             options={{
               headerShown:false
             }}
            />
            <Stack.Screen
             name='OfficialTalkBoard'
             component={OfficialTalkBoard}
             options={{
               headerTitle:' ',
               headerShown:true,
               headerRight:()=>(
                 <TalkBoardHeader/>
              ),
             }}
            />
        </Stack.Navigator>
  );
};
