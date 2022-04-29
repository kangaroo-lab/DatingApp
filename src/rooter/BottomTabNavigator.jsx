import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
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
