import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Top2 from'../screens/TopScreen2';
import BottomTabNavigator from '../rooter/BottomTabNavigator';
import StackProfileNavigator from'./StackProfileNavigator';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  return (
        <Tab.Navigator
         initialRouteName="Top"
         screenOptions={()=>(
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
           tabBarShowIcon:false,
           tabBarShowLabel:false,
          }
         )}
        >
          <Tab.Screen
           name="Stack"
           component={StackProfileNavigator}
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
