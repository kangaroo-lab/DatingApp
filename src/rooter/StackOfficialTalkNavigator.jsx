import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TalkBoard from'../screens/OfficialTalkBoardScreen';
import BottomTabNavigation from './TabTalkNavigator';
import TalkBoardHeader from'../components/talkBoardHeader';

import BottomTabNavigator from'../components/talkBoardHeader';

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
             component={BottomTabNavigation}
             options={{
               headerShown:false
             }}
            />
            <Stack.Screen
             name="TalkBoard"
             component={TalkBoard}
             options={{
               headerShown:true,
               headerRight:()=>(
                 <TalkBoardHeader/>
              )
             }}
            />
        </Stack.Navigator>
  );
};
