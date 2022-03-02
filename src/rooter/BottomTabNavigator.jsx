import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert,Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import TalkBoard from'../screens/TalkBoardScreen';
import TalkList from '../screens/TalkListScreen';
import OfficialTalkBoard from'../screens/OfficialTalkBoardScreen';
import OfficialTalkList from '../screens/OfficialTalkListScreen';
import TabNavigator from './TabNavigator';
import StackNavigator from './StackNavigator';
import StackOfficialNavigator from './StackOfficialTalkNavigator';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function BottomTabNavigator(){
    // TalkBoardでBottomTabBarを隠す
    function getHeaderShown(route){
        const routeName = getFocusedRouteNameFromRoute(route)??'TalkList';
        if(routeName=='TalkBoard'||routeName=='OfficialTalkBoard'){
            console.log(routeName)
            return {position:'absolute',bottom:-100};
        }else{
            return null;
        }
    }
    return(
    <Tab.Navigator
        initialRouteName='PREMATCH'
        screenOptions={{
            headerShown:false,
        }}
    >
        <Tab.Screen
         name='PREMATCH'
         component={StackNavigator}
         options={({route})=>({
            tabBarStyle: getHeaderShown(route),
         })}
        />
        <Tab.Screen
         name='OFFICIALMATCH'
         component={StackOfficialNavigator}
         options={({route})=>({
            tabBarStyle: getHeaderShown(route),
        })}
        />
    </Tab.Navigator>
    )
}
