import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert,Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import StackNavigator from './StackNavigator';
import OfficialTalkList from '../screens/OfficialTalkListScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator(){
    return(
    <Tab.Navigator
        screenOptions={{
            headerShown:false
        }}
    >
        <Tab.Screen name='PREMATCH' component={StackNavigator}/>
        <Tab.Screen name='OFFICIALMATCH'component={OfficialTalkList}/>
    </Tab.Navigator>
    )
}
