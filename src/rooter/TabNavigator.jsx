import { StatusBar } from 'expo-status-bar';
import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Alert,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import Top2 from'../screens/TopScreen2';
import Profile from'../screens/ProfileScreen';
import TalkList from '../screens/TalkListScreen';
import BottomTabNavigator from '../rooter/BottomTabNavigator';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  return (
        <Tab.Navigator
         initialRouteName="Top"
         screenOptions={
           {
           tabBarIndicatorStyle:{
             width:0,
           },
           tabBarStyle:{
            paddingTop:38,
            marginHorizontal:80,
            position:'absolute',
            zIndex:100,
            top:0,
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
           },
           tabBarPosition:'top',
           tabBarItemStyle:{
             borderBottomWidth:0,
          },
           tabBarShowIcon:true,
           tabBarShowLabel:false,
           tabBarIcon:({color}) => <Ionicons name="ellipse" size={13}color={color} />,
           tabBarActiveTintColor:'rgba(138,138,138,0.80)',
           tabBarInactiveTintColor:'rgba(138,138,138,0.19)',
         }}
        >
          <Tab.Screen
           name="Profile"
           component={Profile}
          />
          <Tab.Screen
           name="Top"
           component={Top2}
           />
          <Tab.Screen
           name="TalkList"
           component={BottomTabNavigator}
           />
        </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex:1,
    flexDirection:'row',
    marginHorizontal: 85,
    paddingTop:20,
    alignContent:'center',
    justifyContent:'center',
},

  circle:{
      backgroundColor:'#C4C4C4',
      borderRadius:50,
      height:13,
      width:13,
  },
});
