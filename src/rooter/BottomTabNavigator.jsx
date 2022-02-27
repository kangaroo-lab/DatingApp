import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert,Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TalkBoard from'../screens/TalkBoardScreen';
import TalkList from '../screens/TalkListScreen';
import OfficialTalkBoard from'../screens/OfficialTalkBoardScreen';
import OfficialTalkList from '../screens/OfficialTalkListScreen';
import StackNavigator from './StackNavigator';
import StackOfficialNavigator from './StackOfficialTalkNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator(){
    return(
    <Tab.Navigator
        initialRouteName='PREMATCH'
        screenOptions={{
            headerShown:false
        }}
    >
        <Tab.Screen name='PREMATCH' component={StackNavigator}/>
        <Tab.Screen name='OFFICIALMATCH'component={StackOfficialNavigator}/>
    </Tab.Navigator>
    )
}
